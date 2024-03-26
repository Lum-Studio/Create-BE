import { world } from "@minecraft/server";
import { vec3 } from "./Vector";
import KineticBlockEntity from "./blocks/base/KineticBlockEntity";
import TorquePropagator from "./TorquePropogator";

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

    /**
     * 
     * @param {number} id 
     * @param {Map<KineticBlockEntity,number>} sources 
     * @param {Map<KineticBlockEntity,number>} members 
     */
    constructor(id, sources = new Map(), members = new Map()) {
        this.id = id;
        this.sources = sources;
        this.members = members;
        this.currentCapacity;
        this.currentStress;
        this.unloadedCapacity;
        this.unloadedStress;
        this.unloadedMembers;
        this.initialized = false;
    }

    /**
     * 
     * @param {KineticBlockEntity} be 
     * @returns {void}
     */
    add(be) {
        if (this.members.has(be))
            return;
        if (be.isSource) {
            this.sources.set(be, be.calculateAddedStressCapacity());
            this.members.set(be, be.calculateStressApplied());
            this.updateFromNetwork(be);
            be.networkDirty = true;
        }
    }

    save() {
        world.setDynamicProperty(`create:network_${this.id}`, JSON.stringify(this));
    }

    initFromTE(maxStress, currentStress, members) {
        this.unloadedCapacity = maxStress;
        this.unloadedStress = currentStress;
        this.unloadedMembers = members;
        this.initialized = true;
        this.updateStress();
        this.updateCapacity();
    }

    calculateCapacity() {
        const capacity = Array.from(this.sources.keys()).reduce((accumulator, currentBE) => {
            return accumulator += this.getCapacityOf(currentBE);
        }, 0);
        const newMaxStress = capacity + this.unloadedCapacity
        return newMaxStress;
    }

    calculateStress() {
        const stress = Array.from(this.members.keys()).reduce((accumulator, currentBE) => {
            return accumulator += this.getStressOf(currentBE);
        }, 0);
        const newStress = stress + this.unloadedStress
        return newStress;
    }
    /**
     * 
     * @param {KineticBlockEntity} be 
     */
    updateFromNetwork(be) {
        be.updateFromNetwork(currentCapacity, currentStress, getSize());
    }


    getSize() {
        return this.unloadedMembers + this.members.size
    }


    updateNetwork() {
        const newStress = this.calculateStress();
        const newMaxStress = this.calculateCapacity();
        if (this.currentStress != newStress || this.currentCapacity != newMaxStress) {
            this.currentStress = newStress;
            this.currentCapacity = newMaxStress;
            this.sync();
        }
    }


    getCapacityOf(be) {
        return this.sources.get(be) * Math.abs(be.getGeneratedSpeed());
    }

    getStressOf(be) {
        return this.members.get(be) * Math.abs(be.speed);
    }


    updateCapacity() {
        const newMaxStress = this.calculateCapacity();
        if (this.currentCapacity != newMaxStress) {
            this.currentCapacity = newMaxStress;
            this.sync();
        }
    }

    updateStress() {
        const newStress = this.calculateStress();
        if (this.currentStress != newStress) {
            this.currentStress = newStress;
            this.sync()
        }
    }

    remove(be) {
        if (!this.members.has(be)) return;
        if (be.isSource) this.sources.delete(be);
        this.members.delete(be);
        be.updateFromNetwork(0, 0, 0);

        if (this.members.size === 0) {
            TorquePropagator.networks.delete(this.id)
            return;
        }
        const firstKey = Array.from(this.members.keys())[0];
        firstKey.networkDirty = true

    }


    updateNetwork() {
        const newStress = this.calculateStress();
        const newMaxStress = this.calculateCapacity();
        if (currentStress != newStress || currentCapacity != newMaxStress) {
            this.currentStress = newStress;
            this.currentCapacity = newMaxStress;
            this.sync();
        }
    }

    addSilently(be, lastCapacity, lastStress) {
        if (this.members.has(be))
            return;
        if (be.isSource) {
            this.unloadedCapacity -= lastCapacity * Math.abs(be.getGeneratedSpeed());
            const addedStressCapacity = be.calculateAddedStressCapacity();
            this.sources.add(be, addedStressCapacity);
        }

        this.unloadedStress -= lastStress * Math.abs(be.speed);
        const stressApplied = be.calculateStressApplied();
        this.members.set(be, stressApplied);

        this.unloadedMembers--;
        if (this.unloadedMembers < 0)
            this.unloadedMembers = 0;
        if (this.unloadedCapacity < 0)
            this.unloadedCapacity = 0;
        if (this.unloadedStress < 0)
            this.unloadedStress = 0;
    }

    sync() {
        for (const be of this.members.keys())
            this.updateFromNetwork(be);
    }
}
