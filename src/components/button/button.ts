import { WebComponent } from "../webcomponent";
import { createStyles } from "./button.style";

type ButtonVariants = "primary" | "secondary" | "danger";

export class Button extends WebComponent {
  static readonly tag = "bb-button";
  static readonly observedAttributes = Object.values(["text", "variant"]);

  set disabled(disabled: boolean) {
    if (disabled) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }

  get disabled() {
    return !!this.getAttribute("disabled");
  }

  set text(text: string) {
    this.setAttribute("text", text);
  }

  get text() {
    return this.getAttribute("text") ?? "";
  }

  set variant(variant: ButtonVariants) {
    this.setAttribute("variant", variant);
  }

  get variant(): ButtonVariants {
    return (this.getAttribute("variant") as ButtonVariants) ?? "primary";
  }

  static create(
    text: string,
    onClick: any,
    variant: ButtonVariants = "primary",
    tooltip = ""
  ) {
    const buttonElement = document.createElement(Button.tag) as Button;
    buttonElement.text = text;
    buttonElement.setAttribute("variant", variant);
    buttonElement.setAttribute("title", tooltip);
    buttonElement.addEventListener("click", onClick);

    return buttonElement;
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).append(createStyles());
  }

  connectedCallback() {
    this.setAttribute("type", "button");

    this.variant = this.variant;
    this.disabled = this.disabled;
  }

  attributeChangedCallback(_: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.update();
    }
  }

  update() {
    this.shadowRoot?.replaceChildren(createStyles(), this.text);
  }
}
