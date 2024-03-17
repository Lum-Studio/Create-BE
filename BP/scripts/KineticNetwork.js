import { world } from "@minecraft/server";

export default class KineticNetwork {

    static generateID() {
        //I hope this is random enough
        return Math.round(Math.random() * 100000000);
    }

    static load(id) {
        const data = world.getDynamicProperty(`net:${id}`);
        if (data === undefined) {
            return new_network = new KineticNetwork(id, new Set(), new Set());
        };

        const network_data = JSON.parse(data);
        return new KineticNetwork(id, network_data.sources, network_data.members);
    }
    
    constructor(id, sources, members) {
        this.id = id;
    
        this.sources = sources;
        this.members = new members;
    }

    addMember(location) {
        this.members.add(`x${location.x}y${location.y}z${location.z}`);
    }

    addSource(location) {
        this.sources.add(`x${location.x}y${location.y}z${location.z}`);
    }

    save() {
        world.setDynamicProperty(`net:${this.id}`, JSON.stringify(this));
    }
}
