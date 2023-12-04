export const DocumentType = Object.freeze({
    Document:  "Document",
    ErrorDoc:  "ErrorDoc",
    SkipDoc:  "SkipDoc"
});

export function documentTypeFromString(str) {
    if (str == "Document") {return ParseDocumentResultStatus.Document; }
    else if (str == "ErrorDoc") {return ParseDocumentResultStatus.ErrorDoc; }
    else if (str == "SkipDoc") {return ParseDocumentResultStatus.SkipDoc; }
    else {
        throw new Error('Unexpected DocumentType');
    }
}