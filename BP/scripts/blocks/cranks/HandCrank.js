import GeneratingKineticBlockEntity from "../base/GeneratingKineticBlockEntity";

export default class HandCrank extends GeneratingKineticBlockEntity {
    #backwards = false;
    constructor(entity) {
        super(entity);
    }

    turn(backwards) {
        this.#backwards = backwards
        if (this.#backwards) this.setSpeed(-this.speed);
    }
}