import {globalRegistry} from '@extollo/lib'
import {app} from './bootstrap'

globalRegistry.run(async () => {
    /*
     * The Application
     * -----------------------------------------------------
     * The application instance is a global inversion of control container that
     * ties your entire application together. The app container manages services
     * and lifecycle.
     */
    await app().run()
})
