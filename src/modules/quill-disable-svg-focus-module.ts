import { EnvironmentUtils } from "andculturecode-javascript-core";
import { BrowserUtils } from "andculturecode-javascript-core";
import { CoreUtils } from "andculturecode-javascript-core";
import { Quill } from "quill";
import { StringUtils } from "andculturecode-javascript-core";
import { QuillModule } from "./quill-module";
import { FormatNames } from "../constants/format-names";

/**
 * Module to fix an IE issue where SVGs are focusable by tabbing
 * when they shouldn't be focusable. Adding `focusable="false"`
 * to the SVG elements fixes this.
 */
class QuillDisableSvgFocus extends QuillModule<{}> {
    constructor(quill: Quill) {
        super(quill, {});
        this.disableSvgFocus();
    }

    private getToolbar(): Element | undefined {
        const toolbars = this.quill.root.parentElement?.parentElement?.getElementsByClassName(
            "ql-toolbar"
        );

        // if 0 or >1 toolbars, something is wrong, bail
        if (toolbars == null || toolbars.length !== 1) {
            EnvironmentUtils.runIfDevelopment(() => {
                console.warn(
                    `quill::modules/accessibility not running. Expected exactly 1 toolbar but found ${toolbars?.length ??
                        0}.`
                );
            });
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

    private async disableSvgFocus() {
        // IE has an issue where, after the button is focused, the next focused element
        // would be the SVG icon inside the button, instead of the next button
        if (!BrowserUtils.isIE()) {
            return;
        }

        await this.waitForToolbarToBeRendered();
        const toolbar = this.getToolbar();
        if (toolbar == null) {
            return;
        }

        const svgArray = Array.from(toolbar.getElementsByTagName("svg") ?? []);
        svgArray.forEach((svg: SVGSVGElement) =>
            svg.setAttribute("focusable", "false")
        );
    }
}

export { QuillDisableSvgFocus };
