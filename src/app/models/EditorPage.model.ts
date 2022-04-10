import {Field, FieldType, Injectable, Model} from '@extollo/lib'

/**
 * EditorPage Model
 */
@Injectable()
export class EditorPage extends Model<EditorPage> {
    protected static table = 'editor_pages'
    protected static key = 'page_id'

    @Field(FieldType.serial, 'page_id')
    public pageId?: number

    @Field(FieldType.varchar, 'user_id')
    public userId!: string

    @Field(FieldType.text, 'serial_data')
    public serialData!: string
}
