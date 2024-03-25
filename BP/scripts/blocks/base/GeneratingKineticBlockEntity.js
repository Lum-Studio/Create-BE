import { Entity } from "@minecraft/server"
import KineticBlockEntity from "./KineticBlockEntity"


export default class GeneratingKineticBlockEntity extends KineticBlockEntity {
    /**
     * 
     * @param {Entity} entity 
     */
    constructor(entity) {
        const block = entity.dimension.getBlock(entity.location)
        super(block, entity);
        this.isSource = true;
    }

    getDisplayInfo() {
        const information = {
            title: "Generator Stats",
            text: "\n§7Kinetic Stress Capacity:",
            text2: `\n §b${Math.abs(this.speed) * 32}su §8at current speed`
        }
        return information;
    }


}