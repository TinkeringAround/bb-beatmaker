const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
  display: grid;
  grid-template-columns: minmax(0, 1fr);

  transition: all 0.1s ease-in-out;
}

canvas {
  width: inherit;
  height: inherit;

  background: var(--white);
  border-radius: 2px;
  border: solid 2px var(--green);
  
  box-sizing: border-box;
}
</style>`;

export const createStyles = () => {
  return template.content.cloneNode(true);
};
