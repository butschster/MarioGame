import Level from "@/game/Level";
import {createMario} from "@/game/factories/MarioFactory";
import Timer from "@/game/Timer";
import Keyboard, {KEY_PRESSED} from "@/game/Keyboard";
import loadLevel from "./game/factories/LevelFactory";

export interface GameInterface {
    level: Level,
    deltaTime: number
}

export default function createGame(context: CanvasRenderingContext2D) {
    const timer = new Timer(1 / 30);
    const keyboard = new Keyboard();

    Promise.all([
        loadLevel('1-1'),
        createMario(),
    ]).then(([level, mario]) => {

        level
            .registerEntity(mario);

        keyboard
            .map('Space', (state: symbol) => {
                if (state === KEY_PRESSED) {
                    mario.trait('jump').start();
                } else {
                    mario.trait('jump').cancel();
                }
            })
            .listenTo(window);

        ['mousedown', 'mousemove'].forEach(eventName => {
            context.canvas.addEventListener(eventName, (event: any) => {
                if(event.buttons === 1) {
                    mario.vel.set(0, 0);
                    mario.pos.set(event.offsetX, event.offsetY);
                }
            })
        })


        timer.onTick = function update(deltaTime: number) {
            level.update({deltaTime, level});
            level.draw(context);
        }

        timer.start();
    });

}