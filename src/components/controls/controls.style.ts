import { Input } from "../input/input";

const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
  display: grid;
  grid-template-columns: min-content min-content minmax(0, 1fr) min-content min-content 100px minmax(0, 1fr) min-content;
  align-items: center;
  gap: 1rem;

  height: 60px;
  padding: 0 20px;

  background: var(--white);
  box-shadow: rgb(231, 235, 238) 0px -2px 0px 0px inset;

  box-sizing: border-box;
}

${Input.tag} {
  --padding: 0;
  --minHeight: unset;
  --fontSize: 0.75rem;
  --backgroundColor: transparent;
  --hoverBackground: transparent;
  --closeRightPosition: 0;
  width: 100%;
  padding: 5px;
}

${Input.tag} {
  --padding: 0 1rem;
}
</style>`;

export const createStyles = () => {
  return template.content.cloneNode(true);
};
