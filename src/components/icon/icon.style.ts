const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  --size: 100%;

  display: flex;
  height: var(--size);
  width: var(--size);

  padding: 2px;
  border-radius: 2px;

  background: transparent;
  box-sizing: border-box;
}
</style>`;

export const createStyles = () => {
    return template.content.cloneNode(true);
};
