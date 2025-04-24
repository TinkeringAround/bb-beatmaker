export enum AudioNodeEvents {
  delete = "delete",
}

export class DeleteAudioNodeEvent extends CustomEvent<void> {
  constructor() {
    super(AudioNodeEvents.delete);
  }
}
