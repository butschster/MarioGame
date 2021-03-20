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
        function applyRange(bg: LevelBackground, xStart: number, xLen: number, yStart: number, yLen: number) {
            const xEnd = xStart + xLen;
            const yEnd = yStart + yLen;

            for (let x = xStart; x < xEnd; ++x) {
                for (let y = yStart; y < yEnd; ++y) {
                    callback(bg, new Vec2(x, y));
                }
            }
        }


        this.backgrounds.forEach((bg: LevelBackground) => {
            bg.ranges.forEach((range: Array<number>) => {
                if (range.length === 4) {
                    const [xStart, xLen, yStart, yLen] = range;
                    applyRange(bg, xStart, xLen, yStart, yLen);
                } else if (range.length === 3) {
                    const [xStart, xLen, yStart] = range;
                    applyRange(bg, xStart, xLen, yStart, 1);
                } else if (range.length === 2) {
                    const [xStart, yStart] = range;
                    applyRange(bg, xStart, 1, yStart, 1);
                }
            });
        });
    }
}