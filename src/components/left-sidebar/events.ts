export enum LeftSidebarEvents {
    goTo = 'left-sidebar-go-to',
    show = 'left-sidebar-show',
    hide = 'left-sidebar-hide',
}

export class LeftSidebarGoToEvent extends CustomEvent<""> {
    constructor(detail: "") {
        super(LeftSidebarEvents.goTo, { detail });
    }
}

export class LeftSidebarShowEvent extends CustomEvent<void> {
    constructor() {
        super(LeftSidebarEvents.show);
    }
}

export class LeftSidebarHideEvent extends CustomEvent<void> {
    constructor() {
        super(LeftSidebarEvents.hide);
    }
}
