
import { logger } from "../letsdata_utils/logging_utils.js"
import { ServiceRequest, LetsDataAuthParams, InterfaceNames } from "./Service.js"
import { letsdata_assert } from "../letsdata_utils/validations.js";
import { SingleFileParser } from "../letsdata_interfaces/readers/parsers/SingleFileParser.js";

export class SingleFileParser_GetS3FileType extends ServiceRequest {
    constructor(requestId, letsDataAuth, interfaceName, functionName) {
        super(requestId, letsDataAuth, interfaceName, functionName);
    }

    execute() {
        const parser = new SingleFileParser();
        return  parser.getS3FileType();
    }
}

export class SingleFileParser_GetResolvedS3FileName extends ServiceRequest {
    constructor(requestId, letsDataAuth, interfaceName, functionName, s3FileType, fileName) {
        super(requestId, letsDataAuth, interfaceName, functionName);
        this.s3FileType = s3FileType;
        this.fileName = fileName;
    }

    execute() {
        const parser = new SingleFileParser();
        return  parser.getResolvedS3FileName(this.s3FileType, this.fileName);
    }
}

export class SingleFileParser_GetRecordStartPattern extends ServiceRequest {
    constructor(requestId, letsDataAuth, interfaceName, functionName, s3FileType) {
        super(requestId, letsDataAuth, interfaceName, functionName);
        this.s3FileType = s3FileType;
    }
    execute() {
        const parser = new SingleFileParser();
        return  parser.getRecordStartPattern(this.s3FileType);
    }
}

export class SingleFileParser_GetRecordEndPattern extends ServiceRequest {
    constructor(requestId, letsDataAuth, interfaceName, functionName, s3FileType) {
        super(requestId, letsDataAuth, interfaceName, functionName);
        this.s3FileType = s3FileType;
    }

    execute() {
        const parser = new SingleFileParser();
        return  parser.getRecordEndPattern(this.s3FileType);
    }
}
    
export class SingleFileParser_ParseDocument extends ServiceRequest {
    constructor(requestId, letsDataAuth, interfaceName, functionName, s3FileType, s3Filename, offsetBytes, content, startIndex, endIndex) {
        super(requestId, letsDataAuth, interfaceName, functionName);
        this.s3FileType = s3FileType;
        this.s3FileName = s3Filename;
        this.offsetBytes = offsetBytes;
        this.byteArr = new TextEncoder().encode(content);
        this.startIndex = 0;
        if (startIndex != this.startIndex) {
            throw new Error("SingleFileParser_ParseDocument - invalid startIndex for byteArray - expected: "+this.startIndex+", actual: "+startIndex);
        }
        this.endIndex = this.byteArr.length;
        if (endIndex != this.endIndex) {
            throw new Error("SingleFileParser_ParseDocument - invalid endIndex for byteArray - expected: "+this.endIndex+", actual: "+endIndex);
        }
    }

    execute() {
        const parser = new SingleFileParser();
        return  parser.parseDocument(this.s3FileType, this.s3FileName, this.offsetBytes, this.byteArr, this.startIndex, this.endIndex);
    }
}

