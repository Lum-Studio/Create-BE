class KineticInstancsHandler {
    constructor() {
        this.i = {
            "minecraft:overworld": {},
            "minecraft:nether": {},
            "minecraft:the_end": {}
        }
    }

    /**
     * 
     * @remarks
     * Loads a kineticInstance to a dimension
     * 
     * @param {Dimension} dimension
     * @param {Vector3} location
     * @param {KineticBlockEntity} instance
     * @returns {KineticBlockEntity}
     */
    add(dimension, location, instance) {
        const locationString = `x${location.x}y${location.y}z${location.z}`;
        if (this.i[dimension.id][locationString] === undefined) {
            return this.i[dimension.id][locationString] = instance;
        }
        return this.i[dimension.id][locationString];
    }
    
    /**
     * @remarks
     * Removes a kineticInstance from a dimension
     * 
     * @param {Dimension} dimension 
     * @param {Vector3} location 
     */
    delete(dimension, location) {
        delete this.i[dimension.id][`x${location.x}y${location.y}z${location.z}`];
    }

    /**
     * @remarks
     * Returns a KineticInstance from a dimension
     * 
     * @param {Dimension} dimension 
     * @param {Vector3} location 
     * @returns {KineticBlockEntity}
     */
    get(dimension, location) {
        return this.i[dimension.id][`x${location.x}y${location.y}z${location.z}`];
    }

    /**
     * 
     * @param {Dimension} dimension 
     * @param {Vector3} location 
     * @throws location, id
     */
    debug(dimension, location) {
        const i = this.i[dimension.id][`x${location.x}y${location.y}z${location.z}`];
        console.warn(`location: {x:${location.x} y:${location.y} z:${location.z}}, typeId: ${i.block.typeId}`);
    }

    /**
     * @remarks 
     * Logs information about every kineticInstance in the world
     * 
     * @throws dimension, location, id
     */
    debugInstances() {
        let dimCounter = {}
        for (const dimensionkey in this.i) {
            dimCounter[dimensionkey] = 0
            for (const instance in this.i[dimensionkey]) {
                const kI = this.i[dimensionkey][instance]
                if (!kI.block.isValid()) continue
                if (kI.block.typeId === "minecraft:air") {kI.tileEntity.remove(); continue;}
                dimCounter[dimensionkey] += 1
                console.warn(`dimension: ${dimensionkey}, location: {x: ${kI.block.location.x}, y: ${kI.block.location.y}, z: ${kI.block.location.z}}, typeId: ${kI.block.typeId}`)
            }
        }
        console.warn(JSON.stringify(dimCounter))
    }
}

export const KineticInstances = new KineticInstancsHandler;