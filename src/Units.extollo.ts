import {
    Config,
    Controllers,
    HTTPServer,
    Files,
    Middlewares,
    Routing,
    Unit,
    Database,
    Models,
    CommandLine,
    Internationalization,
    Authentication,
    Discovery,
    ValidationUnit,
    Migrations,
    Queueables,
    Redis,
    Bus,
} from '@extollo/lib'
import {AppUnit} from './app/AppUnit'

Error.stackTraceLimit = 500

export const Units = [
    Config,
    Redis,
    Queueables,
    Bus,
    ValidationUnit,
    Files,
    CommandLine,
    Controllers,
    Middlewares,
    Database,
    Models,
    Migrations,
    Internationalization,
    Authentication,

    AppUnit,

    Routing,
    Discovery,
    HTTPServer,
] as (typeof Unit)[]
