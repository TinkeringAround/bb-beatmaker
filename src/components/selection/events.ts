export enum SelectionEvents {
    valueChange = 'selection-value-change',
}

export class SelectionValueChangeEvent extends CustomEvent<string> {
    constructor(detail: string) {
        super(SelectionEvents.valueChange, { detail });
    }
}
