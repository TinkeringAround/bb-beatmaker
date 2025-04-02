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

    color: var(--dark);
    background: var(--white);
    border-radius: 6px;

    box-sizing: border-box;
}

h1 {
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0;
  padding: 0 10px;

  border-radius: 6px;
  font-size: 1.25rem;

  background: var(--grey);
}

[part="content"] {
    padding: 10px;

    box-sizing: border-box;
}
</style>`;

export const createStyles = () => {
  return template.content.cloneNode(true);
};