export enum RightSidebarEvents {
  update = "right-sidebar-update",
  show = "right-sidebar-show",
  hide = "right-sidebar-hide",
}

export class RightSidebarUpdateEvent extends CustomEvent<void> {
  constructor() {
    super(RightSidebarEvents.update);
  }
}

export class RightSidebarShowEvent extends CustomEvent<void> {
  constructor() {
    super(RightSidebarEvents.show);
  }
}

export class RightSidebarHideEvent extends CustomEvent<void> {
  constructor() {
    super(RightSidebarEvents.hide);
  }
}
