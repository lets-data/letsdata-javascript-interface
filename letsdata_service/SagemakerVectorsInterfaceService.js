
import { logger } from "../letsdata_utils/logging_utils.js"
import { ServiceRequest, LetsDataAuthParams, InterfaceNames } from "./Service.js"
import { letsdata_assert } from "../letsdata_utils/validations.js";
import { SagemakerVectorsInterface } from "../letsdata_interfaces/readers/sagemaker/SagemakerVectorsInterface.js";

export class SagemakerVectorsInterfaceService_ExtractDocumentElementsForVectorization extends ServiceRequest {
    constructor(requestId, letsDataAuth, interfaceName, functionName, document) {
        super(requestId, letsDataAuth, interfaceName, functionName);
        this.document = document;
    }

    execute() {
        const parser = new SagemakerVectorsInterface();
        return  parser.extractDocumentElementsForVectorization(this.document);
    }
}

export class SagemakerVectorsInterfaceService_ConstructVectorDoc extends ServiceRequest {
    constructor(requestId, letsDataAuth, interfaceName, functionName, documentInterface, vectorsMap) {
        super(requestId, letsDataAuth, interfaceName, functionName);
        this.documentInterface = documentInterface;
        this.vectorsMap = vectorsMap;
    }
    execute() {
        const parser = new SagemakerVectorsInterface();
        return  parser.constructVectorDoc(this.documentInterface, this.vectorsMap);
    }
}

export function getSagemakerVectorsInterfaceServiceRequest(requestId, letsDataAuth, interfaceName, functionName, data, batchedData) {
    letsdata_assert(interfaceName == InterfaceNames.SagemakerVectorsInterface, "invalid interfaceName - expected SagemakerVectorsInterfaceService, got "+interfaceName.toString());
    letsdata_assert(letsDataAuth != undefined && letsDataAuth != null, "invalid letsDataAuth - None");
    const SagemakerVectorsInterfaceServiceInterfaceNames = new Set(["extractDocumentElementsForVectorization", "constructVectorDoc"]);    

    if (!SagemakerVectorsInterfaceServiceInterfaceNames.has(functionName)) {
        throw new Error("lambda event - invalid functionName "+functionName+" for interface SagemakerVectorsInterfaceService");
    }
    
    if (functionName == "extractDocumentElementsForVectorization") {
        letsdata_assert(batchedData == undefined || batchedData == null || Object.keys(batchedData).length == 0, "invalid data - SagemakerVectorsInterfaceService.extractDocumentElementsForVectorization requires empty batchedData dictionary");
        letsdata_assert(Object.keys(data).length == 1, "invalid data - SagemakerVectorsInterfaceService.extractDocumentElementsForVectorization requires data keys [document]");
        
        letsdata_assert(data.document != undefined && data.document != null, "invalid document - None - SagemakerVectorsInterfaceService.extractDocumentElementsForVectorization requires data keys [document]");
        
        return new SagemakerVectorsInterfaceService_ExtractDocumentElementsForVectorization(requestId, letsDataAuth, interfaceName, functionName, data.document);
    } else if (functionName == "constructVectorDoc") {
        letsdata_assert(batchedData == undefined || batchedData == null || Object.keys(batchedData).length == 0, "invalid data - SagemakerVectorsInterfaceService.constructVectorDoc requires empty batchedData dictionary");
        letsdata_assert(Object.keys(data).length == 2, "invalid data - SagemakerVectorsInterfaceService.constructVectorDoc requires data keys [documentInterface, vectorsMap]");
        
        letsdata_assert(data.documentInterface != undefined && data.documentInterface != null, "invalid documentInterface - None - SagemakerVectorsInterfaceService.constructVectorDoc requires data keys [documentInterface, vectorsMap]");
        letsdata_assert(data.vectorsMap != undefined && data.vectorsMap != null, "invalid vectorsMap - None - SagemakerVectorsInterfaceService.constructVectorDoc requires data keys [documentInterface, vectorsMap]");
                
        return new SagemakerVectorsInterfaceService_ConstructVectorDoc(requestId, letsDataAuth, interfaceName, functionName, data.documentInterface, data.vectorsMap);
    } else {
        throw new Error("Unknown functionName");
    }
}
    