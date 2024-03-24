import KineticBlockEntity from "./blocks/base/KineticBlockEntity";
import KineticNetwork from "./KineticNetwork";

export default class TorquePropagator {
    constructor() { };
    /**
     * 
     * @param {KineticBlockEntity} be
     * @returns {KineticNetwork}
     */
    static getOrCreateNetworkFor(be) {
        const id = be.network;
        if (id !== undefined) {
            return KineticNetwork.load(id);
        } else {
            return new KineticNetwork();
        }

    }
}
