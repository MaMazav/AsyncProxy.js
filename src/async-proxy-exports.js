'use strict';

function ExportAsyncProxySymbolsClosure() {
    function ExportAsyncProxySymbols(
            SubWorkerEmulationForChrome,
            AsyncProxySlaveSingleton,
            AsyncProxyMaster,
            ScriptsToImportPool,
            DependencyWorkers,
            DependencyWorkersTaskHandle,
            PromiseTask,
            PromiseDependencyWorkers) {
                
        self['AsyncProxy'] = self['AsyncProxy'] || {};

        SubWorkerEmulationForChrome.prototype['postMessage'] = SubWorkerEmulationForChrome.prototype.postMessage;
        SubWorkerEmulationForChrome.prototype['terminate'] = SubWorkerEmulationForChrome.prototype.terminate;

        AsyncProxySlaveSingleton['setSlaveSideCreator'] = AsyncProxySlaveSingleton.setSlaveSideCreator;
        AsyncProxySlaveSingleton['setBeforeOperationListener'] = AsyncProxySlaveSingleton.setBeforeOperationListener;
        AsyncProxySlaveSingleton['sendUserDataToMaster'] = AsyncProxySlaveSingleton.sendUserDataToMaster;
        AsyncProxySlaveSingleton['wrapPromiseFromSlaveSide'] = AsyncProxySlaveSingleton.wrapPromiseFromSlaveSide;
        AsyncProxySlaveSingleton['wrapCallbackFromSlaveSide'] = AsyncProxySlaveSingleton.wrapCallbackFromSlaveSide;

        AsyncProxyMaster.prototype['setUserDataHandler'] = AsyncProxyMaster.prototype.setUserDataHandler;
        AsyncProxyMaster.prototype['terminate'] = AsyncProxyMaster.prototype.terminate;
        AsyncProxyMaster.prototype['callFunction'] = AsyncProxyMaster.prototype.callFunction;
        AsyncProxyMaster.prototype['wrapCallback'] = AsyncProxyMaster.prototype.wrapCallback;
        AsyncProxyMaster.prototype['freeCallback'] = AsyncProxyMaster.prototype.freeCallback;
        AsyncProxyMaster['getEntryUrl'] = AsyncProxyMaster.getEntryUrl;

        ScriptsToImportPool.prototype['addScriptFromErrorWithStackTrace'] = ScriptsToImportPool.prototype.addScriptFromErrorWithStackTrace;
        ScriptsToImportPool.prototype['getScriptsForWorkerImport'] = ScriptsToImportPool.prototype.getScriptsForWorkerImport;
        
        DependencyWorkers.prototype['startTask'] = DependencyWorkers.prototype.startTask;
        
        DependencyWorkersTaskHandle.prototype['hasData'] = DependencyWorkersTaskHandle.prototype.hasData;
        DependencyWorkersTaskHandle.prototype['getLastData'] = DependencyWorkersTaskHandle.prototype.getLastData;
        DependencyWorkersTaskHandle.prototype['setPriority'] = DependencyWorkersTaskHandle.prototype.setPriority;
        DependencyWorkersTaskHandle.prototype['unregister'] = DependencyWorkersTaskHandle.prototype.unregister;
        
        PromiseTask.prototype['onDependencyTaskResult'] = PromiseTask.prototype.onDependencyTaskResult;
        PromiseTask.prototype['statusUpdated'] = PromiseTask.prototype.statusUpdated;
        
        PromiseDependencyWorkers['createInputRetreiverWrapper'] = PromiseDependencyWorkers.prototype.createInputRetreiverWrapper;
    }
    
    asyncProxyScriptBlob.addMember(ExportAsyncProxySymbolsClosure, 'ExportAsyncProxySymbols');
    asyncProxyScriptBlob.addStatement('ExportAsyncProxySymbols(' +
        'SubWorkerEmulationForChrome, AsyncProxySlaveSingleton, AsyncProxyMaster, ScriptsToImportPool, ' +
        'DependencyWorkers, DependencyWorkersTaskHandle, PromiseTask, PromiseDependencyWorkers);');
    
    asyncProxyScriptBlob.addStatement("self['AsyncProxy']['AsyncProxySlaveSingleton'] = AsyncProxySlaveSingleton;");
    asyncProxyScriptBlob.addStatement("self['AsyncProxy']['AsyncProxyMaster'] = AsyncProxyMaster;");
    asyncProxyScriptBlob.addStatement("self['AsyncProxy']['ScriptsToImportPool'] = ScriptsToImportPool;");
    asyncProxyScriptBlob.addStatement("self['AsyncProxy']['DependencyWorkers'] = DependencyWorkers;");
    asyncProxyScriptBlob.addStatement("self['AsyncProxy']['PromiseTask'] = PromiseTask;");
    asyncProxyScriptBlob.addStatement("self['AsyncProxy']['PromiseDependencyWorkers'] = PromiseDependencyWorkers;");
    
    return ExportAsyncProxySymbols;
}

(ExportAsyncProxySymbolsClosure())(
    SubWorkerEmulationForChrome, AsyncProxySlaveSingleton, AsyncProxyMaster, ScriptsToImportPool,
    DependencyWorkers, DependencyWorkersTaskHandle, PromiseTask, PromiseDependencyWorkers);
self['AsyncProxy']['AsyncProxySlaveSingleton'] = AsyncProxySlaveSingleton;
self['AsyncProxy']['AsyncProxyMaster'] = AsyncProxyMaster;
self['AsyncProxy']['ScriptsToImportPool'] = ScriptsToImportPool;
self['AsyncProxy']['DependencyWorkers'] = DependencyWorkers;
self['AsyncProxy']['PromiseTask'] = PromiseTask;
self['AsyncProxy']['PromiseDependencyWorkers'] = PromiseDependencyWorkers;