export function getSingleFileParserRequest(requestId, letsDataAuth, interfaceName, functionName, data, batchedData) {
    letsdata_assert(interfaceName == InterfaceNames.SingleFileParser, "invalid interfaceName - expected SingleFileParser, got "+interfaceName.toString());
    letsdata_assert(letsDataAuth != undefined && letsDataAuth != null, "invalid letsDataAuth - None");
    const SingleFileParserInterfaceNames = new Set(["getS3FileType", "getResolvedS3FileName", "getRecordStartPattern", "getRecordEndPattern", "parseDocument"]);    

    if (!SingleFileParserInterfaceNames.has(functionName)) {
        throw new Error("lambda event - invalid functionName "+functionName+" for interface SingleFileParser");
    }
    
    if (functionName == "getS3FileType") {
        letsdata_assert(data == undefined || data == null || Object.keys(data).length == 0, "invalid data - SingleFileParser.getS3FileType requires empty data dictionary");
        letsdata_assert(batchedData == undefined || batchedData == null || Object.keys(batchedData).length == 0, "invalid batchedData - SingleFileParser.getS3FileType requires empty batchedData dictionary");

        return new SingleFileParser_GetS3FileType(requestId, letsDataAuth, interfaceName, functionName);
    } else if (functionName == "getResolvedS3FileName") {
        letsdata_assert(batchedData == undefined || batchedData == null || Object.keys(batchedData).length == 0, "invalid data - SingleFileParser.getResolvedS3FileName requires empty batchedData dictionary");
        letsdata_assert(Object.keys(data).length == 2, "invalid data - SingleFileParser.getResolvedS3FileName requires data keys [s3FileType, fileName]");
        
        letsdata_assert(data.s3FileType != undefined && data.s3FileType != null, "invalid s3FileType - None - SingleFileParser.getResolvedS3FileName requires data keys [s3FileType, fileName]");
        letsdata_assert(data.s3FileType instanceof String || typeof data.s3FileType === 'string', "invalid s3FileType - SingleFileParser.getResolvedS3FileName requires s3FileType value to be string");

        letsdata_assert(data.fileName != undefined && data.fileName != null, "invalid fileName - None - SingleFileParser.getResolvedS3FileName requires data keys [s3FileType, fileName]");
        letsdata_assert(data.fileName instanceof String || typeof data.fileName === 'string', "invalid fileName - SingleFileParser.getResolvedS3FileName requires fileName value to be string");
        return new SingleFileParser_GetResolvedS3FileName(requestId, letsDataAuth, interfaceName, functionName, data.s3FileType, data.fileName);
    } else if (functionName == "getRecordStartPattern") {
        letsdata_assert(batchedData == undefined || batchedData == null || Object.keys(batchedData).length == 0, "invalid data - SingleFileParser.getRecordStartPattern requires empty batchedData dictionary");
        letsdata_assert(Object.keys(data).length == 1, "invalid data - SingleFileParser.getRecordStartPattern requires data keys [s3FileType]");
        
        letsdata_assert(data.s3FileType != undefined && data.s3FileType != null, "invalid s3FileType - None - SingleFileParser.getRecordStartPattern requires data keys [s3FileType]");
        letsdata_assert(data.s3FileType instanceof String || typeof data.s3FileType === 'string', "invalid s3FileType - SingleFileParser.getRecordStartPattern requires s3FileType value to be string");
        return new SingleFileParser_GetRecordStartPattern(requestId, letsDataAuth, interfaceName, functionName, data.s3FileType);
    } else if (functionName == "getRecordEndPattern") {
        letsdata_assert(batchedData == undefined || batchedData == null || Object.keys(batchedData).length == 0, "invalid data - SingleFileParser.getRecordEndPattern requires empty batchedData dictionary");
        letsdata_assert(Object.keys(data).length == 1, "invalid data - SingleFileParser.getRecordEndPattern requires data keys [s3FileType]");
        
        letsdata_assert(data.s3FileType != undefined && data.s3FileType != null, "invalid s3FileType - None - SingleFileParser.getRecordStartPattern requires data keys [s3FileType]");
        letsdata_assert(data.s3FileType instanceof String || typeof data.s3FileType === 'string', "invalid s3FileType - SingleFileParser.getRecordStartPattern requires s3FileType value to be string");
        return new SingleFileParser_GetRecordEndPattern(requestId, letsDataAuth, interfaceName, functionName, data.s3FileType);
    } else if (functionName == "parseDocument") {
        letsdata_assert(batchedData == undefined || batchedData == null || Object.keys(batchedData).length == 0, "invalid data - SingleFileParser.parseDocument requires empty batchedData dictionary");
        letsdata_assert(Object.keys(data).length == 6, "invalid data - SingleFileParser.parseDocument requires data keys [s3FileType, fileName, offsetBytes, content, startIndex, endIndex]");
        
        letsdata_assert(data.s3FileType != undefined && data.s3FileType != null, "invalid s3FileType - None - SingleFileParser.parseDocument requires data keys [s3FileType, fileName, offsetBytes, content, startIndex, endIndex]");
        letsdata_assert(data.s3FileType instanceof String || typeof data.s3FileType === 'string', "invalid s3FileType - SingleFileParser.parseDocument requires s3FileType value to be string");

        letsdata_assert(data.fileName != undefined && data.fileName != null, "invalid fileName - None - SingleFileParser.parseDocument requires data keys [s3FileType, fileName, offsetBytes, content, startIndex, endIndex]");
        letsdata_assert(data.fileName instanceof String || typeof data.fileName === 'string', "invalid fileName - SingleFileParser.parseDocument requires fileName value to be string");
        
        letsdata_assert(data.offsetBytes != undefined && data.offsetBytes != null, "invalid offsetBytes - None - SingleFileParser.parseDocument requires data keys [s3FileType, fileName, offsetBytes, content, startIndex, endIndex]");
        letsdata_assert(typeof(data.offsetBytes) == 'number' && Number.isInteger(data.offsetBytes), "invalid offsetBytes - SingleFileParser.parseDocument requires offsetBytes value to be int "+typeof(data.offsetBytes));
        
        letsdata_assert(data.content != undefined && data.content != null, "invalid content - None - SingleFileParser.parseDocument requires data keys [s3FileType, fileName, offsetBytes, content, startIndex, endIndex]");
        letsdata_assert(data.content instanceof String || typeof data.content === 'string', "invalid content - SingleFileParser.parseDocument requires content value to be str");

        letsdata_assert(data.startIndex != undefined && data.startIndex != null, "invalid startIndex - None - SingleFileParser.parseDocument requires data keys [s3FileType, fileName, offsetBytes, content, startIndex, endIndex]");
        letsdata_assert(typeof(data.startIndex) == 'number' && Number.isInteger(data.startIndex), "invalid startIndex - SingleFileParser.parseDocument requires startIndex value to be int");

        letsdata_assert(data.endIndex != undefined && data.endIndex != null, "invalid endIndex - None - SingleFileParser.parseDocument requires data keys [s3FileType, fileName, offsetBytes, content, startIndex, endIndex]");
        letsdata_assert(typeof(data.endIndex) == 'number' && Number.isInteger(data.endIndex), "invalid endIndex - SingleFileParser.parseDocument requires endIndex value to be int");
        
        return new SingleFileParser_ParseDocument(requestId, letsDataAuth, interfaceName, functionName, data.s3FileType, data.fileName, data.offsetBytes, data.content, data.startIndex, data.endIndex);
    } else {
        throw new Error("Unknown functionName");
    }
}
    