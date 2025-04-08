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
</style>`;

export const createStyles = () => {
  return template.content.cloneNode(true);
};
