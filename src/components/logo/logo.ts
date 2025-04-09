import { WebComponent } from "../webcomponent";
import { createStyles } from "./logo.style";

export class Logo extends WebComponent {
  static readonly tag = "bb-logo";

  static create() {
    return document.createElement(Logo.tag) as Logo;
  }

  constructor() {
    super();

    this.attachShadow({ mode: "closed" }).append(createStyles(), "BL!TZAMPLE");
  }

  connectedCallback() {
    this.title = "Zur Startseite";
  }
}
