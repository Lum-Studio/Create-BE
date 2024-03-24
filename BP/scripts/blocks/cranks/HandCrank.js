import GeneratingKineticBlockEntity from "../base/GeneratingKineticBlockEntity";
import KineticBlockEntity from "../base/KineticBlockEntity";

export default class HandCrank extends GeneratingKineticBlockEntity {
    #backwards = false;
    constructor(entity) {
        super(entity);
        this.setSpeed(32)
    }

    turn(backwards) {
        this.#backwards = backwards
        if (this.#backwards) this.setSpeed(-this.speed);
    }
}