import { DocumentType } from "./DocumentType.js"
import { SingleDoc } from "./SingleDoc.js"

export class ErrorDoc extends SingleDoc {
    constructor(documentId, recordType, partitionKey, documentMetadata , documentKeyValuesMap, errorStartoffsetMap, errorEndoffsetMap, errorMessage) {
        super(DocumentType.ErrorDoc, documentId, recordType, partitionKey, documentMetadata, documentKeyValuesMap);
        this.errorStartoffsetMap = errorStartoffsetMap;
        this.errorEndoffsetMap = errorEndoffsetMap;
        this.errorMessage = errorMessage;
    }
    
    /*
     * The erroneous record start offset (in bytes) of the error record in the files by file types
     * For 'Single File' and 'Single File State Machine' readers, there would be a single file type in the return map.
     * For example,
     *  {
     *      "CLICKSTREAMLOGS": "58965"
     *  }
     *  For 'Multiple File State Machine' readers, the return map should have offsets (in bytes) into each of the files.
     *  For example,
     *  {
     *      "METADATALOG": "58965",
     *      "DATALOG": "5484726",
     *  }
     * @return Map of &lt;FileType, RecordStartOffsetInBytes&gt;
    */
    getErrorStartOffsetMap() {
        return this.errorStartoffsetMap;
    }

    /*
     * The erroneous record end offset (in bytes) of the error record in the files by file types
     * For 'Single File' and 'Single File State Machine' readers, there would be a single file type in the return map.
     * For example,
     *  {
     *      "CLICKSTREAMLOGS": "58965"
     *  }
     *  For 'Multiple File State Machine' readers, the return map should have offsets (in bytes) into each of the files.
     *  For example,
     *  {
     *      "METADATALOG": "58965",
     *      "DATALOG": "5484726",
     *  }
     * @return Map of &lt;FileType, RecordEndOffsetInBytes&gt;
    */
    getErrorEndOffsetMap() {
        return this.errorEndoffsetMap;
    }

    /*
     * The error message string that will be captured in the error record
     * @return The error message string
    */
    getErrorMessage() {
        return this.errorMessage;
    }
}