import Level from "@/game/Level";
import {createMario} from "@/game/factories/MarioFactory";
import Timer from "@/game/Timer";
import Keyboard, {KEY_PRESSED} from "@/game/Keyboard";
import loadLevel from "./game/factories/LevelFactory";
import {setupMarioKeyboard} from "@/game/Input";
import Camera from "@/game/Camera";
import {setupMouseControl} from "@/game/Debug";

export interface GameInterface {
    level: Level,
    deltaTime: number
}

export interface RenderInterface {
    camera: Camera,
    context: CanvasRenderingContext2D
}

export default function createGame(context: CanvasRenderingContext2D) {
    context.imageSmoothingEnabled = false;

    const timer = new Timer(1 / 60);
    const camera = new Camera();
    (<any>window).camera = camera;

    Promise.all([
        loadLevel('1-1'),
        createMario(),
    ]).then(([level, mario]) => {

        const render = {context, camera};

        level.registerEntity(mario);

        setupMouseControl(mario, render, 1000);

        setupMarioKeyboard(mario)
            .listenTo(window);


        timer.onTick = function update(deltaTime: number) {
            level.update({deltaTime, level});
            level.draw(render);
        }

        timer.start();
    });

}