
/*
 * The "DocumentInterface" is the base interface for any document that can be returned by the user handlers. All other document interfaces and documents either extend or implement this interface.
 */
export class Document {
    constructor(documentType, documentId, recordType, partitionKey, documentMetadata, documentKeyValuesMap) {
        this.documentType = documentType;
        this.documentId = documentId;
        this.recordType = recordType;
        this.partitionKey = partitionKey;
        this.documentMetadata = documentMetadata;
        this.documentKeyValuesMap = documentKeyValuesMap;
    }

    getDocumentType() {
      return this.documentType;
    }

    /*
     * Gets the documentId for the document
     * @return documentId
     */
    getDocumentId() {
      return this.documentId;
    }

    /*
     * Gets the record type of the document
     * @return the record type
    */
    getRecordType() {
        return this.recordType;
    }
    
    /*
     * Gets any optional metadata for the document as a map
     * @return map of optional document metadata
    */
    getDocumentMetadata() {
       return this.documentMetadata;
    }

    /*
     * Interface method that serializes the document to string that can be written to the destination
     * @return serialized document as string
    */
    serialize() {
        return JSON.stringify(this);
    }

    /*
     * The partition key of the document - useful to determine the partition for the document that would be written to
     * @return the partition key for the document
    */
    getPartitionKey() {
        return this.partitionKey;
    }

    /*
    */
    getDocumentKeyValuesMap() {
        return this.documentKeyValuesMap;
    }
}