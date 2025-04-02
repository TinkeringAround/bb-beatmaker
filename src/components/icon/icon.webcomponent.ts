import { WebComponent } from '../webcomponent';
import { createStyles } from './icon.style';
import { IconTypes, IconAttributes, ICONS } from './icons';

export class Icon extends WebComponent {
    static readonly tag = 'wb-icon';

    readonly iconElement: SVGSVGElement;

    //@ts-ignore
    private static readonly observedAttributes = Object.values(IconAttributes);

    static create(type: IconTypes) {
        const iconElement = document.createElement(Icon.tag);
        iconElement.setAttribute(IconAttributes.type, type);
        return iconElement as Icon;
    }

    set type(type: IconTypes) {
        this.setAttribute(IconAttributes.type, type);
    }

    get icon() {
        const iconType: IconTypes =
            (this.getAttribute(IconAttributes.type) as IconTypes) ?? 'add';
        return ICONS[iconType];
    }

    constructor() {
        super();

        this.iconElement = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'svg'
        );
        this.iconElement.setAttribute('part', 'icon');
        this.iconElement.setAttribute('height', '100%');
        this.iconElement.setAttribute('width', '100%');

        this.attachShadow({ mode: 'closed' }).append(
            createStyles(),
            this.iconElement
        );
    }

    connectedCallback() {
        this.updateIcon();
    }

    attributeChangedCallback(_: string, oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            this.updateIcon();
        }
    }

    updateIcon() {
        this.iconElement.setAttribute('viewBox', this.icon.viewBox);
        this.iconElement.innerHTML = `<path d="${this.icon.path}" />`;
    }
}
