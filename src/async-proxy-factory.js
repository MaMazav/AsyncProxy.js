'use strict';

var AsyncProxyMaster = require('async-proxy-master');

var AsyncProxyFactory = (function AsyncProxyFactoryClosure() {
    var factorySingleton = {};
	
	factorySingleton.create = function create(scriptsToImport, ctorName, methods, proxyCtor) {
		if ((!scriptsToImport) || !(scriptsToImport.length)) {
			throw 'AsyncProxyFactory error: missing scriptsToImport (2nd argument)';
		}
		
		var ProxyClass = proxyCtor || function() {
			var ctorArgs = factorySingleton.convertArgs(arguments);
			factorySingleton.initialize(this, scriptsToImport, ctorName, ctorArgs);
		};
		
		if (methods) {
			factorySingleton.addMethods(ProxyClass, methods);
		}
		
		return ProxyClass;
	};
	
	factorySingleton.addMethods = function addMethods(ProxyClass, methods) {
		for (var methodName in methods) {
			generateMethod(ProxyClass, methodName, methods[methodName] || []);
		}
		
		return ProxyClass;
	};
	
	function generateMethod(ProxyClass, methodName, methodArgsDescription) {
		var methodOptions = methodArgsDescription[0] || {};
		ProxyClass.prototype[methodName] = function generatedFunction() {
			var workerHelper = factorySingleton.getWorkerHelper(this);
			var argsToSend = [];
			for (var i = 0; i < arguments.length; ++i) {
				var argDescription = methodArgsDescription[i + 1];
				var argValue = arguments[i];
				
				if (argDescription === 'callback') {
					argsToSend[i] = workerHelper.wrapCallback(argValue);
				} else if (!argDescription) {
					argsToSend[i] = argValue;
				} else {
					throw 'AsyncProxyFactory error: Unrecognized argument ' +
						'description ' + argDescription + ' in argument ' +
						(i + 1) + ' of method ' + methodName;
				}
			}
			return workerHelper.callFunction(
				methodName, argsToSend, methodArgsDescription[0]);
		};
	}
	
	factorySingleton.initialize = function initialize(proxyInstance, scriptsToImport, ctorName, ctorArgs) {
		if (proxyInstance.__workerHelperInitArgs) {
			throw 'asyncProxy error: Double initialization of AsyncProxy master';
		}
		proxyInstance.__workerHelperInitArgs = {
			scriptsToImport: scriptsToImport,
			ctorName: ctorName,
			ctorArgs: ctorArgs
		};
	};
	
	factorySingleton.convertArgs = function convertArgs(argsObject) {
		var args = new Array(argsObject.length);
		for (var i = 0; i < argsObject.length; ++i) {
			args[i] = argsObject[i];
		}
		
		return args;
	};
    
	factorySingleton.getWorkerHelper = function getWorkerHelper(proxyInstance) {
		if (!proxyInstance.__workerHelper) {
			if (!proxyInstance.__workerHelperInitArgs) {
				throw 'asyncProxy error: asyncProxyFactory.initialize() not called yet';
			}
			
			proxyInstance.__workerHelper = new AsyncProxyMaster(
				proxyInstance.__workerHelperInitArgs.scriptsToImport,
				proxyInstance.__workerHelperInitArgs.ctorName,
				proxyInstance.__workerHelperInitArgs.ctorArgs || []);
		}
		
		return proxyInstance.__workerHelper;
	};

    return factorySingleton;
})();

module.exports = AsyncProxyFactory;