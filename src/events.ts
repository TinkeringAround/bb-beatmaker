export enum AppEvents {
  // Add further Event Names here
  onDownloadStateChange = "on-download-state-change",
}

export const STORE_EVENTS: AppEvents[] = [];

export class onDownloadStateChangeEvent extends CustomEvent<void> {
  constructor() {
    super(AppEvents.onDownloadStateChange);
  }
}
