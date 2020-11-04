import { Quill } from "quill";

/**
 * Base class for custom Quill modules.
 */
export abstract class QuillModule<TOptions> {
    protected quill: Quill;
    protected readonly options: TOptions;

    protected constructor(quill: Quill, options: TOptions) {
        this.quill = quill;
        this.options = options;
    }
}
