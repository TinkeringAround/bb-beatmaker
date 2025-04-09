import { ContextMenu } from "../context-menu/context-menu";
import { Icon } from "../icon/icon.webcomponent";

const template = document.createElement("template");
template.innerHTML = `
<style>
:host {
   --fontSize: 1rem;
   --borderRadius: 2rem;
   --padding: 0.75rem 1.25rem;

   --fontFamily: 'Poppins', serif;
   --color: var(--dark);

   display: flex;
   flex-direction: row;
   align-items: center;

   height: min-content;
   min-height: 60px;

   font-size: var(--fonstSize);
   font-family: 'Bebas Neue', serif;
   font-weight: 400;
   font-style: normal;
   background: transparent;

   border-bottom: 2px solid transparent;
   border-radius: 2px;
   outline: none;

   transition: background 0.15s ease-in-out;
   box-sizing: border-box;
}

label {
   color: var(--background);
}

[part="select"] {
   display: flex;
   align-items: baseline;

   padding: 0;

   font-size: inherit;
   font-family: inherit;
   font-weight: inherit;
   font-style: inherit;

   background: transparent;
   color: var(--color);
   
   border-radius: 2px;
   border: none;
   outline: none !important;
   text-align: center;

   transition: all 0.15s ease-in-out;
   box-sizing: border-box;

   cursor: pointer;
   appearance: auto;
}

${ContextMenu.tag} {
   --minWidth: auto;
}

${ContextMenu.tag}::part(context-menu-item) {
   padding: 0 !important;

   text-align: center;
   font-size: 1rem;
}

[part="select"] ${Icon.tag} {
   --size: 18px;
}

[part="select"]:hover {
   color: var(--blue);
   fill: var(--blue);
}
</style>`;

export const createStyles = () => {
  return template.content.cloneNode(true);
};
