import {Route, SessionAuthMiddleware} from '@extollo/lib'
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
            Route.get('/status')
                .calls<Login>(Login, login => login.status)

            Route.get('/user')
                .calls<Login>(Login, login => login.user)

            Route.post('/user')
                .calls<Login>(Login, login => login.callbackFromAuth0)
        })
    })
}).pre(SessionAuthMiddleware)
