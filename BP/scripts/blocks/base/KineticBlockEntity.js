import { Block } from "@minecraft/server"

export class KineticBlockEntity {
    /**
     * 
     * @param {Block} block 
     */
    constructor(block) {
        this.entity = block.dimension.getEntities({location:block.center()})[0];
        this.speed = this?.entity?.getProperty('create:speed') ?? 0
    }




}