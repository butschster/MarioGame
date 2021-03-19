import {loadLevel} from '@/utils/loaders'
import Level from "@/game/Level";
import {createMario} from "@/game/factories/MarioFactory";
import Timer from "@/game/Timer";
import Keyboard, {KEY_PRESSED} from "@/game/Keyboard";

export interface GameInterface {
    level: Level,
    deltaTime: number
}

export default function createGame(context: CanvasRenderingContext2D) {

    const timer = new Timer(1 / 60);
    const keyboard = new Keyboard();

    Promise.all([
        loadLevel('1-1'),
        createMario(),
    ]).then(([level, mario]) => {

        level
            .insertLayer(mario);

        keyboard
            .map('Space', (state: symbol) => {
                if (state === KEY_PRESSED) {
                    mario.trait('jump').start();
                } else {
                    mario.trait('jump').cancel();
                }
            })
            .listenTo(window)

        timer.onTick = function update(deltaTime: number) {
            level.update({deltaTime, level});
            level.draw(context);
        }

        timer.start();
    });

}