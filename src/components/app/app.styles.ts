const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
    width: 100vw;
    height: 100vh;
}
</style>`;

export const createStyles = () => {
  return template.content.cloneNode(true);
};