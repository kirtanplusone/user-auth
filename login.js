// login user with aws cognito

const AWS = require('aws-sdk');

AWS.config.update({ 'region': 'ap-south-1' });

const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports.handler = async (event) => {
    // login user in cognito
    try {

        const { email, password } = JSON.parse(event.body);

        const user = await cognito.adminInitiateAuth({
            UserPoolId: process.env.USER_POOL_ID,
            ClientId: process.env.USER_POOL_CLIENT_ID,
            AuthFlow: 'ADMIN_NO_SRP_AUTH',
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password
            }
        }).promise();

        // return cognito response
        return {
            statusCode: 200,
            body: JSON.stringify(user)
        };


    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        };
    }

};