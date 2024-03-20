import { world } from "@minecraft/server";
import { vec3 } from "./Vector";
import KineticBlockEntity from "./blocks/base/KineticBlockEntity";
export default class KineticNetwork {

    static generateID() {
        // I hope this is random enough
        return Math.round(Math.random() * 100000000);
    }
    /**
     * 
     * @param {number} id 
     * @returns {KineticNetwork} 
     */
    static load(id) {
        const data = world.getDynamicProperty(`create:network_${id}`);
        if (data === undefined) {
            return new KineticNetwork(id);
        };

        const network_data = JSON.parse(data);
        return new KineticNetwork(id, network_data.sources, network_data.members);
    }

    constructor(id = KineticNetwork.generateID(), sources = new Set(), members = new Set()) {
        this.id = id;
        this.sources = sources;
        this.members = members;
        this.currentCapacity;
        this.currentStress;
    }

    /**
     * 
     * @param {KineticBlockEntity} be 
     * @returns {void}
     */
    add(be) {
        if (this.members.has(be))
            return;
        if (be.isSource)
            sources.put(be, be.calculateAddedStressCapacity());
        this.members.add(be, be.calculateStressApplied());
        updateFromNetwork(be);
        be.networkDirty = true;
    }

    save() {
        world.setDynamicProperty(`create:network_${this.id}`, JSON.stringify(this));
    }
}
