import { IconButton } from "../icon-button/icon-button";

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

[part="content"] {
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 20px;

  overflow: auto;
  box-sizing: border-box;
}

[part="add-chain"] {
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1.5rem;

  background: var(--grey);
  border-radius: 6px;

  transition: all 0.15s ease-in-out;
  cursor: pointer;
}

[part="add-chain"] ${IconButton.tag} {
  --hoverBackground: transparent;
}

[part="add-chain"]:hover {
  background: var(--grey-0-5);
}
</style>`;

export const createStyles = () => {
  return template.content.cloneNode(true);
};
