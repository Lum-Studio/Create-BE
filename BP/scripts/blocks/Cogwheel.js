import KineticBlockEntity from "./base/KineticBlockEntity";

export default class Cogwheel extends KineticBlockEntity {

    constructor(entity) {
        const block = entity.dimension.getBlock(entity.location)
        super(block, entity);

    }
    
    getDisplayInfo() {
        return {
            title: "Generator Stats:",
            text: "\n§7Kinetic Stress Capacity:",
            text2: `\n §b${Math.abs(this.speed) * 32
                }su §8at current speed`,
        }
    }


}


