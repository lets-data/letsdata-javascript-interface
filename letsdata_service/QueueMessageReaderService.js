
import { logger } from "../letsdata_utils/logging_utils.js"
import { ServiceRequest, LetsDataAuthParams, InterfaceNames } from "./Service.js"
import { letsdata_assert } from "../letsdata_utils/validations.js";
import { QueueMessageReader } from "../letsdata_interfaces/readers/sqs/QueueMessageReader.js";
    
export class QueueMessageReader_ParseMessage extends ServiceRequest {
    constructor(requestId, letsDataAuth, interfaceName, functionName, messageId, messageGroupId, messageDeduplicationId, messageAttributes, messageBody) {
        super(requestId, letsDataAuth, interfaceName, functionName);
        this.messageId = messageId;
        this.messageGroupId = messageGroupId;
        this.messageDeduplicationId = messageDeduplicationId;
        this.messageAttributes = messageAttributes;
        this.messageBody = messageBody;
    }

    execute() {
        const parser = new QueueMessageReader();
        return  parser.parseMessage(this.s3FileType, this.s3FileName, this.offsetBytes, this.byteArr, this.startIndex, this.endIndex);
    }
}

export function getQueueMessageReaderRequest(requestId, letsDataAuth, interfaceName, functionName, data, batchedData) {
    letsdata_assert(interfaceName == InterfaceNames.QueueMessageReader, "invalid interfaceName - expected QueueMessageReader, got "+interfaceName.toString());
    letsdata_assert(letsDataAuth != undefined && letsDataAuth != null, "invalid letsDataAuth - None");
    const QueueMessageReaderInterfaceNames = new Set(["parseMessage"]);    

    if (!QueueMessageReaderInterfaceNames.has(functionName)) {
        throw new Error("lambda event - invalid functionName "+functionName+" for interface QueueMessageReader");
    }
    
    if (functionName == "parseMessage") {
        letsdata_assert(batchedData == undefined || batchedData == null || Object.keys(batchedData).length == 0, "invalid data - QueueMessageReader.parseMessage requires empty batchedData dictionary");
        letsdata_assert(Object.keys(data).length == 5, "invalid data - QueueMessageReader.parseMessage requires data keys [messageId, messageGroupId, messageDeduplicationId, messageAttributes, messageBody]");
        
        letsdata_assert(data.messageId != undefined && data.messageId != null, "invalid messageId - None - QueueMessageReader.parseMessage requires data keys [messageId, messageGroupId, messageDeduplicationId, messageAttributes, messageBody]");
        letsdata_assert(data.messageId instanceof String || typeof data.messageId === 'string', "invalid messageId - QueueMessageReader.parseMessage requires messageId value to be string");

        if (data.messageGroupId != undefined && data.messageGroupId != null) {
            letsdata_assert(data.messageGroupId instanceof String || typeof data.messageGroupId === 'string', "invalid messageGroupId - QueueMessageReader.parseMessage requires messageGroupId value to be string");
        }
        
        if (data.messageDeduplicationId != undefined && data.messageDeduplicationId != null) {
            letsdata_assert(data.messageDeduplicationId instanceof String || typeof data.messageDeduplicationId === 'string', "invalid messageDeduplicationId - QueueMessageReader.parseMessage requires messageDeduplicationId value to be string");
        }
                
        letsdata_assert(data.messageAttributes != undefined && data.messageAttributes != null, "invalid messageAttributes - None - QueueMessageReader.parseMessage requires data keys [messageId, messageGroupId, messageDeduplicationId, messageAttributes, messageBody]");
        letsdata_assert(typeof data.messageAttributes === 'object', "invalid messageAttributes - QueueMessageReader.parseMessage requires content value to be object");

        letsdata_assert(data.messageBody != undefined && data.messageBody != null, "invalid messageBody - None - QueueMessageReader.parseMessage requires data keys [messageId, messageGroupId, messageDeduplicationId, messageAttributes, messageBody]");
        letsdata_assert(data.messageBody instanceof String || typeof data.messageBody === 'string', "invalid messageBody - QueueMessageReader.parseMessage requires messageBody value to be string");

        return new QueueMessageReader_ParseMessage(requestId, letsDataAuth, interfaceName, functionName, data.messageId, data.messageGroupId, data.messageDeduplicationId, data.messageAttributes, data.messageBody);
    } else {
        throw new Error("Unknown functionName");
    }
}
    