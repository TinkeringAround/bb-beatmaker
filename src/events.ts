export enum AppEvents {
  // Add further Event Names here
  onDownloadStateChange = "on-download-state-change",
  updateScript = "update-script",
}

export const STORE_EVENTS: AppEvents[] = [AppEvents.updateScript];

export class OnDownloadStateChangeEvent extends CustomEvent<void> {
  constructor() {
    super(AppEvents.onDownloadStateChange);
  }
}

export class UpdateScriptEvent extends CustomEvent<string> {
  constructor(script: string) {
    super(AppEvents.updateScript, { detail: script });
  }
}
