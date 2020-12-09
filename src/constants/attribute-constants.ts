/**
 * An array of all the attributes we're allowing
 * mapping onto HTML <img> tags in the Quill editor.
 */
const ImageHtmlAttributes = ["alt", "class", "data-align", "height", "width"];

/**
 * An array of all the vendor-prefixed user-select attributes
 */
const UserSelectAttributes = [
    "-moz-user-select",
    "-webkit-user-select",
    "-ms-user-select",
    "-o-user-select",
    "user-select",
];

export const AttributeConstants = {
    ImageHtmlAttributes,
    UserSelectAttributes,
};
