import { WebComponent } from "../webcomponent";
import { createStyles } from "./knob.style";
import { DomService } from "../../services/dom.service";
import { KnobValueChangeEvent } from "./events";

export class Knob extends WebComponent {
  static readonly tag = "bb-knob";
  static readonly observedAttributes = ["value", "min", "max", "label"];

  private readonly canvas: HTMLCanvasElement;
  private readonly labelEl: HTMLElement;
  private readonly tooltipEl: HTMLElement;

  private ctx: CanvasRenderingContext2D | null = null;
  private isDragging = false;

  private _onValueChange: ((value: number) => void) | undefined = undefined;

  static create(
    value: number = 0,
    min: number = 0,
    max: number = 100,
    step: number = 1,
    label: string = "",
    unit: string = "",
    size: number = 100
  ): Knob {
    const knob = document.createElement(Knob.tag) as Knob;
    knob.value = value;
    knob.min = min;
    knob.max = max;
    knob.step = step;
    knob.label = label;
    knob.unit = unit;
    knob.size = size;

    return knob;
  }

  get value() {
    return parseFloat(this.getAttribute("value") ?? "0");
  }

  set value(val: number) {
    this.setAttribute("value", val.toString());
  }

  get min() {
    return parseFloat(this.getAttribute("min") ?? "0");
  }

  set min(val: number) {
    this.setAttribute("min", val.toString());
  }

  get max() {
    return parseFloat(this.getAttribute("max") ?? "100");
  }

  set max(val: number) {
    this.setAttribute("max", val.toString());
  }

  get label() {
    return this.getAttribute("label") ?? "";
  }

  set label(val: string) {
    this.setAttribute("label", val);
  }

  get unit() {
    return this.getAttribute("unit") ?? "";
  }

  set unit(unit: string) {
    this.setAttribute("unit", unit);
  }

  get step() {
    return parseFloat(this.getAttribute("step") ?? "1");
  }

  set step(val: number) {
    this.setAttribute("step", val.toString());
  }

  get size() {
    return Number(this.getAttribute("size") ?? "100");
  }

  set size(size: number) {
    this.setAttribute("size", size.toString());
  }

  set onValueChange(onValueChange: ((value: number) => void) | undefined) {
    this._onValueChange = onValueChange;
  }

  get onValueChange() {
    return this._onValueChange;
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.canvas = DomService.createElement({ tag: "canvas" });
    this.labelEl = DomService.createElement({ part: "label" });
    this.tooltipEl = DomService.createElement({ part: "tooltip" });
    this.tooltipEl.style.display = "none";

    const wrapper = DomService.createElement({ part: "wrapper" });
    wrapper.append(this.canvas, this.labelEl, this.tooltipEl);

    this.shadowRoot!.append(createStyles(), wrapper);
  }

  connectedCallback() {
    this.ctx = this.canvas.getContext("2d");
    this.labelEl.textContent = this.label;

    this.canvas.width = this.size;
    this.canvas.height = this.size;
    this.style.setProperty("--size", `${this.size}`);

    this.renderContent();
    this.handleEvents();
  }

  attributeChangedCallback(attr: string) {
    if (attr === "label") {
      this.labelEl.textContent = this.label;
    }

    this.renderContent();
  }

  private renderContent() {
    const ctx = this.ctx;
    if (!ctx) return;

    const { width, height } = this.canvas;
    const factor = height / 100;
    const center = { x: width / 2, y: height / 2 };
    const radius = factor * 35;

    ctx.clearRect(0, 0, width, height);

    // Prozentualer Wert
    const value = Math.min(this.max, Math.max(this.min, this.value));
    const percent = (value - this.min) / (this.max - this.min);
    const angle = percent * 270 - 135;

    // Grauer Hintergrundkreis
    ctx.beginPath();
    ctx.fillStyle = "#2c3e50aa";
    ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Farbbogen
    ctx.beginPath();
    ctx.strokeStyle = "#007bff";
    ctx.lineWidth = factor * 6;
    ctx.arc(
      center.x,
      center.y,
      radius + 4,
      (-135 * Math.PI) / 180,
      (angle * Math.PI) / 180
    );
    ctx.stroke();

    // Indikatorlinie
    const angleRad = (angle * Math.PI) / 180;
    const ix = center.x + Math.cos(angleRad) * (radius - 10);
    const iy = center.y + Math.sin(angleRad) * (radius - 10);
    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(ix, iy);
    ctx.lineWidth = factor * 2;
    ctx.stroke();
  }

  private handleEvents() {
    const rect = () => this.canvas.getBoundingClientRect();

    const toAngleFromMouse = (e: MouseEvent) => {
      const r = rect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      let angle = Math.atan2(dy, dx) * (180 / Math.PI);
      angle = Math.max(-135, Math.min(angle, 135));
      return angle;
    };

    const toValueFromAngle = (angle: number) => {
      const percent = (angle + 135) / 270;
      return this.min + percent * (this.max - this.min);
    };

    this.canvas.addEventListener("mousedown", () => {
      this.isDragging = true;
      this.tooltipEl.style.display = "block";
    });

    document.addEventListener("mousemove", e => {
      if (!this.isDragging) return;

      const angle = toAngleFromMouse(e);
      const stepped =
        Math.round(toValueFromAngle(angle) / this.step) * this.step;

      const newValue = Math.max(this.min, Math.min(this.max, stepped));
      if (newValue != this.value) {
        if (this.onValueChange) {
          this.onValueChange(newValue);
        }

        this.dispatchEvent(new KnobValueChangeEvent(this.value));
      }

      this.value = newValue;
      this.renderContent();

      // Update tooltip text and position
      this.tooltipEl.textContent = `${this.label}: ${Math.round(
        newValue * 100
      ) / 100}${this.unit}`;
      this.tooltipEl.style.left = `${e.pageX + 20}px`;
      this.tooltipEl.style.top = `${e.pageY + 20}px`;

      e.preventDefault();
    });

    document.addEventListener("mouseup", () => {
      this.isDragging = false;
      this.tooltipEl.style.display = "none"; // Hide tooltip on mouse up
    });
  }
}
