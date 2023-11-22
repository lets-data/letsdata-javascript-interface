export const ParseDocumentResultStatus = Object.freeze({
    SUCCESS:   "SUCCESS",
    ERROR:  "ERROR",
    SKIP:  "SKIP"
});

export function parseDocumentResultStatusFromString(str) {
    if (str == "SUCCESS") {return ParseDocumentResultStatus.SUCCESS; }
    else if (str == "ERROR") {return ParseDocumentResultStatus.ERROR; }
    else if (str == "SKIP") {return ParseDocumentResultStatus.SKIP; }
    else {
        throw new Error('Unexpected ParseDocumentResultStatus');
    }
}