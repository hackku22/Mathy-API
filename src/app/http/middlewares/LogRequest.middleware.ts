import {Inject, Injectable, Logging, Middleware} from '@extollo/lib'

@Injectable()
export class LogRequest extends Middleware {
    @Inject()
    protected readonly logging!: Logging

    public async apply() {
        this.logging.info(`Incoming request: ${this.request.method} @ ${this.request.path}`)
    }
}
