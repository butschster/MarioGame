import SpriteSheet from "@/game/SpritesSheet";
import {Matrix, Vec2} from "@/game/Geometry";
import Compositor from "@/game/layers/Compositor";
import Entity from "@/game/Entity";
import {LayerInterface} from "@/game/Layer";
import {GameInterface} from "@/Game";
import LevelSpec, {LevelBackground} from "@/game/level/LevelSpec";

export default class Level {
    readonly config: LevelSpec;
    readonly sprites: SpriteSheet;
    readonly gravity: number;
    readonly layers: Compositor;
    readonly entites: Set<Entity>;
    readonly tiles: Matrix;

    constructor(config: LevelSpec, sprites: SpriteSheet) {
        this.config = config;
        this.sprites = sprites;
        this.gravity = 2000;
        this.layers = new Compositor();
        this.entites = new Set();
        this.tiles = new Matrix();

        this.createTiles();
    }

    insertLayer(layer: LayerInterface): this {
        this.layers.insertLayer(layer);
        return this;
    }

    update(game: GameInterface): void {
        this.entites.forEach(entity => {
            entity.update(game);
        })
    }

    draw(context: CanvasRenderingContext2D): void {
        this.layers.draw(context);
    }

    private createTiles(): void {
        this.config.forEachBackgrounds((bg: LevelBackground, pos: Vec2) => {
            const sprite = this.sprites.tiles.get(bg.tile);
            if (sprite) {
                this.tiles.set(pos, sprite.tile)
            }
        });
    }
}