export class ParseDocumentResult {
    constructor(nextRecordType, document, parseDocumentResultStatus) {
        this.nextRecordType = nextRecordType;
        this.document = document;
        this.status = parseDocumentResultStatus;
    }

    getNextRecordType() {
        return this.nextRecordType;
    }
    
    getDocument() {
        return this.document;
    }
    
    getStatus() {
        return this.status ;
    }
}