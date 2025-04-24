import { WebComponent } from "../webcomponent";
import { IconButton } from "../icon-button/icon-button";
import { IconTypes } from "../icon/icons";
import { createStyles } from "./right-sidebar.styles";
import { EventService } from "../../services/event.service";
import { RightSidebarEvents } from "./events";
import { DomService } from "../../services/dom.service";
import { BeatmakerService } from "../../services/beatmaker.service";

export class RightSidebar extends WebComponent {
  static readonly tag = "bb-right-sidebar";

  private readonly observers = {
    [RightSidebarEvents.update]: EventService.listenTo(
      RightSidebarEvents.update
    ),
    [RightSidebarEvents.hide]: EventService.listenTo(RightSidebarEvents.hide),
    [RightSidebarEvents.show]: EventService.listenTo(RightSidebarEvents.show),
  };

  private readonly content: HTMLDivElement;
  private readonly toggle: IconButton;
  private readonly dragHandle: HTMLDivElement;
  private readonly dragGhost: HTMLDivElement;

  private _buttons: IconButton[] = [];

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
      `${Math.max(350, Math.min(600, width))}px`
    );
  }

  static create() {
    return document.createElement(RightSidebar.tag) as RightSidebar;
  }

  constructor() {
    super();

    this.content = DomService.createElement({ part: "content" });
    this.toggle = IconButton.create(IconTypes.arrowRightdouble, () => {
      this.visible = false;
    });

    this.dragHandle = DomService.createElement({ part: "drag-handle" });
    this.dragHandle.draggable = true;
    this.dragHandle.append(
      DomService.createElement({
        part: "drag-handle-indicator",
      })
    );

    this.dragGhost = DomService.createElement({ part: "drag-ghost" });

    this.attachShadow({ mode: "open" }).append(
      createStyles(),
      this.toggle,
      ...this._buttons,
      this.content,
      this.dragHandle,
      this.dragGhost
    );
  }

  connectedCallback() {
    this.visible = false;
    this.width = 400;
    this.handleEvents();
    this.renderContent();
  }

  disconnectedCallback() {
    [...Object.values(this.observers)].forEach((observer) =>
      observer.destroy()
    );
  }

  private handleEvents() {
    this.observers["right-sidebar-update"].subscribe(() => {
      this.renderContent();
    });

    this.observers["right-sidebar-hide"].subscribe(() => {
      this.visible = false;
    });

    this.observers["right-sidebar-show"].subscribe(() => {
      this.visible = true;
      this.renderContent();
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
        this.width = window.innerWidth - event.clientX;
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

  private renderContent() {
    this.content.replaceChildren(...BeatmakerService.getNodes());
  }
}
