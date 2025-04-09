import { Icon } from '../icon/icon.webcomponent';
import { IconTypes } from '../icon/icons';

export const createItem = (
    text: string,
    iconType: IconTypes | null,
    onclick: (() => void) | null,
    disabled: boolean = false
) => {
    const item = document.createElement('div');
    item.setAttribute('part', 'context-menu-item');

    if (disabled) {
        item.setAttribute('disabled', '');
    }

    if (iconType) {
        item.append(Icon.create(iconType));
        item.style.gridTemplateColumns = '2rem minmax(0, 1fr)';
    }

    if (!!onclick) {
        item.setAttribute('type', 'button');
        item.addEventListener('click', () => {
            if (!disabled) {
                onclick();
            }
        });

        if (!iconType) {
            item.style.padding = '0 1rem';
        }
    }

    item.append(text);
    return item;
};
