import { Block, Entity } from "@minecraft/server"

export default class KineticBlockEntity {
    /**
     * 
     * @param {Block} block 
     * @param {Entity} entity
     */
    constructor(block, entity) {
        this.block = block;
        this.entity = entity;
        this.speed = this.entity.getProperty('create:speed');
    }

    get network() {
        return this.entity.getDynamicProperty("network");
    }

    set network(id) {
        this.entity.setDynamicProperty("network", id);
    }
}
