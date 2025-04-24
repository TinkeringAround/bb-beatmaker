import { Icon } from "../icon/icon.webcomponent";

const template = document.createElement("template");
template.innerHTML = `
<style>
 :host {
    --fillColor: var(--dark);
    --hoverFillColor: var(--blue);
    --hoverBackground: var(--grey);
    --height: 26px;
    --width: 26px;

    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 2px;

    height: var(--height);
    width: var(--width);

    background: transparent;
    fill: var(--fillColor);
    border-radius: 4px;

    box-sizing: border-box;
    transition background 0.15s ease-in-out;

    cursor: pointer;
}

${Icon.tag} {
  height: 80%;
  width: 80%;

  border-radius: 2px;
  fill: inherit;

  transition fill 0.15s ease-in-out;
}

:host(:hover) {
  color: var(--hoverFillColor);
  fill: var(--hoverFillColor);
  background: var(--hoverBackground);
}

:host([disabled]) {
  color: var(--grey);
  fill: var(--grey);
  background: transparent;
}
</style>`;

export const createStyles = () => {
  return template.content.cloneNode(true);
};
