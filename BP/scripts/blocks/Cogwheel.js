import KineticBlockEntity from "./base/KineticBlockEntity";

export default class Cogwheel extends KineticBlockEntity {

    constructor(entity) {
        super(entity.dimension.getBlock(entity.location), entity);
    }

    init() {
        if (this.block.hasTag("axis:z")) {
            this.entity.setProperty("create:placement_axis", 1);
        } else if (this.block.hasTag("axis:x")) {
            this.entity.setProperty("create:placement_axis", 2);
        }
    }
}
