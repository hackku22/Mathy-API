import {Injectable, Migration, Inject, DatabaseService, FieldType} from '@extollo/lib'

/**
 * CreateEditorPagesTableMigration
 * ----------------------------------
 * Put some description here.
 */
@Injectable()
export default class CreateEditorPagesTableMigration extends Migration {
    @Inject()
    protected readonly db!: DatabaseService

    /**
     * Apply the migration.
     */
    async up(): Promise<void> {
        const schema = this.db.get().schema()
        const table = await schema.table('editor_pages')

        table.primaryKey('page_id').required()

        table.column('user_id')
            .type(FieldType.varchar)
            .required()

        table.column('serial_data')
            .type(FieldType.text)
            .required()

        await schema.commit(table)
    }

    /**
     * Undo the migration.
     */
    async down(): Promise<void> {
        const schema = this.db.get().schema()
        const table = await schema.table('editor_pages')

        table.dropIfExists()

        await schema.commit(table)
    }
}
