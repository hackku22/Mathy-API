import {Controller, view, Inject, Injectable, SecurityContext, api} from '@extollo/lib'
import {User} from '../../../models/User.model'

/**
 * Login Controller
 * ------------------------------------
 * API routes related to logging users into the application.
 */
@Injectable()
export class Login extends Controller {
    @Inject()
    protected readonly security!: SecurityContext

    public status() {
        return api.one({
            hasUser: this.security.hasUser(),
        })
    }

    public user() {
        const user = this.security.getUser()
        if ( !user ) {
            return api.error('There is no user authenticated.')
        }

        return api.one(user)
    }

    public async callbackFromAuth0() {
        return api.error('Implement me!')
    }
}
