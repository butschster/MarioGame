import { loadImage } from "@/game/loaders";
import BackgroundLayer from "../layers/Backgound";
import SpriteLayer from "../layers/Sprite";
import Level from "../Level";
import LevelSpec from "../level/LevelSpec";
import SpriteSheet, { Tile } from "../SpritesSheet";
import CollisionLayer from "@/game/layers/Collision";

export default function loadLevel(name: string): Promise<any> {
    return Promise.all([
        fetch(`/levels/${name}.json`).then(r => r.json()),
        loadBackgroundSprites()
    ]).then(([json, backgroundSprites]) => {

        const levelSpec = new LevelSpec(json)
        const level = new Level(levelSpec, backgroundSprites);
        level
            .insertLayer(new BackgroundLayer(level))
            .insertLayer(new SpriteLayer(level.entites))
            .insertLayer(new CollisionLayer(level.tileCollider));

        return level;
    });
}

function loadBackgroundSprites(): Promise<SpriteSheet> {
    return loadImage('/assets/tiles.png')
        .then(tiles => {
            const sprites: SpriteSheet = new SpriteSheet(tiles);

            sprites.defineTile(new Tile('ground', true), 0, 0);
            sprites.defineTile(new Tile('brick', true), 1, 0);
            sprites.defineTile(new Tile('sky'), 3, 23);

            return sprites;
        })
}