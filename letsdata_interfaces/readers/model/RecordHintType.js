export const RecordHintType = Object.freeze({
    OFFSET:   "OFFSET",
    PATTERN:  "PATTERN"
});

export function recordHintTypeFromString(str) {
    if (str == "OFFSET") {return RecordHintType.OFFSET; }
    else if (str == "PATTERN") {return RecordHintType.PATTERN; }
    else {
        throw new Error('Unexpected RecordHintType');
    }
}