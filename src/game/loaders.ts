import SpriteSheet, {Tile} from "@/game/SpritesSheet";

export function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise(resolve => {
        const image: HTMLImageElement = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });

        image.src = url;
    })
}


export function loadMarioSprite(): Promise<SpriteSheet> {
    return loadImage('/assets/characters.gif')
        .then(tiles => {
            const sprites: SpriteSheet = new SpriteSheet(tiles);

            sprites.define(new Tile('idle', false, 14, 16), 16, 2.8);

            return sprites;
        })
}