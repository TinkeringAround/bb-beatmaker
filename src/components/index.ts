import { Beatmaker } from "./beatmaker/beatmaker";
import { Button } from "./button/button";
import { Icon } from "./icon/icon.webcomponent";
import { IconButton } from "./icon-button/icon-button";
import { Input } from "./input/input.webcomponent";
import { Volume } from "./volume/volume";
import { Synthesizer } from "./synthesizer/synthesizer";
import { Chain } from "./chain/chain";
import { Sequencer } from "./sequencer/sequencer";
import { LeftSidebar } from "./left-sidebar/left-sidebar";
import { Controls } from "./controls/controls";
import { Logo } from "./logo/logo";

// Define custom Elements here
customElements.define(Beatmaker.tag, Beatmaker);
customElements.define(Button.tag, Button);
customElements.define(Icon.tag, Icon);
customElements.define(IconButton.tag, IconButton);
customElements.define(Input.tag, Input);
customElements.define(Volume.tag, Volume);
customElements.define(Synthesizer.tag, Synthesizer);
customElements.define(Chain.tag, Chain);
customElements.define(Sequencer.tag, Sequencer);
customElements.define(LeftSidebar.tag, LeftSidebar);
customElements.define(Controls.tag, Controls);
customElements.define(Logo.tag, Logo);