import { Entity, world } from "@minecraft/server";
import KineticBlockEntity from "./KineticBlockEntity";

export default class GeneratingBlockEntity extends KineticBlockEntity {
    /**
     * @param {Entity} entity 
     */
    constructor(entity) {
        const block = entity.dimension.getBlock(entity.location);
        super(block, entity);

    }
}

