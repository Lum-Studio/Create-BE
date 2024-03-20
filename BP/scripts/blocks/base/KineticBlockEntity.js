import { Block, Entity, system } from "@minecraft/server"
import TorquePropagator from "../../TorquePropogator";

const ROTATION_ID = 'create:rotation_speed';

export default class KineticBlockEntity {
    /** 
     * @param {Block} block
     * @param {Entity} entity 
     */
    constructor(block, entity) {
        this.isSource;
        this.source;
        this.block = block;
        this.entity = entity;
        this.speed = this?.entity?.getProperty(ROTATION_ID);
        this.speedUpRotation = this.entity.setProperty;
        this.previousSpeed = 0;
        this.stress;
        this.currentCapacity;
        this.overStressed;
        this.network = TorquePropagator.getOrCreateNetworkFor(this);
        system.runInterval(() => this.tick());
    }


    onSpeedChanged() {
        this.previousSpeed = this.speed;
        
    }

    setNetwork(network) {
        this.network = network;
    }

    setSpeed(speed) {
        this.speed = speed;
        this.onSpeedChanged();
        this.speedUpRotation(ROTATION_ID, speed)
    }


    tick() {

    }


    getDisplayInfo() {

    }

    // Get nearby blocks(sources)
    onPlace() {

    }

}
