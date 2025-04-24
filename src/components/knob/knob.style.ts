const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
    --size: 100;

    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr) min-content;

    padding: 10px;
    width: var(--size)px;

    background: var(--grey);
    border-radius: 6px;
    
    cursor: pointer;
    user-select: none;
    touch-action: none;

    box-sizing: content-box;
}

[part="wrapper"] {
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
}

canvas {
    display: block;

    width: var(--size)px;
    height: var(--size)px;
}

[part="label"] {
    font-size: max(calc(var(--size) / 100 * 0.8rem), 0.5rem);
    color: var(--dark);
    font-family: 'Poppins', sans-serif;
    text-align: center;
}

[part="tooltip"] {
    position: fixed;

    padding: 2px 6px;

    background: var(--dark);
    color: var(--white);
    font-size: 0.8rem;
    border-radius: 6px;

    box-sizing: border-box;
}
</style>
`;

export const createStyles = () => {
  return template.content.cloneNode(true);
};
