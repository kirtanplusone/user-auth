// add user to group

const AWS = require('aws-sdk');

AWS.config.update({ 'region': 'ap-south-1' });

const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports.handler = async (event) => {

    try {

        console.log(JSON.stringify(event));

        const { email, group } = JSON.parse(event.body);

        // get user details from token from header
        const token = event.headers.Authorization;

        // get user details from token
        const loggedInUser = await cognito.getUser({
            AccessToken: token
        }).promise();

        // check if user is in admin group
        const userGroups = await cognito.adminListGroupsForUser({
            UserPoolId: process.env.USER_POOL_ID,
            Username: loggedInUser.Username
        }).promise();

        console.log(JSON.stringify(userGroups));

        // if user is not in admin group, return error
        if (!userGroups.Groups.find(g => g.GroupName === 'admin')) {
            return {
                statusCode: 403,
                body: JSON.stringify({
                    message: 'You are not authorized to perform this action'
                })
            };
        }

        const user = await cognito.adminAddUserToGroup({
            UserPoolId: process.env.USER_POOL_ID,
            Username: email,
            GroupName: group
        }).promise();

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

}