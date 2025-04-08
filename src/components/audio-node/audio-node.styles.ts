const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
  display: inline-grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: 50px minmax(0, 1fr);

  height: 250px;
  width: 200px;
  margin-right: 1rem;

  color: var(--black);
  background: var(--white);
  outline: solid 2px var(--background);
  border-radius: 6px;

  transition: all 0.15s ease-in-out;
  box-sizing: border-box;
}

h1 {
  display: flex;
  justify-content: center;
  align-items: flex-end;

  margin: 0;
  padding: 5px 0;

  border-radius: 6px 6px 0 0;
  font-size: 0.8rem;

  color: var(--white);
  background: var(--background);
  text-transform: capitalize;

  user-select: none;
  transition: all 0.15s ease-in-out;
  cursor: grab;
}

[part="content"] {
  padding: 10px;

  box-sizing: border-box;
}

:host(:hover) {
  outline: 2px solid var(--blue);
}

:host(:hover) h1 {
  background: var(--blue);
}

:host(:not([draggable])) h1 {
  cursor: default;
}
</style>`;

export const createStyles = () => {
  return template.content.cloneNode(true);
};
