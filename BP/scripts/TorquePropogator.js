import KineticBlockEntity from "./blocks/base/KineticBlockEntity";
import KineticNetwork from "./KineticNetwork";

export default class TorquePropagator {
    constructor() { };
    /**
     * @type {Map<number,KineticNetwork>}
     */
    static networks = new Map();
    /**
     * 
     * @param {KineticBlockEntity} be
     * @returns {KineticNetwork}
     */
    static getOrCreateNetworkFor(be) {
        const id = be.network;
        let network;
        if (id == null)
            return null;

        if (!this.networks.has(id)) {
            network = new KineticNetwork();
            network.id = be.network;
            this.networks.set(id, network);
        }
        network = this.networks.get(id);
        return network;
    }


}
