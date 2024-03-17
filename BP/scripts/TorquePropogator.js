import { world } from "@minecraft/server";
import KineticBlockEntity from "./blocks/base/KineticBlockEntity";
import KineticNetwork from "./KineticNetwork";

class TorquePropagator {
    constructor() {};
    /**
     * 
     * @param {KineticBlockEntity} be
     * @returns {KineticNetwork}
     */
    static getOrCreateNetworkFor(be) {
        const id = be.network;
        if (id !== undefined) {
            return KineticNetwork.load(id);
        };
    }

}
