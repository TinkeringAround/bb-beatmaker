// @ts-ignore
import * as Tone from "tone";

import { WebComponent } from "../webcomponent";
import { createStyles } from "./controls.style";
import { AudioService } from "../../services/audio.service";
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
import { RightSidebarShowEvent } from "../right-sidebar/events";

export class Controls extends WebComponent {
  static tag = "bb-controls";

  private readonly logo: Logo;
  private readonly toggleLeftSidebarButton: IconButton;
  private readonly toggleRightSidebarButton: IconButton;
  private readonly downloadButton: IconButton;

  static create() {
    return document.createElement(Controls.tag) as Controls;
  }

  constructor() {
    super();

    this.logo = Logo.create();
    this.toggleLeftSidebarButton = IconButton.create(
      IconTypes.arrowRightdouble,
      () => EventService.dispatch(new LeftSidebarShowEvent())
    );
    this.toggleRightSidebarButton = IconButton.create(
      IconTypes.arrowLeftDouble,
      () => EventService.dispatch(new RightSidebarShowEvent())
    );

    // Controls
    const startButton = IconButton.create(IconTypes.play, () => {
      AudioService.start();
    });
    const stopButton = IconButton.create(IconTypes.stop, () => {
      AudioService.stop();
      this.downloadButton.disabled = !AudioService.hasAudio;
    });

    this.downloadButton = IconButton.create(IconTypes.download, () =>
      AudioService.download()
    );
    this.downloadButton.disabled = true;

    this.attachShadow({ mode: "closed" }).append(
      createStyles(),
      this.toggleLeftSidebarButton,
      this.logo,
      DomService.createElement(),
      startButton,
      stopButton,
      DomService.createElement(),
      this.downloadButton,
      this.toggleRightSidebarButton
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
      this.toggleLeftSidebarButton.style.visibility = "hidden";
    });

    EventService.listenTo(LeftSidebarEvents.hide).subscribe(() => {
      this.logo.style.visibility = "visible";
      this.toggleLeftSidebarButton.style.visibility = "visible";
    });

    EventService.listenTo(AppEvents.onDownloadStateChange).subscribe(() => {
      this.downloadButton.disabled = !AudioService.hasAudio;
    });
  }
}
