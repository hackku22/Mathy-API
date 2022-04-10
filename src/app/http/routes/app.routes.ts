import {Route, AuthRequiredMiddleware, GuestRequiredMiddleware, SessionAuthMiddleware} from '@extollo/lib'
import {Home} from '../controllers/main/Home.controller'
import {Login} from '../controllers/api/Login.controller'

Route.group('/', () => {
    Route.get('/')
        .calls<Home>(Home, home => home.welcome)

    Route.group('/api', () => {
        Route.get('/')
            .handledBy(() => ({
                success: true,
            }))

        Route.group('/login', () => {
            Route.post('/')
                .pre(GuestRequiredMiddleware)
                .calls<Login>(Login, login => login.login)

            Route.get('/status')
                .calls<Login>(Login, login => login.status)

            Route.get('/user')
                .pre(AuthRequiredMiddleware)
                .calls<Login>(Login, login => login.user)
            
        })

        Route.post('/register')
            .pre(GuestRequiredMiddleware)
            .calls<Login>(Login, login => login.register)

        Route.post('/logout')
            .pre(AuthRequiredMiddleware)
            .calls<Login>(Login, login => login.logout)
    })
}).pre(SessionAuthMiddleware)
