import { Document } from "./Document.js";

export class SingleDoc extends Document {
    constructor(documentType, documentId, recordType, partitionKey, documentMetadata , documentKeyValuesMap) {
        super(documentType, documentId, recordType, partitionKey, documentMetadata, documentKeyValuesMap);
    }
    
    isSingleDoc() {
        return True;
    }
}
