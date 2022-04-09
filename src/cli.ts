#!/usr/bin/env -S node --experimental-repl-await
import {globalRegistry} from '@extollo/lib'
import {cli} from './bootstrap'

globalRegistry.run(async () => {
    /*
     * The Application
     * -----------------------------------------------------
     * The application instance is a global inversion of control container that
     * ties your entire application together. The app container manages services
     * and lifecycle.
     */
    const app = cli()
    await app.run()
})
