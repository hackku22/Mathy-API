import {AuthenticationConfig, ORMUserRepository, BasicLoginProvider} from '@extollo/lib'

const authConfig: AuthenticationConfig = {
    storage: ORMUserRepository,
    providers: {
        basic: {
            driver: BasicLoginProvider,
            config: {
                default: true,
                allow: {
                    login: true,
                    registration: true,
                },
            },
        }
    },
}

export default authConfig
