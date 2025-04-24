// @ts-ignore
import * as Tone from "tone";

import { WebComponent } from "../webcomponent";
import { createStyles } from "./controls.style";
import { AudioService } from "../../services/audio.service";
import { Input } from "../input/input";
import { InputEvents } from "../input/events";
import { IconButton } from "../icon-button/icon-button";
import { IconTypes } from "../icon/icons";
import { EventService } from "../../services/event.service";
import {
  LeftSidebarShowEvent,
  LeftSidebarEvents,
} from "../left-sidebar/events";
import { DomService } from "../../services/dom.service";
import { Logo } from "../logo/logo";
import { AppEvents } from "../../events";

export class Controls extends WebComponent {
  static tag = "bb-controls";

  private readonly logo: Logo;
  private readonly toggleButton: IconButton;
  private readonly downloadButton: IconButton;

  static create() {
    return document.createElement(Controls.tag) as Controls;
  }

  constructor() {
    super();

    this.logo = Logo.create();
    this.toggleButton = IconButton.create(IconTypes.arrowRightdouble, () =>
      EventService.dispatch(new LeftSidebarShowEvent())
    );

    // Controls
    const startButton = IconButton.create(IconTypes.play, () => {
      AudioService.start();
    });
    const stopButton = IconButton.create(IconTypes.stop, () => {
      AudioService.stop();
      this.downloadButton.disabled = !AudioService.hasAudio;
    });

    const bpm = Input.create("160", "BPM", "BPM", "number");
    bpm.addEventListener(InputEvents.input, () => {
      try {
        AudioService.bpm = Number(bpm.value);
      } catch (_) {}
    });

    this.downloadButton = IconButton.create(IconTypes.download, () =>
      AudioService.download()
    );
    this.downloadButton.disabled = true;

    this.attachShadow({ mode: "closed" }).append(
      createStyles(),
      this.toggleButton,
      this.logo,
      DomService.createElement(),
      startButton,
      stopButton,
      bpm,
      DomService.createElement(),
      this.downloadButton
    );
  }

  connectedCallback() {
    AudioService.bpm = 160;
    AudioService.prepareRecorder();

    this.handleEvents();
  }

  disconnectedCallback() {
    AudioService.stop();
  }

  private handleEvents() {
    EventService.listenTo(LeftSidebarEvents.show).subscribe(() => {
      this.logo.style.visibility = "hidden";
      this.toggleButton.style.visibility = "hidden";
    });

    EventService.listenTo(LeftSidebarEvents.hide).subscribe(() => {
      this.logo.style.visibility = "visible";
      this.toggleButton.style.visibility = "visible";
    });

    EventService.listenTo(AppEvents.onDownloadStateChange).subscribe(() => {
      this.downloadButton.disabled = !AudioService.hasAudio;
    });
  }
}
