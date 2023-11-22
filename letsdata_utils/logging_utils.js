import { Logger } from '@aws-lambda-powertools/logger';

// PowerTools for AWS Lambda - Logger - https://docs.powertools.aws.dev/lambda/typescript/latest/core/logger/
export const logger = new Logger({
       logLevel: 'DEBUG',
       serviceName: 'letsdata-javascript-interface'
});

