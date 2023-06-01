
const AWS = require('aws-sdk');

AWS.config.update({ 'region': 'ap-south-1' });

const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports.handler = async (event) => {
    try {

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'You are authorized to perform this action'
            })
        };


    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        };

    }

}