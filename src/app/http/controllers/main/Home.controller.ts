import {Controller, view, Session, Inject, Injectable, Locale, Validator} from '@extollo/lib'
import {UserLogin} from "../../../types/UserLogin";

@Injectable()
export class Home extends Controller {
    @Inject()
    protected readonly session!: Session;

    @Inject()
    protected readonly locale!: Locale;

    public welcome() {
        this.session.set('app_visits', this.session.get('app_visits', 0) + 1)

        const valid = new Promise<UserLogin>(() => {})

        return view('@extollo:welcome', {
            app_visits: this.session.get('app_visits'),
            locale: this.locale.helper(),
        })
    }

    public test() {
        return new Validator<UserLogin>()
    }
}
