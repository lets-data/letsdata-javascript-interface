
import { logger } from "../letsdata_utils/logging_utils.js"
import { ServiceRequest, LetsDataAuthParams, InterfaceNames } from "./Service.js"
import { letsdata_assert } from "../letsdata_utils/validations.js";
import { KinesisRecordReader } from "../letsdata_interfaces/readers/kinesis/KinesisRecordReader.js";
    
export class KinesisRecordReader_ParseMessage extends ServiceRequest {
    constructor(requestId, letsDataAuth, interfaceName, functionName, streamArn, shardId, partitionKey, sequenceNumber, approximateArrivalTimestamp, data) {
        super(requestId, letsDataAuth, interfaceName, functionName);
        this.streamArn = streamArn;
        this.shardId = shardId;
        this.partitionKey = partitionKey;
        this.sequenceNumber = sequenceNumber;
        this.approximateArrivalTimestamp = approximateArrivalTimestamp;
        this.byteArr = new TextEncoder().encode(data);
    }

    execute() {
        const parser = new KinesisRecordReader();
        return  parser.parseMessage(this.streamArn, this.shardId, this.partitionKey, this.sequenceNumber, this.approximateArrivalTimestamp, this.byteArr);
    }
}

export function getKinesisRecordReaderServiceRequest(requestId, letsDataAuth, interfaceName, functionName, data, batchedData) {
    letsdata_assert(interfaceName == InterfaceNames.KinesisRecordReader, "invalid interfaceName - expected KinesisRecordReader, got "+interfaceName.toString());
    letsdata_assert(letsDataAuth != undefined && letsDataAuth != null, "invalid letsDataAuth - None");
    const KinesisRecordReaderInterfaceNames = new Set(["parseMessage"]);    

    if (!KinesisRecordReaderInterfaceNames.has(functionName)) {
        throw new Error("lambda event - invalid functionName "+functionName+" for interface KinesisRecordReader");
    }
    
    if (functionName == "parseMessage") {
        letsdata_assert(batchedData == undefined || batchedData == null || Object.keys(batchedData).length == 0, "invalid data - KinesisRecordReader.parseMessage requires empty batchedData dictionary");
        letsdata_assert(Object.keys(data).length == 6, "invalid data - KinesisRecordReader.parseMessage requires data keys [streamArn, shardId, partitionKey, sequenceNumber, approximateArrivalTimestamp, data]");
        
        letsdata_assert(data.streamArn != undefined && data.streamArn != null, "invalid messageId - None - KinesisRecordReader.parseMessage requires data keys [streamArn, shardId, partitionKey, sequenceNumber, approximateArrivalTimestamp, data]");
        letsdata_assert(data.streamArn instanceof String || typeof data.streamArn === 'string', "invalid streamArn - KinesisRecordReader.parseMessage requires streamArn value to be string");

        letsdata_assert(data.shardId != undefined && data.shardId != null, "invalid shardId - None - KinesisRecordReader.parseMessage requires data keys [streamArn, shardId, partitionKey, sequenceNumber, approximateArrivalTimestamp, data]");
        letsdata_assert(data.shardId instanceof String || typeof data.shardId === 'string', "invalid shardId - KinesisRecordReader.parseMessage requires shardId value to be string");

        letsdata_assert(data.partitionKey != undefined && data.partitionKey != null, "invalid partitionKey - None - KinesisRecordReader.parseMessage requires data keys [streamArn, shardId, partitionKey, sequenceNumber, approximateArrivalTimestamp, data]");
        letsdata_assert(data.partitionKey instanceof String || typeof data.partitionKey === 'string', "invalid partitionKey - KinesisRecordReader.parseMessage requires partitionKey value to be string");

        letsdata_assert(data.sequenceNumber != undefined && data.sequenceNumber != null, "invalid sequenceNumber - None - KinesisRecordReader.parseMessage requires data keys [streamArn, shardId, partitionKey, sequenceNumber, approximateArrivalTimestamp, data]");
        letsdata_assert(data.sequenceNumber instanceof String || typeof data.sequenceNumber === 'string', "invalid sequenceNumber - KinesisRecordReader.parseMessage requires sequenceNumber value to be string");

        letsdata_assert(data.approximateArrivalTimestamp != undefined && data.approximateArrivalTimestamp != null, "invalid approximateArrivalTimestamp - None - SingleFileParser.parseMessage requires data keys [streamArn, shardId, partitionKey, sequenceNumber, approximateArrivalTimestamp, data]");
        letsdata_assert(typeof(data.approximateArrivalTimestamp) == 'number' && Number.isInteger(data.approximateArrivalTimestamp), "invalid startIndex - SingleFileParser.parseMessage requires approximateArrivalTimestamp value to be int");

        letsdata_assert(data.data != undefined && data.data != null, "invalid messageBody - None - KinesisRecordReader.parseMessage requires data keys [streamArn, shardId, partitionKey, sequenceNumber, approximateArrivalTimestamp, data]");
        letsdata_assert(data.data instanceof String || typeof data.data === 'string', "invalid data - KinesisRecordReader.parseMessage requires data value to be string");

        return new KinesisRecordReader_ParseMessage(requestId, letsDataAuth, interfaceName, functionName, data.messageId, data.messageGroupId, data.messageDeduplicationId, data.messageAttributes, data.data);
    } else {
        throw new Error("Unknown functionName");
    }
}
    