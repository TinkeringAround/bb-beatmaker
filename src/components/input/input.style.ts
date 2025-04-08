import { IconButton } from '../icon-button/icon-button';

const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  --padding: 0.5rem 1rem;
  --minHeight: 60px;
  
  --fontSize: 1rem;
  --borderRadius: 2rem;
  --fontFamily: 'Poppins', serif;
  --fontWeight: 400;
  --color: var(--dark);
  --backgroundColor: var(--white);
  --hoverBackground: var(--grey);

  --closeRightPosition: 1rem; 

  position: relative;

  display: flex;
  flex-direction: column;

  height: min-content;
  min-height: var(--minHeight);
  padding: 10px;

  font-size: var(--fontSize);
  background: var(--backgroundColor);
  color: var(--color);
  border-bottom: 2px solid transparent;
  border-radius: 2px;

  transition: all 0.15s ease-in-out;
  box-sizing: border-box;
}

[part="message"] {
  color: var(--red);
  font-size: 0.7rem;
}

[part="input"] {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: var(--padding);
  
  font-family: var(--fontFamily);
  font-weight: var(--fontWeight);
  font-style: normal;
  font-size: inherit;

  color: var(--color);
  background: inherit;
  
  border: none;
  outline: none;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  box-sizing: border-box;
}

input[type="checkbox"] {
  accent-color: var(--blue);
  height: 20px; /* not needed */
  width: 20px; /* not needed */
}

label {
  color: var(--background);
  font-size: calc(var(--fontSize) * 0.75);

  cursor: default;
}

${IconButton.tag} {
  --size: 18px;
  --hoverBackground: transparent;

  position: absolute;
  right: var(--closeRightPosition);
  top: 50%;
  transform: translateY(-50%);

  opacity: 0;
  transition: opacity 0.1s ease-in-out;
}

:host(:hover),
:host(:focus),
:host(:focus-visible) {
  border-bottom: solid 2px var(--blue);
  background: var(--hoverBackground);
}

:host(:hover) ${IconButton.tag},
:host(:focus) ${IconButton.tag},
:host(:focus-visible) ${IconButton.tag} {
  opacity: 1;
}

:host([invalid]) {
  border-bottom: solid 2px var(--red);
}
</style>`;

export const createStyles = () => {
    return template.content.cloneNode(true);
};
