import Level from "@/game/Level.ts";
import SpriteSheet, {Tile} from "@/game/SpritesSheet";
import BackgroundLayer from "@/game/layers/Backgound";
import SpriteLayer from "@/game/layers/Sprite";
import LevelSpec from "@/game/level/LevelSpec";

export function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise(resolve => {
        const image: HTMLImageElement = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });

        image.src = url;
    })
}

export function loadLevel(name: string): Promise<any> {
    return Promise.all([
        fetch(`/levels/${name}.json`).then(r => r.json()),
        loadBackgroundSprites()
    ]).then(([json, backgroundSprites]) => {

        const levelSpec = new LevelSpec(json)
        const level = new Level(levelSpec, backgroundSprites);
        level
            .insertLayer(new BackgroundLayer(level))
            .insertLayer(new SpriteLayer(level.entites));

        return level;
    });
}

function loadBackgroundSprites(): Promise<SpriteSheet> {
    return loadImage('/assets/tiles.png')
        .then(tiles => {
            const sprites: SpriteSheet = new SpriteSheet(tiles);

            sprites.defineTile(new Tile('ground'), 0, 0);
            sprites.defineTile(new Tile('brick'), 1, 0);
            sprites.defineTile(new Tile('sky'), 3, 23);

            return sprites;
        })
}

export function loadMarioSprite(): Promise<SpriteSheet> {
    return loadImage('/assets/characters.gif')
        .then(tiles => {
            const sprites: SpriteSheet = new SpriteSheet(tiles);

            sprites.define(new Tile('idle'), 17, 3);

            return sprites;
        })
}