export class WebComponent extends HTMLElement {
  static tag: string;

  static waitFor(tag: string) {
    return customElements.whenDefined(tag);
  }
}
