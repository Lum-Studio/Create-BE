import KineticBlockEntity from "./base/KineticBlockEntity";

export default class Cogwheel extends KineticBlockEntity {

    constructor(entity) {
        const block = entity.dimension.getBlock(entity.location)
        super(block, entity);

    }
    
    getDisplayInfo() {
        return undefined
    }


}


