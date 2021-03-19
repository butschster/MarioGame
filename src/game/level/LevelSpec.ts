import {Vec2} from "@/game/Geometry";

export class LevelBackground {
    readonly tile: string;
    readonly ranges: Array<any>;
}

export default class LevelSpec {
    readonly backgrounds: Array<LevelBackground>;

    constructor(json: any) {
        this.backgrounds = json.backgrounds;
    }

    forEachBackgrounds(callback: CallableFunction): void {
        this.backgrounds.forEach((bg: LevelBackground) => {
            bg.ranges.forEach(([x1, x2, y1, y2]) => {
                for (let x = x1; x < x2; ++x) {
                    for (let y = y1; y < y2; ++y) {
                        callback(bg, new Vec2(x, y));
                    }
                }
            });
        });
    }
}