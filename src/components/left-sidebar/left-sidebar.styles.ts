import { IconButton } from "../icon-button/icon-button";
import { Logo } from "../logo/logo";

const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
    --width: 400px;

    position: relative;

    display: flex;
    flex-direction: column;
    flex-grow: 0;
    flex-shrink: 0;

    height: auto;
    width: 0px;

    padding: 60px 0 0 0;
    
    background: var(--white);
    
    pointer-events: none;
    visibility: hidden;
    opacity: 0;

    transform: translateX(calc(-1 * var(--width))) translateY(60px);
    transition-duration: 250ms;
    transition-timing-function: ease;
    transition-property: width, opacity, transform;

    box-sizing: border-box;
    z-index: 10;
}

${Logo.tag} {
    position: absolute;
    top: 16px;
    left: 16px;
}

${IconButton.tag} {
    position: absolute;
    top: 16px;
    right: 16px;
}

[part="drag-handle"] {
    position: absolute;
    right: -5px;
    top: 0;

    height: 100%;
    width: 10px;

    background: transparent;

    cursor: col-resize;
}

[part="drag-handle-indicator"] {
    position: absolute;
    left: 3px;

    height: 100%;
    width: 2px;

    background: var(--background);

    transition: all 0.1s ease-in-out;
}

[part="drag-handle"]:hover [part="drag-handle-indicator"],
[part="drag-handle"][active] [part="drag-handle-indicator"] {
    background: var(--blue);
}

[part="drag-ghost"] {
    width: 1px;
    height: 1px;

    background: transparent;
}

:host([visible]) {
    height: 100vh;
    width: var(--width);

    visibility: visible;
    opacity: 1;

    transform: translateX(0) translateY(0);
    pointer-events: all;
}

[part="content"] {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 1rem;
    
    align-items: center;
    justify-items: center;
    width: var(--width);
    color: var(--dark);
    overflow: auto;
}

[part="content"] > div {
    display: flex;
    height: 40px;
    width: 100%;
    
    justify-content: center;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
    transition: all 0.1s ease-in-out:
}

[part="content"] > div:hover {
    background: var(--grey);
}
</style>`;

export const createStyles = () => {
  return template.content.cloneNode(true);
};
