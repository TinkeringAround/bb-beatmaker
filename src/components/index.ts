import { Logo } from "./logo/logo";
import { Beatmaker } from "./beatmaker/beatmaker";
import { Button } from "./button/button";
import { Icon } from "./icon/icon.webcomponent";
import { IconButton } from "./icon-button/icon-button";
import { Input } from "./input/input";
import { AudioChain } from "./audio-chain/audio-chain";
import { LeftSidebar } from "./left-sidebar/left-sidebar";
import { Controls } from "./controls/controls";
import { AudioNode } from "./audio-node/audio-node";

// Define custom Elements here
await Promise.all(
  [
    Logo,
    Button,
    Icon,
    IconButton,
    Input,
    AudioChain,
    AudioNode,
    LeftSidebar,
    Controls,
    Beatmaker,
  ].map((component) => {
    customElements.define(component.tag, component);
    return customElements.whenDefined(component.tag);
  })
);
