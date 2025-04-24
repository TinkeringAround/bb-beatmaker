import { WebComponent } from '../webcomponent';
import { IconTypes } from '../icon/icons';
import { createStyles } from './context-menu.style';
import { createItem } from './elements';

export enum ContextMenuItemTypes {
    text,
    button,
    separator,
}

export interface ContextMenuItem {
    type: ContextMenuItemTypes;
    disabled?: boolean;
    icon?: IconTypes;
    text?: string;
    onClick?: () => void;
    stayOpen?: boolean;
}

export interface ContextMenuRefPosition {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class ContextMenu extends WebComponent {
    static readonly tag = 'wb-context-menu';

    private readonly shadowDom: ShadowRoot;

    set items(items: ContextMenuItem[]) {
        this.update(items);
    }

    set visible(visible: boolean) {
        if (visible) {
            this.setAttribute('visible', '');
            this.updateHeight();
            return;
        }

        this.removeAttribute('visible');
    }

    get visible() {
        return this.getAttribute('visible') == '';
    }

    static create() {
        return document.createElement(ContextMenu.tag) as ContextMenu;
    }

    constructor() {
        super();

        this.shadowDom = this.attachShadow({ mode: 'open' });
        this.shadowDom.append(createStyles());
    }

    connectedCallback() {
        // hide on start
        this.visible = false;

        this.handleEvents();
    }

    private handleEvents() {
        this.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });
    }

    show(x: number, y: number) {
        const { width, height } = this.getBoundingClientRect();

        const correction = 20; // so that mouse is directly inside of the context menu
        let posX = x - correction,
            posY = y - correction;

        if (posX + width > window.innerWidth) {
            posX = posX - width + 2 * correction;
        }

        if (posY + height > window.innerHeight) {
            posY = posY - height + 2 * correction;
        }

        this.style.left = `${posX}px`;
        this.style.top = `${posY}px`;

        this.visible = true;
    }

    showRelativeTo(x: number, y: number) {
        let posX = x,
            posY = y;

        this.style.left = `${posX}px`;
        this.style.top = `${posY}px`;

        this.visible = true;
    }

    private update(items: ContextMenuItem[]) {
        this.shadowDom.replaceChildren(
            createStyles(),
            ...items.map((item) => {
                switch (item.type) {
                    case ContextMenuItemTypes.text:
                    case ContextMenuItemTypes.button:
                        return createItem(
                            item.text ?? '',
                            item.icon ?? null,
                            !!item.onClick
                                ? () => {
                                      item.onClick && item.onClick();
                                      if (!item.stayOpen) {
                                          // IMPORTANT: The timeout time must be shorter than the time out time in the component using the context menu and want to hide it!
                                          setTimeout(() => {
                                              this.visible = false;
                                          }, 10);
                                      }
                                  }
                                : null,
                            item.disabled ?? false
                        );
                    case ContextMenuItemTypes.separator:
                        return document.createElement('hr');
                }
            })
        );
        this.updateHeight();
    }

    private updateHeight() {
        if (this.shadowDom.children.length > 8) {
            let maxHeight = 0;
            [...this.shadowDom.children]
                .slice(0, Math.min(this.shadowDom.children.length, 8))
                .forEach(
                    (child) =>
                        (maxHeight += child.getBoundingClientRect().height)
                );
            this.style.height = `${Math.max(350, maxHeight)}px`;
            this.scrollTo({ top: 0 });
            return;
        }

        this.style.height = `auto`;
    }
}
