import { logger } from "../letsdata_utils/logging_utils.js"
/*
    event:
    {
        "requestId": "requestId",
        "interface": "SingleFileParser",
        "function": "getS3FileType|getResolvedS3FileName|getRecordStartPattern|getRecordEndPattern|parseDocument",
        "letsdataAuth": {
            "tenantId": "tenant_id",
            "userId": "user_id",
            "datasetName": "datasetName",
            "datasetId": "datasetId"
        },
        "data": {
            "name": "value"
            ...
        }
        "batchedData": [
            {
                "name": "value"
                ...
            },
            ...
        ]
    }
*/

export class LetsDataAuthParams{
    constructor(letsDataAuthDict) {
        if (letsDataAuthDict == undefined) {
            throw new Exception("letsDataAuthDict is null");
        }
        
        /*if (letsDataAuthDict instanceof Map) {
            throw new Exception("lambda letsDataAuthDict is not a dictionary "+str(type(letsDataAuthDict)));
        }*/
        
        this.tenantId = letsDataAuthDict.tenantId;
        this.userId = letsDataAuthDict.userId;
        this.datasetName = letsDataAuthDict.datasetName;
        this.datasetId = letsDataAuthDict.datasetId;
        logger.debug("LetsDataAuthParams initialized - LetsDataAuthParams: "+JSON.stringify(this))
    }
}

export const InterfaceNames = Object.freeze({
    SingleFileParser:   "singlefileparser"
});

export function interfaceNameFromString(str) {
    if (str == "singlefileparser") {return InterfaceNames.SingleFileParser; }
    else {
        throw new Error('Unexpected InterfaceName');
    }
}

export class ServiceRequest {
    constructor(requestId, letsDataAuth, interfaceName, functionName) {
        this.requestId = requestId
        this.letsDataAuth = letsDataAuth
        this.interfaceName = interfaceName
        this.functionName = functionName
    }

    execute() {
        throw new Exception("Not Yet Implemented");
    }
}