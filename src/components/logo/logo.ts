import { createStyles } from './logo.style';

export class Logo extends HTMLElement {
    static readonly tag = 'bb-logo';

    static create() {
        return document.createElement(Logo.tag) as Logo;
    }

    constructor() {
        super();

        this.title = 'Zur Startseite';
        this.attachShadow({ mode: 'closed' }).append(
            createStyles(),
            'BEATBOLT'
        );
    }
}
