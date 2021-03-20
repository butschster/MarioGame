import Mario from "@/game/Entities/Mario";
import {RenderInterface} from "@/Game";
import {Vec2} from "@/game/Geometry";

export function setupMouseControl(mario: Mario, render: RenderInterface, width: number) {
    let lastEvent: any;

    ['mousedown', 'mousemove'].forEach(eventName => {
        render.context.canvas.addEventListener(eventName, (event: any) => {
            if (event.buttons === 1) {
                mario.vel.set(0, 0);
                mario.pos = mario.pos
                    .set(event.offsetX, event.offsetY)
                    .addVec(render.camera.pos);
            } else if (
                event.buttons === 2
                && lastEvent
                && lastEvent.buttons === 2
                && lastEvent.type === 'mousemove'
            ) {
                render.camera.pos.x -= event.offsetX - lastEvent.offsetX;

                if (render.camera.pos.x < 0) {
                    render.camera.pos.x = 0;
                }
            }

            lastEvent = event;
        });


        render.context.canvas.addEventListener('contextmenu', e => {
            e.preventDefault();
        })
    })
}