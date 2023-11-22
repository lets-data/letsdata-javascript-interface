export const DocumentType = Object.freeze({
    CompositeDoc:   "CompositeDoc",
    Document:  "Document",
    ErrorDoc:  "ErrorDoc",
    SingleDoc:  "SingleDoc",
    SkipDoc:  "SkipDoc"
});

export function documentTypeFromString(str) {
    if (str == "CompositeDoc") {return ParseDocumentResultStatus.CompositeDoc; }
    else if (str == "Document") {return ParseDocumentResultStatus.Document; }
    else if (str == "ErrorDoc") {return ParseDocumentResultStatus.ErrorDoc; }
    else if (str == "SingleDoc") {return ParseDocumentResultStatus.SingleDoc; }
    else if (str == "SkipDoc") {return ParseDocumentResultStatus.SkipDoc; }
    else {
        throw new Error('Unexpected DocumentType');
    }
}