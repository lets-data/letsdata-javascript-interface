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

export function isLambdaFunctionDatasetMicroservice(context, stage) {
    return !context.invokedFunctionArn.endsWith(stage.value+"LetsDataJavascriptInterfaceLambdaFunction")
}

export function getJsonObject(input){
    // if object is primitive type - return 
    /*if (isinstance(input, str) || isinstance(input, int) || isinstance(input, float) || isinstance(input, bool) || isinstance(input, None)) {
        return input
    }

    try {
        // if object is json serializable - return 
        jsonObject = json.dumps(input)
        return input
    } catch (error) {
        // object is not json serializable. Iterate through the dictionary key value pairs and call getJsonObject for each value recursively
        customDict = dict()
        
        for (keyName in input.__dict__.keys()) {
            customDict[keyName] = getJsonObject(input.__dict__[keyName])
        }

        return customDict
    
        // TODO handle lists
    }
    */
   return input;
}