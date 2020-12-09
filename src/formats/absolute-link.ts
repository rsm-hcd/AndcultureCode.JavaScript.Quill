import { Quill } from "quill";

const AbsoluteLink = Quill.import("formats/link");

// -----------------------------------------------------------------------------------------
// #region Constants
// -----------------------------------------------------------------------------------------

const allowedProtocols = ["tel:", "mailto:", "http://", "https://"];

// #endregion Constants

// -----------------------------------------------------------------------------------------
// #region Implementation
// -----------------------------------------------------------------------------------------

const defaultSanitizeFunction = AbsoluteLink.sanitize.bind(AbsoluteLink);
AbsoluteLink.sanitize = function(input: string) {
    if (input == null) {
        input = "";
    }

    if (
        !allowedProtocols.some((protocol: string) =>
            input.toLowerCase().startsWith(protocol)
        )
    ) {
        input = `https://${input}`;
    }

    return defaultSanitizeFunction(input);
};

// #endregion Implementation

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { AbsoluteLink };

// #endregion Exports
