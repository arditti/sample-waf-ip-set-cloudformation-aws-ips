# AWS IP Range to WAF IP Set

## What:
A Script which create a [CloudFormation template](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wafv2-ipset.html), provisioning two [WAF's IP Sets](https://docs.aws.amazon.com/waf/latest/developerguide/waf-ip-set-creating.html) for IPv4 and IPv6<br>
[The script use the public source of AWS IPs](https://docs.aws.amazon.com/vpc/latest/userguide/aws-ip-ranges.html#aws-ip-download)

## How to use:
1. git clone
2. run `node index.js`

## Limitation:
1. `./tmp` folder must exists prior running the script
2. each IP Set is limited to 10k of ips (14/09/2023 the list contain max of 7k) - In case robust solution needed, the cloudformation should be split to 10k chunks
