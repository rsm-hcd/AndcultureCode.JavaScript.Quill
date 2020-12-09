import {
    Action,
    AlignAction,
    ImageSpec as ImageBlotSpec,
} from "quill-blot-formatter";
import { ImageDeleteAction } from "../actions/image-delete-action";
import { ImageResizeAction } from "../actions/image-resize-action";
import { SetAltTextAction } from "../actions/set-alt-text-action";
import { QuillEvents } from "../../constants/quill-events";
import { QuillSources } from "../../constants/quill-sources";

/**
 * Custom quill-blot-formatter spec to handle
 * repositioning the image resize handles
 * when the editor scrolls.
 */
class ImageSpec extends ImageBlotSpec {
    // -----------------------------------------------------------------------------------------
    // #region Public Methods
    // -----------------------------------------------------------------------------------------

    // Override
    public getActions(): Array<typeof Action> {
        return [
            AlignAction,
            ImageDeleteAction,
            ImageResizeAction,
            SetAltTextAction,
        ];
    }

    // Override
    public init() {
        this.formatter.quill.root.addEventListener("click", this.onClick);

        // handling scroll event
        this.formatter.quill.root.addEventListener("scroll", () => {
            this.formatter.repositionOverlay();
        });

        // handling align
        this.formatter.quill.on(
            QuillEvents.EditorChange,
            (eventName: string, ...args: any) => {
                if (
                    eventName === QuillEvents.SelectionChange &&
                    args[2] === QuillSources.Api
                ) {
                    setTimeout(() => {
                        this.formatter.repositionOverlay();
                    }, 10);
                }
            }
        );
    }

    // #endregion Public Methods
}

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { ImageSpec };

// #endregion Exports
