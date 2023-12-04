// import os, sys, traceback, json
import { logger } from "./logging_utils.js";
import { Stage, stageFromString } from "./stage.js";

export function return500ResponseFromException(err, response) {
    return {
        "StatusCode": 500,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": {
            "statusCode": "EXCEPTION",
            "errorMessage": err.message,
            "exception": {
                "errorMessage": err.message,
                "errorType": err.name,
                "stackTrace": JSON.stringify(err.stack)
            }
        }
    }
}

export function getLambdaStageFromEnvironment() {
    return stageFromString(process.env.LETS_DATA_STAGE);
}    

export function getJsonObject(input){
    // TODO - implement custom JSON object marshalling if needed
   return input;
}