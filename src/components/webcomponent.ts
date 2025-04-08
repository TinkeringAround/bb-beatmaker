export class WebComponent extends HTMLElement {
  static tag: string;

  waitFor(tag: string) {
    return customElements.whenDefined(tag);
  }
}
