import { KineticBlockEntity } from "../base/KineticBlockEntity";

export default class HandCrank extends KineticBlockEntity {
    #backwards = false;
    constructor(entity) {
        const block = entity.dimension.getBlock(entity.location);
        super(block, entity);
    }

    turn(backwards) {
        this.#backwards = backwards
        if (this.#backwards) this.setSpeed(-this.speed);
    }
}