// @ts-ignore
import * as Tone from "tone";

import { WebComponent } from "../webcomponent";
import { createStyles } from "./chain.styles";
import { DomService } from "../../services/dom.service";
import { Sequencer } from "../sequencer/sequencer";
import { Synthesizer } from "../synthesizer/synthesizer";
import { Volume } from "../volume/volume";

export class Chain extends WebComponent {
  static tag = "bb-chain";

  private nodes: any[] = [Synthesizer.create(), Volume.create()];

  private readonly content = DomService.createElement({part: "content"});

  static create() {
    return document.createElement(Chain.tag) as Chain;
  }

  constructor() {
    super();

    this.attachShadow({ mode: "closed" }).append(createStyles(), this.content);
  }

  connectedCallback() {
    const sequencer = Sequencer.create();
    this.content.append(sequencer, ...this.nodes);

    setTimeout(() => {
      for (let i = 0; i < this.nodes.length - 1; i += 1) {
        this.nodes[i].node.connect(this.nodes[i + 1].node);
      }
      this.nodes[this.nodes.length - 1].node.toDestination();

      sequencer.connect(this.nodes[0].node);
    }, 1000);
  }

  disconnectedCallback() {
  }
}
