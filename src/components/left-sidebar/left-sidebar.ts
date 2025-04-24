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
import { AUDIO_TYPES, InstrumentTypes } from "../../models/model";
import { DocsService } from "../../services/docs.service";

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
      DomService.createElement({
        innerHTML: `
        <h1>instrument</h1>
        <p>Mögliche Werte für Instruments: ${Object.values(
          InstrumentTypes
        )}</p>`,
      }),

      ...[...AUDIO_TYPES]
        .sort((a, b) => a.localeCompare(b))
        .map((audioType) => {
          const node = DomService.createElement({
            innerHTML: `
          <h1>${audioType}</h1>
          <p>${DocsService.getDocs(audioType)}</p>`,
          });
          node.draggable = true;

          node.addEventListener("dragstart", (event) => {
            if (event.dataTransfer) {
              event.dataTransfer.setData("type", audioType);

              event.dataTransfer.setDragImage(node, 10, 10);
              event.dataTransfer.effectAllowed = "copy";
              event.dataTransfer.dropEffect = "copy";
            }
          });

          return node;
        })
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
  }

  private onToggleSidebar() {
    if (this.visible) {
      EventService.dispatch(new LeftSidebarHideEvent());
    }

    this.visible = !this.visible;
  }
}
