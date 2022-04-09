import {Inject, Injectable, Logging, BaseJob} from '@extollo/lib'

@Injectable()
export default class LogMessage extends BaseJob {
    @Inject()
    protected readonly logging!: Logging

    async execute(): Promise<void> {
        this.logging.info('Executing LogMessage...')
        await new Promise<void>(res => {
            setTimeout(() => res(), 3000)
        })
        this.logging.success('The LogMessage job has executed!')
    }
}
