import { DomService } from "../../services/dom.service";
import { WebComponent } from "../webcomponent";
import { Icon } from "../icon/icon.webcomponent";
import { IconAttributes, IconTypes } from "../icon/icons";
import { createStyles } from "./icon-button.style";

export class IconButton extends WebComponent {
  static readonly tag = "bb-icon-button";
  //@ts-ignore
  private static readonly observedAttributes = [IconAttributes.type];

  readonly iconElement: Icon;

  set type(type: IconTypes) {
    this.iconElement.type = type;
  }

  get type() {
    return (
      (this.getAttribute(IconAttributes.type) as IconTypes) ?? IconTypes.add
    );
  }

  set disabled(disabled: boolean) {
    if (disabled) {
      this.setAttribute("disabled", "");
      return;
    }

    this.removeAttribute("disabled");
  }

  get disabled() {
    return this.hasAttribute("disabled");
  }

  static create(
    type: IconTypes,
    onClick: (event: MouseEvent) => void,
    tooltip = ""
  ) {
    const iconButton = document.createElement(IconButton.tag) as IconButton;
    iconButton.setAttribute(IconAttributes.type, type);
    iconButton.setAttribute("title", tooltip);
    iconButton.addEventListener("click", (event) => {
      if (!iconButton.disabled) {
        onClick(event);
      }
    });

    return iconButton;
  }

  constructor() {
    super();

    this.iconElement = Icon.create(this.type);

    this.attachShadow({ mode: "open" }).append(
      createStyles(),
      this.iconElement,
      DomService.createElement<HTMLSlotElement>({ tag: "slot" })
    );
  }

  connectedCallback() {
    this.updateIcon();
  }

  attributeChangedCallback(_: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.updateIcon();
    }
  }

  updateIcon() {
    this.iconElement.type = this.type;
  }
}
