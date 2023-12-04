import { logger } from "./letsdata_utils/logging_utils.js";
import { 
        return500ResponseFromException,
        getLambdaStageFromEnvironment,
        getJsonObject 
    } from "./letsdata_utils/request_utils.js";
import { getServiceRequest } from "./letsdata_service/RequestParser.js"; 
import { injectLambdaContext } from '@aws-lambda-powertools/logger';
import middy from '@middy/core';

const lambdaHandler = async (_event, _context) => {
    try {
        const stage = getLambdaStageFromEnvironment()
        const requestId = _event['requestId']
        if (_event == null) {
            throw new Error("lambda event is null")
        }

        const request = getServiceRequest(_event)
        const responseObj = request.execute()
        logger.debug("letsdata_lambda_function end - requestId: "+requestId+", response: "+JSON.stringify(responseObj))
        return {
            "StatusCode": 200,
            "headers": {
                "Content-Type": "application/json"
            },
            "body": {
                "statusCode": "SUCCESS",
                "data": getJsonObject(responseObj)
            }
        }
    } catch (error) {
        return return500ResponseFromException(error, null);
    }
    
};

export const handler = middy(lambdaHandler).use(injectLambdaContext(logger, { logEvent: true, clearState: true }));

