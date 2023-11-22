/*from letsdata_utils.logging_utils import logger
from letsdata_utils.validations import letsdata_assert
from letsdata_service.Service import ServiceRequest, LetsDataAuthParams, InterfaceNames
from letsdata_service.SingleFileParserService import getSingleFileParserRequest
*/
import { logger } from "../letsdata_utils/logging_utils.js";
import { letsdata_assert } from "../letsdata_utils/validations.js";
import { InterfaceNames, LetsDataAuthParams, interfaceNameFromString }  from './Service.js';
import { getSingleFileParserRequest }  from './SingleFileParserService.js';

export function getServiceRequest(_event) {

    if (_event == null || _event == undefined) {
        throw new Exception("lambda event is null");
    }

    /*if (!(_event instanceof object)) {
        throw new Exception("lambda event is not a dictionary");
    }*/

    letsdata_assert(_event.requestId != undefined, "invalid requestId - None");
    letsdata_assert(_event.requestId instanceof String || typeof _event.requestId === 'string', "invalid requestId - value to be string");
    
    const requestId = _event.requestId;
    
    const letsDataAuthParams = new LetsDataAuthParams(_event.letsdataAuth);
    const interfaceName = interfaceNameFromString(_event.interface.toLowerCase());
    
    const functionName = _event.function;
    
    
    const data = _event.data != undefined ? _event.data : null;
    const batchedData = _event.batchedData != undefined ? _event.batchedData : null;
    
    var serviceRequest; 
    if (interfaceName == InterfaceNames.SingleFileParser) {
        serviceRequest = getSingleFileParserRequest(requestId, letsDataAuthParams, interfaceName, functionName, data, batchedData);
    } else {
        throw new Exception("lambda event - interfaceName not yet supported "+JSON.stringify(interfaceName));
    }
    
    logger.debug("serviceRequest initialized - interfaceName: "+JSON.stringify(interfaceName.toString())+", functionName: "+functionName);
    return serviceRequest;
}