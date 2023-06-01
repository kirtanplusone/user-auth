const AWS = require('aws-sdk');

AWS.config.update({ 'region': 'ap-south-1' });

const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports.handler = async (event) => {
    //force change password
    try {
        console.log(JSON.stringify(event));
        // get user details from event
        const { Username, password, email, } = JSON.parse(event.body);

        // create user in cognito
        const user = await cognito.adminSetUserPassword({
            UserPoolId: process.env.USER_POOL_ID,
            Username: email,
            Password: password,
            Permanent: true
        }).promise();

        // return cognito response
        return {
            statusCode: 200,
            body: JSON.stringify(user)
        };

    }
    catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        };
    }

}