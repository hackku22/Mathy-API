import {AuthenticationConfig, ORMUserRepository} from '@extollo/lib'

const authConfig: AuthenticationConfig = {
    storage: ORMUserRepository,
    providers: {},
}

export default authConfig
