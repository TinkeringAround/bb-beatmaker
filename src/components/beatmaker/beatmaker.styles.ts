import { Input } from "../input/input.webcomponent";
import { IconButton } from "../icon-button/icon-button";
import { Button } from "../button/button";

const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: min-content minmax(0, 1fr);

    width: 100vw;
    height: 100vh;
}

[part="controls"] {
  display: grid;
  grid-template-columns: min-content min-content 100px minmax(0, 1fr);
  gap: 1rem;

  padding: 20px;

  background: var(--white);
  box-shadow: rgb(231, 235, 238) 0px -2px 0px 0px inset;

  box-sizing: border-box;
}

[part="controls"] ${Button.tag}:last-of-type {
  justify-self: end;
}

[part="content"] {
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 20px;

  overflow: auto;
  box-sizing: border-box;
}

[part="content"] ${IconButton.tag} {
  position: absolute;
  top: 12px;
  left: 20px;
}

${Input.tag} {
  --padding: 0 1rem;
}
</style>`;

export const createStyles = () => {
  return template.content.cloneNode(true);
};