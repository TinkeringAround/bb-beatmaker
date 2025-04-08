import { Input } from "../input/input.webcomponent";

const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
    position: relative;

    display: grid;
    grid-template-columns: 200px minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
    gap: 1rem;

    padding: 100px 20px 20px;

    background: var(--dark);
    border-radius: 6px;
  
    box-sizing: border-box;
    transition: all 0.1s ease-in-out;
}

[part="name"] {
  position: absolute;
  top: 20px;
  left: 20px;

  width: calc(100% - 40px);
}

[part="name"], ${Input.tag} {
  --padding: 0;
  --color: var(--dark);
  --backgroundColor: var(--white);
  --hoverBackground: var(--grey);
}

[part="midi"] {
  display: inline-grid;
  grid-template-columns: minmax(0, 1fr);
}

[part="content"] {
  display: inline-block;

  padding: 10px;

  background: var(--white);
  border-radius: 6px;

  white-space:nowrap;
  overflow-x: auto;
  overflow-y: hidden;

  box-sizing: border-box;
}
</style>`;

export const createStyles = () => {
  return template.content.cloneNode(true);
};
