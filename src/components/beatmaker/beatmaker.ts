// @ts-ignore
import * as Tone from "tone";

import { WebComponent } from "../webcomponent";
import { createStyles } from "./beatmaker.styles";
import { DomService } from "../../services/dom.service";
import { Chain } from "../chain/chain";
import { Controls } from "../controls/controls";

export class Beatmaker extends WebComponent {
  static tag = "bb-beatmaker";

  private readonly content: HTMLDivElement = DomService.createElement({
    part: "content"
  });

  constructor() {
    super();

    this.attachShadow({ mode: "closed" }).append(
      createStyles(),
      Controls.create(),
      this.content
    );
  }

  connectedCallback() {
    this.renderContent();
  }

  private renderContent() {
    // Instruments
    this.content.append(Chain.create());
  }
}
