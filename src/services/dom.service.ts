interface CreateElementPayload {
    tag?: string;
    part?: string;
    slot?: string;
    textContent?: string;
    innerHTML?: string;
}

export class DomService {
    static createElement<T extends HTMLElement = HTMLDivElement>(
        { tag, part, slot, textContent, innerHTML }: CreateElementPayload = {
            tag: 'div',
        }
    ) {
        const element = document.createElement(tag ?? 'div') as T;

        if (part) {
            element.setAttribute('part', part);
        }

        if (slot) {
            element.slot = slot;
        }

        if (textContent) {
            element.textContent = textContent;
        }

        if (innerHTML) {
            element.innerHTML = innerHTML;
        }

        return element;
    }
}