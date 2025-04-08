import { Logo } from "./logo/logo";
import { Beatmaker } from "./beatmaker/beatmaker";
import { Button } from "./button/button";
import { Icon } from "./icon/icon.webcomponent";
import { IconButton } from "./icon-button/icon-button";
import { Input } from "./input/input.webcomponent";
import { AudioChain } from "./audio-chain/audio-chain";
import { LeftSidebar } from "./left-sidebar/left-sidebar";
import { Controls } from "./controls/controls";
import { AudioNode } from "./audio-node/audio-node";

// Define custom Elements here
customElements.define(Logo.tag, Logo);
customElements.define(Button.tag, Button);
customElements.define(Icon.tag, Icon);
customElements.define(IconButton.tag, IconButton);
customElements.define(Input.tag, Input);

customElements.define(AudioChain.tag, AudioChain);
customElements.define(AudioNode.tag, AudioNode);

customElements.define(LeftSidebar.tag, LeftSidebar);
customElements.define(Controls.tag, Controls);
customElements.define(Beatmaker.tag, Beatmaker);
