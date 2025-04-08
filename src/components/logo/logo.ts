import { createStyles } from "./logo.style";
import { WebComponent } from "../webcomponent";

export class Logo extends WebComponent {
  static readonly tag = "bb-logo";

  static create() {
    if (!customElements.get(Logo.tag)) {
      customElements.define(Logo.tag, Logo);
    }

    return document.createElement(Logo.tag) as Logo;
  }

  constructor() {
    super();

    this.title = "Zur Startseite";
    this.attachShadow({ mode: "closed" }).append(
      createStyles(),
      "BEATBOLT"
    );
  }
}
