import { DomService } from "../../services/dom.service";
import { ValidatorFunction } from "../../services/validator.service";
import { WebComponent } from "../webcomponent";
import { IconButton } from "../icon-button/icon-button";
import { IconTypes } from "../icon/icons";
import {
  InputInputEvent,
  InputSubmitEvent,
  InputValueChangeEvent,
} from "./events";
import { createStyles } from "./input.style";
import { InputAttributes } from "./model";

export class Input extends WebComponent {
  static readonly tag = "bb-input";
  //@ts-ignore
  private static readonly observedAttributes = Object.values(InputAttributes);

  private validatorFunction: ValidatorFunction | null = null;

  private readonly inputElement: HTMLInputElement;
  private readonly labelElement: HTMLLabelElement;
  private readonly messageElement: HTMLSpanElement;
  private readonly clearButton: IconButton;

  get value() {
    return this.getAttribute(InputAttributes.value) ?? "";
  }

  set value(value: string) {
    this.setAttribute(InputAttributes.value, value);
  }

  get placeHolder() {
    return this.getAttribute(InputAttributes.placeHolder) ?? "";
  }

  set placeHolder(placeHolder: string) {
    this.setAttribute(InputAttributes.placeHolder, placeHolder);
  }

  get type() {
    return this.getAttribute(InputAttributes.type) ?? "";
  }

  set type(type: string) {
    this.setAttribute(InputAttributes.type, type);
  }

  get label() {
    return this.getAttribute(InputAttributes.label) ?? "";
  }

  set label(label: string) {
    this.setAttribute(InputAttributes.label, label);
  }

  get valid() {
    return this.validatorFunction
      ? !(this.getAttribute(InputAttributes.invalid) == "")
      : true;
  }

  set validator(validatorFunction: ValidatorFunction | null) {
    this.validatorFunction = validatorFunction;
  }

  get checked() {
    return this.inputElement.checked;
  }

  static create(
    value: string = "",
    placeHolder: string = "",
    label: string = "",
    type = "text",
    validator: ValidatorFunction = () => null
  ) {
    const input = document.createElement(Input.tag) as Input;
    input.value = value;
    input.placeHolder = placeHolder;
    input.type = type;
    input.label = label;
    input.validatorFunction = validator;

    return input;
  }

  constructor() {
    super();

    this.inputElement = DomService.createElement<HTMLInputElement>({
      tag: "input",
      part: "input",
    });

    this.labelElement = DomService.createElement<HTMLLabelElement>({
      tag: "label",
      part: "label",
    });

    this.messageElement = DomService.createElement<HTMLSpanElement>({
      tag: "span",
      part: "message",
    });

    this.clearButton = IconButton.create(IconTypes.close, () => {
      this.onValueChange("");
    });

    this.attachShadow({ mode: "closed" }).append(
      createStyles(),
      this.labelElement,
      this.inputElement,
      this.messageElement,
      this.clearButton
    );
  }

  connectedCallback() {
    this.handleEvents();
    this.updateInput();
  }

  attributeChangedCallback(_: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.updateInput();
    }
  }

  validate() {
    if (this.validatorFunction) {
      console.log("value", this.value);
      const validationResult = this.validatorFunction(this.value);

      if (!!validationResult) {
        this.setAttribute(InputAttributes.invalid, "");
        this.messageElement.textContent = validationResult;
        this.messageElement.style.display = "block";
        return;
      }

      this.removeAttribute(InputAttributes.invalid);
      this.messageElement.style.display = "none";
    }
  }

  private handleEvents() {
    this.inputElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        this.dispatchEvent(new InputSubmitEvent(this.inputElement.value));
      }
    });

    this.inputElement.addEventListener("input", (event) => {
      this.onValueChange((event.target as HTMLInputElement).value);
    });

    this.inputElement.addEventListener("focusout", () => {
      this.validate();
    });

    this.inputElement.addEventListener("change", () => {
      this.validate();
      this.dispatchEvent(new InputValueChangeEvent(this.value));
    });
  }

  private onValueChange(newValue: string) {
    if (this.value !== newValue) {
      this.value = newValue;
      this.dispatchEvent(new InputInputEvent(newValue));
    }
  }

  private updateInput() {
    this.inputElement.value = this.value;
    this.inputElement.placeholder = this.placeHolder;
    this.inputElement.type = this.type;

    if (this.label) {
      this.labelElement.textContent = this.label;
      this.labelElement.style.display = "block";
    } else {
      this.labelElement.style.display = "none";
    }

    if (this.type == "number" || this.type == "checkbox") {
      this.clearButton.style.display = "none";
    }

    if (this.type == "checkbox") {
      this.style.width = "50px";
      this.style.alignItems = "center";
      this.style.minHeight = "80px";
      this.style.justifyContent = "space-between";
      this.style.flex = "0";
    }
  }

  // @ts-ignore
  override focus() {
    this.inputElement.focus();
  }
}
