import { IconButton } from "../icon-button/icon-button";

const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
    --width: 400px;

    position: fixed;
    top: 0;
    right: 0;

    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);

    height: auto;
    width: 0px;

    padding: 40px 0 0 0;
    
    background: var(--white);
    box-shadow: rgba(15, 15, 15, 0.04) 0px 0px 0px 1px, rgba(15, 15, 15, 0.03) 0px 3px 6px, rgba(15, 15, 15, 0.06) 0px 9px 24px;
    
    pointer-events: none;
    visibility: hidden;
    opacity: 0;

    transform: translateX(var(--width)) translateY(60px);
    transition-duration: 300ms;
    transition-timing-function: ease;
    transition-property: width, opacity, transform;

    z-index: 100;
    box-sizing: border-box;
}

[part="drag-handle"] {
    position: absolute;
    left: -5px;
    top: 0;

    height: 100%;
    width: 10px;

    background: transparent;

    cursor: col-resize;
}

[part="drag-handle-indicator"] {
    position: absolute;
    right: 3px;

    height: 100%;
    width: 2px;

    background: transparent;

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

[part="content"] {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    align-content: flex-start;
    gap: 1rem;

    padding: 25px;

    box-sizing: border-box;

    overflow: hidden auto;
    scrollbar-color: var(--background) transparent;
    scrollbar-width: thin;
}

${IconButton.tag} {
    position: absolute;
    top: 7px;
    left: 7px;
}

[part="content"]  > div {
    height: min-content;
    padding: 10px;
    
    background: var(--grey);
    font-size: 0.8rem;
    color: var(--dark);
    border-radius: 2px;
  
    box-sizing: border-box;
}

[part="content"]  > div h1 {
    margin: 0;
  
    color: var(--blue);
    font-size: 1rem;
}
  
[part="content"]  > div span {
    display: block;
}

:host([visible]) {
    height: 100%;
    width: var(--width);

    visibility: visible;
    opacity: 1;

    transform: translateX(0) translateY(0);
    pointer-events: all;
}
</style>`;

export const createStyles = () => {
  return template.content.cloneNode(true);
};
