import { Logo } from "./logo/logo";
import { Beatmaker } from "./beatmaker/beatmaker";
import { Button } from "./button/button";
import { Icon } from "./icon/icon.webcomponent";
import { IconButton } from "./icon-button/icon-button";
import { Input } from "./input/input";
import { LeftSidebar } from "./left-sidebar/left-sidebar";
import { Controls } from "./controls/controls";
import { ContextMenu } from "./context-menu/context-menu";
import { Selection } from "./selection/selection";
import { AudioWave } from "./audiowave/audiowave";
import { FrequencySpectrum } from "./frequency-spectrum/frequency-spectrum";
import { RightSidebar } from "./right-sidebar/right-sidebar";
import { RMS } from "./rms/rms";

// Define custom Elements here
(async () => {
  await Promise.all(
    [
      Logo,
      Button,
      Icon,
      IconButton,
      ContextMenu,
      Input,
      LeftSidebar,
      RightSidebar,
      Controls,
      Selection,
      AudioWave,
      FrequencySpectrum,
      RMS,
      Beatmaker,
    ].map((component) => {
      customElements.define(component.tag, component);
      return customElements.whenDefined(component.tag);
    })
  );
})();
