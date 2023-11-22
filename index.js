import {
    S3Client,
    GetObjectCommand,
  } from "@aws-sdk/client-s3";

import { logger } from "./letsdata_utils/logging_utils.js";
import { 
        return500ResponseFromException,
        getLambdaStageFromEnvironment,
        isLambdaFunctionDatasetMicroservice,
        getJsonObject 
    } from "./letsdata_utils/request_utils.js";
import { getServiceRequest } from "./letsdata_service/RequestParser.js"; 
import { injectLambdaContext } from '@aws-lambda-powertools/logger';
import middy from '@middy/core';

const lambdaHandler = async (_event, _context) => {
    /*const s3Client = new S3Client({});
    
    const { Body } = await s3Client.send(
        new GetObjectCommand({
            Bucket: "resonancemanifestfileunittest",
            Key: "manifestFilename",
        })
    );
  
    const response = {
        statusCode: 200,
        body: await Body.transformToString(),
    };*/

    /*const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };

    logger.info('This is an INFO log with context, event and the response', { response: response });
    return response;*/

    try {
        const stage = getLambdaStageFromEnvironment()
        const isDedicated = isLambdaFunctionDatasetMicroservice(_context, stage)
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

