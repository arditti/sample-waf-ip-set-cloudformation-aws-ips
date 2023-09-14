import * as fs from 'fs';

const TEMP_FOLDER = './tmp/'; // Folder must exist before running this script
const TEMPLATE_FILE_NAME = 'template.json';
const IP_RANGE_URL = 'https://ip-ranges.amazonaws.com/ip-ranges.json';

const fetchNewIpRange = async () => {
    const raw = await fetch(IP_RANGE_URL);
    return await raw.json();
}

const getCloudformationTemplate = (ipv4List, ipv6List) => {
    return {
        "AwsIpSetV4": {
            "Type": "AWS::WAFv2::IPSet",
            "Properties": {
                "Description": "AwsIpSetV4",
                "Name": "AwsIpSetV4",
                "Scope": "CLOUDFRONT",
                "IPAddressVersion": "IPV4",
                "Addresses": ipv4List
            }
        },
        "AwsIpSetV6": {
            "Type": "AWS::WAFv2::IPSet",
            "Properties": {
                "Description": "AwsIpSetV6",
                "Name": "AwsIpSetV6",
                "Scope": "CLOUDFRONT",
                "IPAddressVersion": "IPV6",
                "Addresses": ipv6List
            }
        }
    }
};

const saveCloudformationTemplate = (path, template) => {
    fs.writeFileSync(`${path}${TEMPLATE_FILE_NAME}`, JSON.stringify(template, null, 2));
};

const getIpFromPrefixes = (prefixes)=>{
    return prefixes.map(prefix=>prefix.ip_prefix);
}

const app = async () => {
    const awsIpRange = await fetchNewIpRange();
    const ipv4List = getIpFromPrefixes(awsIpRange.prefixes);
    const ipv6List = getIpFromPrefixes(awsIpRange.ipv6_prefixes);
    const cloudformationTemplate = getCloudformationTemplate(ipv4List, ipv6List);
    saveCloudformationTemplate(TEMP_FOLDER, cloudformationTemplate);
}

app().then(console.log).catch(console.error)