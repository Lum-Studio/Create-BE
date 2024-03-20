import KineticBlockEntity from "./base/KineticBlockEntity";

/**
 * Handles the management of kinetic instances in various dimensions.
 */
class KineticInstancesHandler {
    constructor() {
        /**
         * @type {Object<string, Object<string, KineticBlockEntity>>}
         */
        this.instances = {
            "minecraft:overworld": {},
            "minecraft:nether": {},
            "minecraft:the_end": {}
        };
    }

    /**
     * Adds a kinetic instance to a specific dimension at the provided location.
     * @template T
     * @param {Dimension} dimension - The dimension to add the instance to.
     * @param {Vector3} location - The location to add the instance at.
     * @param {T} instance - The instance to add.
     * @returns {T} The added instance.
     */
    add(dimension, location, instance) {
        const locationString = `x${location.x}y${location.y}z${location.z}`;
        if (this.instances[dimension.id][locationString] === undefined) {
            this.instances[dimension.id][locationString] = instance;
        }
        return this.instances[dimension.id][locationString];
    }
    
    /**
     * Removes a kinetic instance from a specific dimension at the provided location.
     * @param {Dimension} dimension - The dimension to remove the instance from.
     * @param {Vector3} location - The location of the instance to remove.
     */
    delete(dimension, location) {
        delete this.instances[dimension.id][`x${location.x}y${location.y}z${location.z}`];
    }

    /**
     * Retrieves a kinetic instance from a specific dimension at the provided location.
     * @param {Dimension} dimension - The dimension to get the instance from.
     * @param {Vector3} location - The location of the instance to get.
     * @returns {KineticBlockEntity} The found kinetic instance.
     */
    get(dimension, location) {
        return this.instances[dimension.id][`x${location.x}y${location.y}z${location.z}`];
    }

    /**
     * Logs information about a kinetic instance at the specified location in the specified dimension.
     * @param {Dimension} dimension - The dimension of the instance.
     * @param {Vector3} location - The location of the instance.
     * @throws {Error} Throws an error if the instance is not found or if the location or dimension is invalid.
     */
    debug(dimension, location) {
        const instance = this.instances[dimension.id][`x${location.x}y${location.y}z${location.z}`];
        if (!instance) {
            throw new Error(`Instance not found at dimension: ${dimension.id}, location: {x:${location.x}, y:${location.y}, z:${location.z}}`);
        }
        console.warn(`Location: {x:${location.x}, y:${location.y}, z:${location.z}}, TypeId: ${instance.block.typeId}`);
    }

    /**
     * Logs information about all kinetic instances in all dimensions.
     * @throws {Error} Throws an error if any instance is invalid.
     */
    debugInstances() {
        const dimCounter = {};
        for (const dimensionKey in this.instances) {
            dimCounter[dimensionKey] = 0;
            for (const instanceKey in this.instances[dimensionKey]) {
                const instance = this.instances[dimensionKey][instanceKey];
                if (!instance || !instance.block.isValid()) continue;
                if (instance.block.typeId === "minecraft:air") {
                    instance.tileEntity.remove();
                    continue;
                }
                dimCounter[dimensionKey]++;
                console.warn(`Dimension: ${dimensionKey}, Location: {x: ${instance.block.location.x}, y: ${instance.block.location.y}, z: ${instance.block.location.z}}, TypeId: ${instance.block.typeId}`);
            }
        }
        console.warn(JSON.stringify(dimCounter));
    }
}

/**
 * Singleton instance of KineticInstancesHandler class.
 * @type {KineticInstancesHandler}
 */
const KineticInstances = new KineticInstancesHandler();

export default KineticInstances;
