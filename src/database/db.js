const AWS=require("aws-sdk")
const dotenv = require('dotenv');
dotenv.config();


AWS.config.update({
    region: "us-east-1",
    endpoint: "http://localhost:8000",
})

// console.log(process.env.REGION);
const dynamodb=new AWS.DynamoDB.DocumentClient();


module.exports=dynamodb;