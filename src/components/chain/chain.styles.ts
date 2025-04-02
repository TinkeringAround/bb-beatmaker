const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
}

[part="content"] {
  display: block;

  padding: 40px 20px 20px;

  background: var(--background);
  border-radius: 6px;

  box-sizing: border-box;
  transition: all 0.1s ease-in-out;

  white-space:nowrap;
  overflow-x: auto;
  overflow-y: hidden;
}

[part="content"]:hover {
  background: var(--dark);
}
</style>`;

export const createStyles = () => {
  return template.content.cloneNode(true);
};