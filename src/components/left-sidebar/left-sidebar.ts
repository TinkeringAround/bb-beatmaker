import { EventService } from "../../services/event.service";
import { DomService } from "../../services/dom.service";
import { WebComponent } from "../webcomponent";
import { IconButton } from "../icon-button/icon-button";
import { IconTypes } from "../icon/icons";
import {
  LeftSidebarEvents,
  LeftSidebarHideEvent,
  LeftSidebarShowEvent,
} from "./events";
import { createStyles } from "./left-sidebar.styles";
import { Logo } from "../logo/logo";
import { INSTRUMENTS, UTILS } from "../audio-node/model";
import { AudioNode } from "../audio-node/audio-node";

export class LeftSidebar extends WebComponent {
  static readonly tag = "bb-left-sidebar";

  private readonly toggle: IconButton;
  private readonly dragHandle: HTMLDivElement;
  private readonly dragGhost: HTMLDivElement;
  private readonly content: HTMLDivElement = DomService.createElement({
    part: "content",
  });

  set visible(visible: boolean) {
    if (visible) {
      this.setAttribute("visible", "");
      return;
    }

    this.removeAttribute("visible");
  }

  get visible() {
    return this.getAttribute("visible") == "";
  }

  set width(width: number) {
    this.style.setProperty(
      "--width",
      `${Math.max(350, Math.min(window.innerWidth - 650, width))}px`
    );
  }

  static create() {
    return document.createElement(LeftSidebar.tag) as LeftSidebar;
  }

  constructor() {
    super();

    this.toggle = IconButton.create(IconTypes.arrowLeftDouble, () =>
      this.onToggleSidebar()
    );

    this.dragHandle = DomService.createElement({ part: "drag-handle" });
    this.dragHandle.draggable = true;
    this.dragHandle.append(
      DomService.createElement({
        part: "drag-handle-indicator",
      })
    );

    this.dragGhost = DomService.createElement({ part: "drag-ghost" });

    this.attachShadow({ mode: "open" }).append(createStyles());
  }

  connectedCallback() {
    if (this.shadowRoot) {
      this.shadowRoot.append(
        Logo.create(),
        this.toggle,
        this.dragHandle,
        this.dragGhost,
        this.content
      );
    }

    this.visible = false;
    this.width = 400;

    this.handleEvents();
    this.renderContent();
  }

  private renderContent() {
    this.content.append(
      // Instruments
      DomService.createElement({ tag: "h1", textContent: "Instruments" }),
      ...INSTRUMENTS.map((type) => AudioNode.create(type, true)),

      // Utils
      DomService.createElement({ tag: "h1", textContent: "Utility" }),
      ...UTILS.map((type) => AudioNode.create(type, true))
    );
  }

  private handleEvents() {
    EventService.listenTo(LeftSidebarEvents.goTo).subscribe((_) => {
      if (!this.visible) {
        EventService.dispatch(new LeftSidebarShowEvent());
      }
    });

    EventService.listenTo(LeftSidebarEvents.show).subscribe(() => {
      this.visible = true;
    });

    this.dragHandle.addEventListener("dragstart", (event) => {
      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setDragImage(this.dragGhost, 0, 0);
      }
      this.style.setProperty("transition-property", "opacity, transform");
      this.dragHandle.setAttribute("active", "");
    });

    this.dragHandle.addEventListener("drag", (event) => {
      if (event.clientX > 0) {
        this.width = event.clientX;
      }
    });

    this.dragHandle.addEventListener("dragend", () => {
      this.style.setProperty(
        "transition-property",
        "width, opacity, transform"
      );
      this.dragHandle.removeAttribute("active");
    });
  }

  private onToggleSidebar() {
    if (this.visible) {
      EventService.dispatch(new LeftSidebarHideEvent());
    }

    this.visible = !this.visible;
  }
}
