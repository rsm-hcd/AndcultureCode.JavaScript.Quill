import { ResizeAction } from "quill-blot-formatter";
import { AttributeUtils } from "../../utils/attribute-utils";

/**
 * Custom resize action to disable text selection
 * while dragging image resize handles
 */
class ImageResizeAction extends ResizeAction {
    // -----------------------------------------------------------------------------------------
    // #region Public Properties
    // -----------------------------------------------------------------------------------------

    // Can't use super.onDrag here
    // because it's defined as a property
    // on the superclass, instead of as a method,
    // so the logic is copied from the superclass here
    public onDrag = (event: MouseEvent) => {
        if (!this.formatter.currentSpec) {
            return;
        }

        const target = this.formatter.currentSpec.getTargetElement();
        if (!target) {
            return;
        }

        AttributeUtils.toggleUserSelect(false);

        const deltaX = event.clientX - this.dragStartX;
        let newWidth: number = Math.round(this.preDragWidth + deltaX);

        if (
            this.dragHandle === this.topLeftHandle ||
            this.dragHandle === this.bottomLeftHandle
        ) {
            newWidth = Math.round(this.preDragWidth - deltaX);
        }

        const containerWidth = target.parentElement!.getBoundingClientRect()
            .width;

        const newWidthPercent = ((newWidth / containerWidth) * 100).toFixed(0);

        target.setAttribute("width", `${newWidthPercent}%`);
        target.setAttribute("height", "auto");

        this.formatter.update();
    };

    public onMouseUp = () => {
        this.setCursor("");
        AttributeUtils.toggleUserSelect(true);
        document.removeEventListener("mousemove", this.onDrag);
        document.removeEventListener("mouseup", this.onMouseUp);
    };

    // #endregion Public Properties
}

export { ImageResizeAction };
