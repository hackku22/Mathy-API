import {Route, AuthRequiredMiddleware, GuestRequiredMiddleware, SessionAuthMiddleware} from '@extollo/lib'
import {Home} from '../controllers/main/Home.controller'
import {Login} from '../controllers/api/Login.controller'
import {EditorPage} from '../controllers/api/EditorPage.controller'

Route.group('/', () => {
    Route.get('/')
        .calls<Home>(Home, home => home.welcome)

    Route.group('/api', () => {
        Route.get('/')
            .handledBy(() => ({
                success: true,
            }))

        Route.group('/editor', () => {
            Route.post('/page')
                .calls<EditorPage>(EditorPage, page => page.save)

            Route.get('/page')
                .calls<EditorPage>(EditorPage, page => page.load)

            Route.get('/pages')
                .calls<EditorPage>(EditorPage, page => page.list)
        }).pre(AuthRequiredMiddleware)

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
