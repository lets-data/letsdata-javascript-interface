
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
     The #Lets Data Kinesis Stream Reader uses this interface's implementation (also called as user data handlers) to transform the messages from Kinesis Stream record to a #Lets Data document. At a high level, the overall # Lets Data Kinesis reader design is as follows:

     * #Lets Data reads the records from the Kinesis stream and passes the message contents to the user data handlers.
     * The user data handlers transform this message and returns a document.
     * #Lets data writes the document to the write / error destinations and then checkpoints the task with the processed sequence number.
     * For any errors in # Lets Data Kinesis Stream Reader, or error docs being returned by the user data handler, #Lets Data looks at the reader configuration and determines 1./ whether to fail the task with error 2./ or write an error doc and continue processing
     * If the decision is to continue processing, the reader polls for next stream record.

     +---------------------+                              +---------------------+                        +---------------------+
     |                     | ------ Read Message -------> |    # Lets Data      |---- parseDocument ---> |  User Data Handler  |
     |                     |                              |   Kinesis Reader    |<---- document -------- |                     |
     |                     |                              |                     |                        +---------------------+
     | AWS Kinesis Stream  |                              |   Is Error Doc?     |
     |                     |                              |        |            |                        +---------------------+
     |                     |                              |        +---- yes ->-|---- write document --->|  Write Destination  |
     |                     |                              |        |            |                        +---------------------+
     +---------------------+                              |        |            |                        +---------------------+
                                                          |        +---- no -->-|---- write error ------>|  Error Destination  |
                                                          |        |            |                        +---------------------+
                                                          | Should Checkpoint?  |
                                                          |        |            |
               ---<------- Checkpoint Task --------<------|<- yes -+            |
                                                          |        |            |
                                                          |        |            |
                                                          | Throw on Error?     |
                                                          |<- yes -+            |
                                                          |        |            |
                                                          |        V            |
                                                          |  Throw on Error     |
                                                          +---------------------+

     The Kinesis read connector configuration has details about the Kinesis read config and on dealing with failures.

     * @param streamArn The Kinesis streamArn
     * @param shardId The stream record's shardId
     * @param partitionKey The stream record's partition key
     * @param sequenceNumber The stream record's sequenceNumber
     * @param approximateArrivalTimestamp The stream record's approximateArrivalTimestamp
     * @param data The stream record's data payload as a ByteBuffer
     * @return ParseDocumentResult which has the extracted document and the status (error, success or skip)
     */
     parseMessage(streamArn, shardId, partitionKey, sequenceNumber, approximateArrivalTimestamp, data) {
        throw new Error("Not Yet Implemented");
    }
}
