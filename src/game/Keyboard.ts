export const KEY_PRESSED = Symbol('pressed');
export const KEY_RELEASED = Symbol('released');

export default class Keyboard {
    private keyStates: Map<string, symbol>;
    private keyMap: Map<string, CallableFunction>;

    constructor() {
        this.keyStates = new Map();
        this.keyMap = new Map();
    }

    listenTo(window: Window): this {
        ['keydown', 'keyup'].forEach(eventName => {

            window.addEventListener(eventName, ev => {
                this.handleEvent(<any> ev)
            })
        })

        return this;
    }

    map(key: string, callback: CallableFunction): this {
        this.keyMap.set(key, callback);

        return this;
    }

    handleEvent(event: KeyboardEvent): void {
        console.log(this.keyStates)
        const {code} = event;

        if (!this.keyMap.has(code)) {
            return;
        }

        event.preventDefault();

        const keyState = event.type === 'keydown' ? KEY_PRESSED : KEY_RELEASED;

        if (this.keyStates.get(code) === keyState) {
            return;
        }

        this.keyStates.set(code, keyState);
        this.keyMap.get(code)(keyState);
    }
}