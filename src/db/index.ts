import AWS from 'aws-sdk';

AWS.config.update({ region: 'ap-south-1' });

const documentClient = new AWS.DynamoDB.DocumentClient();

export default documentClient;
