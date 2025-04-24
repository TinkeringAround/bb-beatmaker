const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
  position: relative;

  display: grid;
  grid-template-columns: minmax(0, 1fr);

  transition: all 0.1s ease-in-out;
}

span {
  position: absolute;

  left: 50%;
  top: 50%;

  color: var(--dark);
  font-size: 1.75rem;

  transform: translate(-50%, -50%);
}

canvas {
  width: inherit;
  height: inherit;

  background: var(--grey);
  border-radius: 2px;
  border: solid 2px var(--blue);
  
  box-sizing: border-box;
}
</style>`;

export const createStyles = () => {
  return template.content.cloneNode(true);
};
