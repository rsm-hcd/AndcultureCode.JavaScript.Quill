import { EnvironmentUtils } from "andculturecode-javascript-core";
import { BrowserUtils } from "andculturecode-javascript-core";
import { CoreUtils } from "andculturecode-javascript-core";
import { Quill } from "quill";
import { StringUtils } from "andculturecode-javascript-core";
import { QuillModule } from "./quill-module";
import { FormatNames } from "../constants/format-names";

/**
 * Module to hack accessibility into the toolbar.
 * Code based on https://github.com/quilljs/quill/issues/1173#issuecomment-265912867
 * This module can be removed once native accessibility is added to Quill core.
 * @see https://github.com/quilljs/quill/issues/1173
 * @see https://github.com/quilljs/quill/issues/2038
 */
class QuillToolbarAccessibilityModule extends QuillModule<{}> {
    public static modulePath = "modules/toolbarAccessibility";

    constructor(quill: Quill) {
        super(quill, {});
        this.applyAccessibleToolbarButtonTitles();
    }

    private getToolbar(): Element | undefined {
        const toolbars = this.quill.root.parentElement?.parentElement?.getElementsByClassName(
            "ql-toolbar"
        );

        // if 0 or >1 toolbars, something is wrong, bail
        if (toolbars == null || toolbars.length !== 1) {
            return undefined;
        }

        return toolbars[0];
    }

    private async waitForToolbarToBeRendered() {
        let retryCount = 0;
        let toolbar = this.getToolbar();
        while (toolbar == null && retryCount < 10) {
            await CoreUtils.sleep(100);
            toolbar = this.getToolbar();
            retryCount++;
        }

        if (toolbar == null) {
            EnvironmentUtils.runIfDevelopment(() =>
                console.warn("Quill toolbar not rendered after 1 second.")
            );
        }
    }

    private async applyAccessibleToolbarButtonTitles() {
        await this.waitForToolbarToBeRendered();
        const toolbar = this.getToolbar();
        if (toolbar == null) {
            return;
        }

        const [buttons, pickers] = this.getControls(toolbar);
        this.disableSvgFocusOnIE(toolbar);
        this.applyButtonAccessibleText(buttons);
        this.applyPickerAccessibility(pickers);
    }

    private applyButtonAccessibleText(
        buttons: HTMLCollectionOf<HTMLButtonElement>
    ) {
        for (let i = 0; i < buttons.length; i++) {
            const button = buttons[i];
            const format = button.className?.replace("ql-", "") ?? "";
            if (StringUtils.isEmpty(format)) {
                continue;
            }

            // list type buttons (bullet/ordered list)
            if (format === FormatNames.List && button.hasAttribute("value")) {
                const listType = button.getAttribute("value");
                button.setAttribute("aria-label", `Toggle ${listType} list`);
                continue;
            }

            if (format === FormatNames.Strike) {
                button.setAttribute("aria-label", "Toggle strikethrough text");
                continue;
            }

            if (format === FormatNames.Link) {
                button.setAttribute("aria-label", "Insert link");
                continue;
            }

            if (format === FormatNames.Image) {
                button.setAttribute("aria-label", "Insert image");
                continue;
            }

            button.setAttribute("aria-label", `Toggle ${format} text`);
        }
    }

    private applyPickerAccessibility(pickers: HTMLCollectionOf<Element>) {
        for (let i = 0; i < pickers.length; i++) {
            const picker = pickers[i];
            const labelEl = picker.getElementsByClassName("ql-picker-label")[0];
            const dropdownLabel = this.getDropdownLabel(picker);

            if (dropdownLabel === "header") {
                labelEl.setAttribute("aria-label", "Header style");
            }

            if (dropdownLabel === "align") {
                labelEl.setAttribute("aria-label", "Text align");
            }

            labelEl.setAttribute("role", "button");
            labelEl.setAttribute("aria-haspopup", "true");
            labelEl.setAttribute("tabindex", "0");

            const options = this.getOptionsElements(picker);
            for (let j = 0; j < options.length; j++) {
                const option = options[j];
                let value = option.getAttribute("data-value");

                if (dropdownLabel === "align") {
                    if (StringUtils.isEmpty(value ?? undefined)) {
                        value = "left";
                    }

                    option.setAttribute("aria-label", `Align ${value}`);
                    continue;
                }

                option.setAttribute("aria-label", `Header ${value}`);
            }
        }
    }

    private getOptionsElements(picker: Element): HTMLCollectionOf<Element> {
        const optionsContainer = picker.getElementsByClassName(
            "ql-picker-options"
        )[0];

        if (optionsContainer == null) {
            return ([] as unknown) as HTMLCollectionOf<Element>;
        }

        return optionsContainer.getElementsByClassName("ql-picker-item");
    }

    private getDropdownLabel(picker: Element): string | undefined {
        return Array.from(picker.classList)
            .filter(
                (className: string) =>
                    className !== "ql-picker" &&
                    className !== "ql-expanded" &&
                    className.startsWith("ql-")
            )[0]
            ?.replace("ql-", "");
    }

    /**
     * IE has an issue where, after the button is focused, the next focused element
     * would be the SVG icon inside the button, instead of the next button
     */
    private disableSvgFocusOnIE(toolbar: Element) {
        if (BrowserUtils.isIE()) {
            const svgArray = Array.from(
                toolbar.getElementsByTagName("svg") ?? []
            );
            svgArray.forEach((svg: SVGSVGElement) =>
                svg.setAttribute("focusable", "false")
            );
        }
    }

    private getControls(
        container: Element
    ): [HTMLCollectionOf<HTMLButtonElement>, HTMLCollectionOf<Element>] {
        return [
            container.getElementsByTagName("button"),
            container.getElementsByClassName("ql-picker"),
        ];
    }
}

export { QuillToolbarAccessibilityModule };
