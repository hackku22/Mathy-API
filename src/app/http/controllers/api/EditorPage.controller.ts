import {Controller, view, Inject, Injectable, SecurityContext, api, make, Logging} from '@extollo/lib'
import {EditorPage as Page} from '../../../models/EditorPage.model'

/**
 * EditorPage Controller
 * ------------------------------------
 * Put some description here.
 */
@Injectable()
export class EditorPage extends Controller {
    @Inject()
    protected readonly security!: SecurityContext

    @Inject()
    protected readonly logging!: Logging

    public async list() {
        const pages = await Page.query<Page>()
            .where('user_id', '=', this.security.user().getUniqueIdentifier())
            .get()
            .toArray()

        return api.many(pages)
    }

    public async load() {
        const pageId = this.request.safe('pageId').integer()
        const page = await Page.query<Page>()
            .where('user_id', '=', this.security.user().getUniqueIdentifier())
            .whereKey(pageId)
            .first()

        if ( !page ) {
            return api.error('Page not found.')
        }

        return api.one(page)
    }

    public async save() {
        // Check if page_id is specified
        const serialData = this.request.safe('serialData').string()
        const pageId = String(this.request.input('pageId') ?? '')

        // If so, look it up and update it
        if ( pageId ) {
            const page = await Page.query<Page>()
                .whereKey(parseInt(pageId, 10))
                .where('user_id', '=', this.security.user().getUniqueIdentifier())
                .first()

            if ( !page ) {
                return api.error('Invalid pageId.')
            }

            page.serialData = serialData
            await page.save()
            return api.one(page)
        }

        // If not, create new page and save it
        this.logging.debug('userId:')
        this.logging.debug(this.security.user().getUniqueIdentifier())
        const page = make<Page>(Page)
        page.userId = String(this.security.user().getUniqueIdentifier())
        page.serialData = serialData

        await page.save()
        return api.one(page)
    }
}
