import { config, DynamoDB } from 'aws-sdk';

config.update({ region: 'ap-south-1' });

const documentClient = new DynamoDB.DocumentClient();

export default documentClient;
