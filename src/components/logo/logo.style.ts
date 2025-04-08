const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  position: relative;
  top: -2px; 

  height: 20px;

  color: var(--blue);
  font-size: 20px;
  font-family: 'Bebas Neue', serif;
  font-weight: 400;
  font-style: normal;

  transition: all 0.1s ease-in-out;
  cursor: pointer;
}

:host(:hover) {
    color: var(--dark);
}
</style>`;

export const createStyles = () => {
    return template.content.cloneNode(true);
};
