import {AuthenticationConfig, CoreIDLoginProvider, OAuth2LoginProviderConfig, ORMUserRepository, env} from '@extollo/lib'

const authConfig: AuthenticationConfig = {
    storage: ORMUserRepository,
    providers: {
        coreid: {
            driver: CoreIDLoginProvider,
            config: {
                default: true,
                displayName: 'Starship CoreID',
                clientId: env('COREID_CLIENT_ID'),
                clientSecret: env('COREID_CLIENT_SECRET'),
                loginUrl: env('COREID_BASE', '') + '/auth/service/oauth2/authorize?client_id=%c&redirect_uri=%r',
                tokenUrl: env('COREID_BASE', '') + '/auth/service/oauth2/redeem',
                userUrl: env('COREID_BASE', '') + '/api/v1/auth/users/me',
            } as OAuth2LoginProviderConfig,
        }
    },
}

export default authConfig
