
import { v4 as uuidv4 } from 'uuid';
import { RecordParseHint } from '../model/RecordParseHint.js';
import { RecordHintType } from '../model/RecordHintType.js';
import { ParseDocumentResult } from '../model/ParseDocumentResult.js';
import { ParseDocumentResultStatus } from '../model/ParseDocumentResultStatus.js';
import { Document } from '../../documents/Document.js';
import { DocumentType } from '../../documents/DocumentType.js';
import { ErrorDoc } from '../../documents/ErrorDoc.js';
import { logger } from '../../../letsdata_utils/logging_utils.js';

export class DynamoDBStreamsRecordReader {
    constructor() {

    }
        
    /**
     * The #LetsData DynamoDB Streams Record Reader uses this interface's implementation (also called as user data handlers) to transform the records from DynamoDB stream to a #LetsData document. At a high level, the overall #LetsData DynamoDB Stream reader design is as follows:
     *
     *  * #LetsData reads the records from the DynamoDB stream from the specified location (sequenceNumber) and passes the record contents to the user data handlers.
     *  * The user data handlers transform this record and returns a document.
     *  * #LetsData writes the document to the write / error destinations and checkpoints the location (sequenceNumber) in DynamoDB stream.
     *  * For any errors in #LetsData DynamoDB Streams Reader, or error docs being returned by the user data handler, #LetsData looks at the reader configuration and determines 1./ whether to fail the task with error 2./ or write an error doc and continue processing
     *  * If the decision is to continue processing, the reader polls for next record in the stream.

     +---------------------+                              +---------------------+                        +---------------------+
     | AWS DynamoDB Stream | ------ Read Message -------> |    # Lets Data      |---- parseDocument ---> |  User Data Handler  |
     |       Shard         |                              |  DDB Stream Reader  |<---- document -------- |                     |
     +---------------------+                              |                     |                        +---------------------+
                                                          |   Is Error Doc?     |
                                                          |        |            |                        +---------------------+
                                                          |        +---- yes ->-|---- write document --->|  Write Destination  |
                                                          |        |            |                        +---------------------+
                                                          |        |            |                        +---------------------+
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

     * The DynamoDB Streams read connector configuration has details about the DynamoDB Streams read and on dealing with failures.
     *
     * For detailed explanation of the parameters, see AWS docs:
     *  * https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_streams_Record.html
     *  * https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_streams_StreamRecord.html
     * 
     * @param streamArn - The DynamoDB Stream ARN
     * @param shardId - The DynamoDB Shard Id
     * @param eventId - A globally unique identifier for the event that was recorded in this stream record.
     * @param eventName - The type of data modification that was performed on the DynamoDB table. INSERT | MODIFY | REMOVE
     * @param identityPrincipalId - The userIdentity's principalId
     * @param identityType - The userIdentity's principalType
     * @param sequenceNumber - The sequence number of the stream record
     * @param sizeBytes - The size of the stream record, in bytes
     * @param streamViewType - The stream view type - NEW_IMAGE | OLD_IMAGE | NEW_AND_OLD_IMAGES | KEYS_ONLY
     * @param approximateCreationDateTime - The approximate date and time when the stream record was created, in UNIX epoch time format and rounded down to the closest second
     * @param keys - The primary key attribute(s) for the DynamoDB item that was modified
     * @param oldImage - The item in the DynamoDB table as it appeared before it was modified
     * @param newImage - The item in the DynamoDB table as it appeared after it was modified
     * @return ParseDocumentResult which has the extracted document and the status (error, success or skip)
     */
    parseRecord(streamArn, shardId, eventId, eventName, identityPrincipalId, identityType, sequenceNumber, sizeBytes, streamViewType, approximateCreationDateTime, keys, oldImage, newImage) {
        throw new Error("Not Yet Implemented");
    }
}
