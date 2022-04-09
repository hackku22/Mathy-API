import {Application, CommandLineApplication} from '@extollo/lib'
import {Units} from './Units.extollo'

/*
 * Helper functions to bootstrap the Application instance for different uses.
 */

/**
 * Get the base application with no final-target unit.
 */
export function base(): Application {
    const app = Application.getApplication()
    app.scaffold(__dirname, Units.slice(0, -1))
    return app
}

/**
 * Get the application with the final unit replaced with the CommandLineApplication
 * for use on the CLI.
 */
export function cli(): Application {
    const app = Application.getApplication()
    app.forceStartupMessage = false

    const units = [...Units]

    units.reverse()
    CommandLineApplication.setReplacement(units[0])
    units[0] = CommandLineApplication
    units.reverse()

    app.scaffold(__dirname, units)
    return app
}

/**
 * Get the application as it should be run normally.
 */
export function app(): Application {
    const app = Application.getApplication()
    app.scaffold(__dirname, Units)
    return app
}
