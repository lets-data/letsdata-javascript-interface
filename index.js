import {
    S3Client,
    GetObjectCommand,
  } from "@aws-sdk/client-s3";


  export const handler = async (event) => {
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

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };

    console.log(response);
    return response;
};


