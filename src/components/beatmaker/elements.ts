import { DomService } from "../../services/dom.service";
import { IconButton } from "../icon-button/icon-button";
import { IconTypes } from "../icon/icons";

export const createDummyElement = (onClick: () => void) => {
  const addChain = DomService.createElement({ part: "add-chain" });
  addChain.append(IconButton.create(IconTypes.add, () => {}));

  addChain.addEventListener("click", () => onClick());
  return addChain;
};
