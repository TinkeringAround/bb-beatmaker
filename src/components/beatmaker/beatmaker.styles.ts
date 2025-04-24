import { Controls } from "../controls/controls";

const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 400px;
  grid-template-rows: min-content minmax(0, 1fr);

  width: 100vw;
  height: 100vh;
}

${Controls.tag} {
  grid-column: span 2;
}

[part="content"] {
  margin: 25px;
  padding: 20px;

  font-size: 1rem;
  line-height: 1.5;
  background: var(--grey);
  outline: none;
  border: none;
  resize: none;

  overflow: auto;
  box-sizing: border-box;
}

[part="nodes"] {
  position: relative;

  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-content: flex-start;
  gap: 16px;

  padding: 25px 25px 25px 0;

  overflow: auto;
  box-sizing: border-box;
}

</style>`;

export const createStyles = () => {
  return template.content.cloneNode(true);
};
