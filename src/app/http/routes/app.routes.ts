import {Route, SessionAuthMiddleware, AuthRequiredMiddleware} from '@extollo/lib'
import {Home} from '../controllers/main/Home.controller'

Route.group('/', () => {
    Route.get('/')
        .calls<Home>(Home, home => home.welcome)
})

Route.group('', () => {
    Route.get('/dash')
        .pre(AuthRequiredMiddleware)
        .calls<Home>(Home, home => home.welcome)
}).pre(SessionAuthMiddleware)
