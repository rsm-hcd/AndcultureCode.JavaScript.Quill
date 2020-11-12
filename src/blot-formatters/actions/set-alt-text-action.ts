import BlotFormatter, { Action } from "quill-blot-formatter";
import { StringUtils } from "andculturecode-javascript-core";

class SetAltTextAction extends Action {
    private readonly applyCallback: (e: Event) => void;
    private readonly containerEl: HTMLElement;
    private readonly inputEl: HTMLInputElement;

    // -------------------------------------------------------------------------------------------------
    // #region Constructor
    // -------------------------------------------------------------------------------------------------

    constructor(formatter: BlotFormatter) {
        super(formatter);
        const elements = SetAltTextAction.buildAltTextInput(
            this.getImgAltText()
        );
        this.containerEl = elements.container;
        this.inputEl = elements.input;
        this.applyCallback = this.onApply.bind(this);
    }

    // #endregion Constructor

    // -------------------------------------------------------------------------------------------------
    // #region Action Overrides
    // -------------------------------------------------------------------------------------------------

    public onCreate() {
        super.onCreate();
        this.setInputValue(this.getImgAltText());
        this.formatter.overlay.appendChild(this.containerEl);
        this.inputEl.addEventListener("change", this.applyCallback);
    }

    public onDestroy() {
        super.onDestroy();
        this.formatter.overlay.removeChild(this.containerEl);
        this.inputEl.removeEventListener("change", this.applyCallback);
    }

    // #endregion Action Overrides

    // -------------------------------------------------------------------------------------------------
    // #region Private Methods
    // -------------------------------------------------------------------------------------------------

    private getImgAltText(): string | undefined {
        const img = this.formatter.currentSpec?.getTargetElement() as HTMLImageElement;
        if (img == null) {
            return undefined;
        }

        return img.alt;
    }

    private setImgAltText(altText: string) {
        const img = this.formatter.currentSpec?.getTargetElement() as HTMLImageElement;
        if (img == null) {
            return;
        }

        img.alt = altText;
    }

    private setInputValue(inputValue?: string) {
        if (StringUtils.isEmpty(inputValue)) {
            return;
        }

        this.inputEl.value = inputValue!;
    }

    private onApply(e: Event) {
        const input = e.target as HTMLInputElement;
        this.setImgAltText(input.value);
    }

    private static buildAltTextInput(inputValue?: string) {
        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.backgroundColor = "white";
        container.style.padding = "4px";
        container.style.boxShadow = "0px 7px 20px #646a82";
        container.style.borderRadius = "4px";
        container.style.position = "absolute";
        container.style.bottom = "-48px";
        container.style.left = "50%";
        container.style.width = "300px";
        container.style.marginLeft = "-150px";

        const input = document.createElement("input");
        input.setAttribute("data-quill-alt-text-input", "true");
        input.placeholder = "Alt text...";
        input.style.padding = "8px";
        input.style.fontSize = "12px";
        if (StringUtils.hasValue(inputValue)) {
            input.value = inputValue!;
        }

        container.appendChild(input);

        return { container, input };
    }

    // #endregion Private Methods
}

export { SetAltTextAction };
