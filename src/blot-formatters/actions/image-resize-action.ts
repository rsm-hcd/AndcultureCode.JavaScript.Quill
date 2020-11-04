import { ResizeAction } from "quill-blot-formatter";

/**
 * Custom resize action to disable text selection
 * while dragging image resize handles
 */
export class ImageResizeAction extends ResizeAction {
    // Can't use super.onDrag here
    // because it's defined as a property
    // on the superclass, instead of as a method,
    // so the logic is copied from the superclass here
    onDrag = (event: MouseEvent) => {
        if (!this.formatter.currentSpec) {
            return;
        }

        const target = this.formatter.currentSpec.getTargetElement();
        if (!target) {
            return;
        }

        ImageResizeAction.toggleUserSelect(false);

        const deltaX = event.clientX - this.dragStartX;
        let newWidth: number;

        if (
            this.dragHandle === this.topLeftHandle ||
            this.dragHandle === this.bottomLeftHandle
        ) {
            newWidth = Math.round(this.preDragWidth - deltaX);
        } else {
            newWidth = Math.round(this.preDragWidth + deltaX);
        }

        const containerWidth = target.parentElement!.getBoundingClientRect()
            .width;

        const newWidthPercent = ((newWidth / containerWidth) * 100).toFixed(0);

        target.setAttribute("width", `${newWidthPercent}%`);
        target.setAttribute("height", "auto");

        this.formatter.update();
    };

    onMouseUp = () => {
        this.setCursor("");
        ImageResizeAction.toggleUserSelect(true);
        document.removeEventListener("mousemove", this.onDrag);
        document.removeEventListener("mouseup", this.onMouseUp);
    };

    private static toggleUserSelect(enabled: boolean) {
        if (enabled) {
            document.body.style.setProperty("-moz-user-select", "auto");
            document.body.style.setProperty("-webkit-user-select", "auto");
            document.body.style.setProperty("-ms-user-select", "auto");
            document.body.style.setProperty("-o-user-select", "auto");
            document.body.style.setProperty("user-select", "auto");
            document.onselectstart = () => true;
            document.onselect = () => true;
            document.onselectionchange = () => true;
            return;
        }

        document.body.style.setProperty("-moz-user-select", "none");
        document.body.style.setProperty("-webkit-user-select", "none");
        document.body.style.setProperty("-ms-user-select", "none");
        document.body.style.setProperty("-o-user-select", "none");
        document.body.style.setProperty("user-select", "none");
        document.onselectstart = () => false;
        document.onselect = () => false;
        document.onselectionchange = () => false;
    }
}
