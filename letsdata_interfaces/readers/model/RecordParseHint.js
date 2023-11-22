import { RecordHintType } from "./RecordHintType.js"
import { letsdata_assert } from "../../../letsdata_utils/validations.js"

export class RecordParseHint {
    constructor(recordHintType, pattern, offset) {
        this.recordHintType = recordHintType;
        this.pattern = pattern;
        this.offset = offset;
    }

    getRecordHintType() { 
        return this.recordHintType;
    }
    
    getPattern() {
        letsdata_assert(self.recordHintType == RecordHintType.PATTERN, "getStringMatchPattern - invalid accessor called for recordHintType");
        return this.pattern;
    }
    
    getOffset() {
        letsdata_assert(self.recordHintType == RecordHintType.OFFSET, "getOffset - invalid accessor called for recordHintType");
        return self.offset;
    }
}