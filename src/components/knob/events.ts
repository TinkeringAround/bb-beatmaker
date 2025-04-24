export enum KnobEvents {
  valueChange = "knob-value-change"
}

export class KnobValueChangeEvent extends CustomEvent<number> {
  constructor(detail: number) {
    super(KnobEvents.valueChange, { detail });
  }
}
