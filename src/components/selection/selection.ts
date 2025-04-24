import { WebComponent } from "../webcomponent";
import { createStyles } from "./selection.style";
import { SelectionValueChangeEvent } from "./events";
import { DomService } from "../../services/dom.service";
import {
  ContextMenu,
  ContextMenuItemTypes
} from "../context-menu/context-menu";
import { Icon } from "../icon/icon.webcomponent";
import { IconTypes } from "../icon/icons";

export class Selection extends WebComponent {
  static readonly tag = "wb-selection";
  static readonly observedAttributes = ["options", "label", "value"];

  private readonly valueElement: HTMLDivElement;
  private readonly contextMenu: ContextMenu;

  private _options: string[] = [];

  set options(options: string[]) {
    this._options = options;
  }

  get options() {
    return this._options;
  }

  set value(value: string) {
    this.setAttribute("value", value);
  }

  get value() {
    return this.getAttribute("value") ?? "";
  }

  static create(options: string[]) {
    const selection = document.createElement(Selection.tag) as Selection;
    selection.options = options;

    return selection;
  }

  constructor() {
    super();

    this.valueElement = DomService.createElement({
      tag: "div",
      part: "select"
    });

    this.contextMenu = ContextMenu.create();

    this.attachShadow({ mode: "open" }).append(
      createStyles(),
      this.valueElement,
      this.contextMenu
    );
  }

  connectedCallback() {
    if (this.options.length > 0 && this.value == "") {
      this.value = this.options[0];
    }

    this.renderContent();
    this.handleEvents();
  }

  attributeChangedCallback(_: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.renderContent();
    }
  }

  private handleEvents() {
    this.addEventListener("click", () => {
      const { x, y, width } = this.getBoundingClientRect();
      this.contextMenu.style.width = `${2.5 * width}px`;

      // 108px are default size with two button elements -> 1/4 = 27px
      // IMPORTANT! When more than two elements this wont work anymore
      if (this.options.length > 2) {
        console.error("IMPORTANT! When more than two elements will break");
      }

      this.contextMenu.addEventListener(
        "mouseleave",
        () => {
          // this.contextMenu.visible = false;
        },
        { once: true }
      );
      this.contextMenu.showRelativeTo(x -  1.25 * width / 2, y - 27);
    });
  }

  private renderContent() {
    this.tabIndex = 0;
    this.contextMenu.items = this.options.map(option => ({
      type: ContextMenuItemTypes.button,
      text: option,
      onClick: () => this.updateValue(option)
    }));

    this.updateValueElement();
  }

  private updateValue(value: string) {
    if (this.value != value) {
      this.value = value;
      this.dispatchEvent(new SelectionValueChangeEvent(this.value));
    }
  }

  private updateValueElement() {
    this.valueElement.replaceChildren(
      this.value,
      Icon.create(IconTypes.arrowDown)
    );
  }
}
