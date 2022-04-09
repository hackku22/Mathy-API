import {OAuth2Client, OAuth2Scope, env, /*uuid4*/} from '@extollo/lib'

export default {
    secret: env('OAUTH2_SECRET'),
    scopes: {
        'user-info': {
            id: 'user-info',
            name: 'user-info',
            description: 'access basic information about your account',
        },
    } as {[key: string]: OAuth2Scope},
    clients: {
        // 'test-1': {
        //     id: 'test-1',
        //     display: 'Test 1',
        //     secret: env('TEST_CLIENT_SECRET', uuid4()),
        //     allowedFlows: ['code'],
        //     allowedScopeIds: ['user-info'],
        //     allowedRedirectUris: [
        //         'http://localhost:1234/callback',
        //     ],
        // },
    } as {[key: string]: OAuth2Client},
}
