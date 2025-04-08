export class EventService {
    static listenTo<T = string>(eventName: string) {
        return new Observer<string, T>(eventName);
    }

    static dispatch(event: CustomEvent) {
        window.dispatchEvent(event);
    }
}

export class Observer<R extends string, T = any> {
    private eventName: R;
    private callback: (data: T, type: string) => void = () => {};
    private abortController: AbortController = new AbortController();

    constructor(eventName: R) {
        this.eventName = eventName;
    }

    private publish(event: Event) {
        this.callback((event as CustomEvent<T>).detail as T, event.type);
    }

    subscribe(callback: (data: T, type: string) => void): Observer<R, T> {
        this.callback = callback;
        // @ts-ignore
        window.addEventListener(this.eventName, this.publish.bind(this), {
            signal: this.abortController.signal,
        });

        return this;
    }

    destroy() {
        this.abortController.abort();
    }
}
