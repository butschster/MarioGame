import {LayerInterface} from "@/game/Layer";
import {BoundingBox, Vec2} from "@/game/Geometry";
import {GameInterface, RenderInterface} from "@/Game";
import SpriteSheet from "@/game/SpritesSheet";

interface TraitInterface {
    readonly name: string;

    update(entity: Entity, game: GameInterface): void;
    draw(entity: Entity, render: RenderInterface): void;
}

export class Trait implements TraitInterface {
    readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    draw(entity: Entity, render: RenderInterface): void {

    }

    update(entity: Entity, game: GameInterface): void {

    }

}

export default class Entity implements LayerInterface {
    readonly sprite: SpriteSheet;
    pos: Vec2;
    vel: Vec2;
    size: Vec2;
    traits: Map<string, TraitInterface>;

    constructor(sprite: SpriteSheet, size: Vec2, pos: Vec2, vel: Vec2) {
        this.sprite = sprite;
        this.pos = pos;
        this.vel = vel;
        this.size = size;
        this.traits = new Map();
    }

    addTrait(trait: TraitInterface): this {
        this.traits.set(trait.name, trait);

        return this;
    }

    trait(name: string): any {
        if (this.traits.has(name)) {
            return this.traits.get(name);
        }

        return null;
    }

    drawLayer(render: RenderInterface): void {
        this.traits.forEach(trait => {
            trait.draw(this, render);
        })
    }

    update(game: GameInterface): void {
        this.traits.forEach(trait => {
            trait.update(this, game);
        })
    }

    get boundingBox(): BoundingBox {
        return new BoundingBox(
            this.pos,
            this.pos.addVec(this.size)
        );
    }
}