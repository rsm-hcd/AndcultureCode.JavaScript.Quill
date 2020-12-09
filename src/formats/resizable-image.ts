import { Quill } from "quill";
import { AttributeConstants } from "../constants/attribute-constants";

const Image = Quill.import("formats/image");

/**
 * Without this custom Quill format,
 * image resizing will work in the editor,
 * and it will save with the right size/alignment,
 * but those values won't restore into the editor
 * when you refresh or come back to the editor.
 * This allows the `style` attribute (which is how
 * width and height are set) to be set when Quill is
 * loaded, properly restoring the saved image size.
 */
class ResizableImage extends Image {
    public static create(props: any) {
        const node = super.create();

        node.setAttribute("src", props.src);
        AttributeConstants.ImageHtmlAttributes.forEach((attr) => {
            if (
                props[attr] != null &&
                props[attr] !== "undefined" &&
                props[attr] !== "null"
            ) {
                node.setAttribute(attr, props[attr]);
            }
        });

        // set tabIndex as well so that you can jump to images
        // to make screen readers read the alt text
        node.setAttribute("tabindex", "0");

        return node;
    }

    public static formats(domNode: HTMLElement) {
        return ATTRIBUTES.reduce((formats, attribute) => {
            const copy: any = { ...formats };

            if (domNode.hasAttribute(attribute)) {
                copy[attribute] = domNode.getAttribute(attribute);
            }

            return copy;
        }, {});
    }

    public static value(node: HTMLElement) {
        return ATTRIBUTES.reduce(
            (attrs, attribute) => {
                const copy: any = { ...attrs };

                if (node.hasAttribute(attribute)) {
                    copy[attribute] = node.getAttribute(attribute);
                }

                return copy;
            },
            { src: node.getAttribute("src") }
        );
    }

    public format(name: string, value: any) {
        if (ATTRIBUTES.indexOf(name) > -1) {
            if (value) {
                this.domNode.setAttribute(name, value);
                return;
            }

            this.domNode.removeAttribute(name);
            return;
        }

        super.format(name, value);
    }
}

export { ResizableImage };
