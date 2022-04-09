import {ORMUser, Singleton, Unit} from '@extollo/lib'
import {User} from './models/User.model'

@Singleton()
export class AppUnit extends Unit {
    async up(): Promise<void> {
        this.container().registerStaticOverride(ORMUser, User)
    }
}
