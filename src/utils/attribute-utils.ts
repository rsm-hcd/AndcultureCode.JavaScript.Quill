import { AttributeConstants } from "../constants/attribute-constants";

const toggleUserSelect = (enabled: boolean) => {
    if (enabled) {
        AttributeConstants.UserSelectAttributes.forEach((attr: string) =>
            document.body.style.setProperty(attr, "auto")
        );
        document.onselectstart = () => true;
        document.onselect = () => true;
        document.onselectionchange = () => true;
        return;
    }

    AttributeConstants.UserSelectAttributes.forEach((attr: string) =>
        document.body.style.setProperty(attr, "none")
    );
    document.onselectstart = () => false;
    document.onselect = () => false;
    document.onselectionchange = () => false;
};

export const AttributeUtils = {
    toggleUserSelect,
};
