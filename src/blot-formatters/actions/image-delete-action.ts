import BlotFormatter, { Action } from "quill-blot-formatter";
import { Quill } from "quill";

/**
 * Custom Blot Formatter action to allow the alt-text input to be backspaced
 * without deleting the image. If alt-text input is not focused,
 * delete or backspace key will delete the image.
 */
class ImageDeleteAction extends Action {
    private readonly keyDownCallback: (e: KeyboardEvent) => void;

    // -------------------------------------------------------------------------------------------------
    // #region Constructor
    // -------------------------------------------------------------------------------------------------

    constructor(formatter: BlotFormatter) {
        super(formatter);
        this.keyDownCallback = this.onKeyDown.bind(this);
    }

    // #endregion Constructor

    // -------------------------------------------------------------------------------------------------
    // #region Action Overrides
    // -------------------------------------------------------------------------------------------------

    /**
     * Called when the editor is created. Attach event handlers.
     */
    public onCreate() {
        document.addEventListener("keydown", this.keyDownCallback, true);
        document.body.addEventListener("keydown", this.keyDownCallback, true);
        this.formatter.quill.root.addEventListener(
            "keydown",
            this.keyDownCallback,
            true
        );
        this.formatter.overlay.addEventListener(
            "keydown",
            this.keyDownCallback,
            true
        );
    }

    /**
     * Called when the editor is destroyed. Clean up event listeners.
     */
    public onDestroy() {
        document.removeEventListener("keydown", this.keyDownCallback);
        document.body.removeEventListener("keydown", this.keyDownCallback);
        this.formatter.quill.root.removeEventListener(
            "keydown",
            this.keyDownCallback
        );
        this.formatter.overlay.removeEventListener(
            "keydown",
            this.keyDownCallback
        );
    }

    // #endregion Action Overrides

    // -------------------------------------------------------------------------------------------------
    // #region Private Methods
    // -------------------------------------------------------------------------------------------------

    private onKeyDown(e: KeyboardEvent) {
        const target = this.formatter.currentSpec?.getTargetElement();
        if (target == null) {
            return;
        }

        const currentFocusedEl = document.activeElement;

        // currently focused on alt text input
        if (currentFocusedEl?.hasAttribute("data-quill-alt-text-input")) {
            return;
        }

        if (e.key === "Backspace" || e.key === "Delete") {
            const blot = Quill.find(target);
            if (blot) {
                e.preventDefault();
                e.stopPropagation();
                blot.deleteAt(0);
            }
            this.formatter.hide();
        }
    }

    // #endregion Private Methods
}

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { ImageDeleteAction };

// #endregion Exports
