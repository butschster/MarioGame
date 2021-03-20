import Entity from "@/game/Entity";
import Mario from "@/game/Entities/Mario";
import Keyboard, {KEY_PRESSED} from "@/game/Keyboard";

export function setupMarioKeyboard(mario: Mario) {
    const keyboard = new Keyboard();

    return keyboard
        .map('Space', (state: symbol) => {
            (state === KEY_PRESSED) ? mario.jump.start() : mario.jump.cancel();
        })
        .map('KeyD', (state: symbol) => {
            (state === KEY_PRESSED) ? mario.move.right() : mario.move.stop();
        })
        .map('KeyA', (state: symbol) => {
            (state === KEY_PRESSED) ? mario.move.left() : mario.move.stop();
        })
}