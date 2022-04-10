import {Controller, make, view, Inject, Injectable, SecurityContext, api, Safe, redirect, UserAuthenticationResumedEvent} from '@extollo/lib'
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

    public async login() {
        const email = this.request.safe('email').string()
        const password = this.request.safe('password').string()

        const user = await User.query<User>()
            .where('username', '=', email).first()
        if ( !user ) {
            return api.error('Do I know you?')
        }

        const verify = await user.verifyPassword(password)

        if ( !verify ) {
            return api.error('Bruv, invalid password.')
        }

        await this.security.authenticate(user)

        return api.one(user)
    }

    public async register() {
        const name = this.request.safe('name').string()
        const email = this.request.safe('email').string()
        const password = this.request.safe('password').string()
        // lookup user for conflict
        const user = await User.query<User>()
            .where('username', '=', email).first()
        if ( user ) {
            return api.error('You\'ve got a doppleganger')
        }

        // else, create new user and save to db
        const newUser = make<User>(User)
        newUser.firstName = name
        newUser.lastName = ''
        newUser.username = email
        await newUser.setPassword(password)
        await newUser.save()

        // then login
        await this.security.authenticate(newUser)

        return api.one(newUser)
    }

    public async logout() {
        await this.security.flush()
    }
}
