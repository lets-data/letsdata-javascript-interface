
import { v4 as uuidv4 } from 'uuid';
import { RecordParseHint } from '../model/RecordParseHint.js';
import { RecordHintType } from '../model/RecordHintType.js';
import { ParseDocumentResult } from '../model/ParseDocumentResult.js';
import { ParseDocumentResultStatus } from '../model/ParseDocumentResultStatus.js';
import { Document } from '../../documents/Document.js';
import { DocumentType } from '../../documents/DocumentType.js';
import { ErrorDoc } from '../../documents/ErrorDoc.js';
import { logger } from '../../../letsdata_utils/logging_utils.js';

export class KinesisRecordReader {
    constructor() {

    }
        
    /**
    TBA
     */
     parseMessage(streamArn, shardId, partitionKey, sequenceNumber, approximateArrivalTimestamp, data) {
        throw new Error("Not Yet Implemented");
    }
}