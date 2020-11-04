import {
    Action,
    AlignAction,
    ImageSpec as ImageBlotSpec,
} from "quill-blot-formatter";
import { ImageDeleteAction } from "../actions/image-delete-action";
import { ImageResizeAction } from "../actions/image-resize-action";
import { SetAltTextAction } from "../actions/set-alt-text-action";

/**
 * Custom quill-blot-formatter spec to handle
 * repositioning the image resize handles
 * when the editor scrolls.
 */
export class ImageSpec extends ImageBlotSpec {
    // Override
    getActions(): Array<typeof Action> {
        return [
            AlignAction,
            ImageDeleteAction,
            ImageResizeAction,
            SetAltTextAction,
        ];
    }

    // Override
    init() {
        this.formatter.quill.root.addEventListener("click", this.onClick);

        // handling scroll event
        this.formatter.quill.root.addEventListener("scroll", () => {
            this.formatter.repositionOverlay();
        });

        // handling align
        this.formatter.quill.on(
            "editor-change",
            (eventName: string, ...args: any) => {
                if (eventName === "selection-change" && args[2] === "api") {
                    setTimeout(() => {
                        this.formatter.repositionOverlay();
                    }, 10);
                }
            }
        );
    }
}
