export function parse_arn(arn) {
    // http://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
    const elements = arn.split(':', 5)
    
    result = {
        'arn': elements[0],
        'partition': elements[1],
        'service': elements[2],
        'region': elements[3],
        'account': elements[4],
        'resource': elements[5],
        'resource_type': None
    }
    
    if (result['resource'].contains('/')) {
        result['resource_type'], result['resource'] = result['resource'].split('/',1)
    } else if (result['resource'].contains(':')) {
        result['resource_type'], result['resource'] = result['resource'].split(':',1)
    }

    return result
}