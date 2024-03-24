import { Block, Entity, system } from "@minecraft/server"
import TorquePropagator from "../../TorquePropogator";
import KineticNetwork from "../../KineticNetwork";

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
        this.capacity;
        this.overStressed;
        this.lastStressApplied = 0;
        this.lastCapacityProvided = 0;
        this.network = KineticNetwork.generateID();
        system.runInterval(() => this.tick());
    }


    onSpeedChanged(previousSpeed) {
        this.previousSpeed = previousSpeed;

    }

    setNetwork(network) {
        this.network = network;
    }

    setSpeed(speed) {
        this.onSpeedChanged(this.speed);
        this.speed = speed;
        this.speedUpRotation(ROTATION_ID, speed)
    }


    tick() {

    }

    // Method for child classes to implement
    getDisplayInfo() {
        const information = {
            title: "Kinetic Stats",
            text: "\n§7Kinetic Stress Impact:",
            // I know it isn't correct
            text2: `\n §b${Math.abs(this.speed) * 32}su §8at current speed`
        }
        return information;
    }

    getSpeed() {
        if (overStressed)
            return 0;
        return this.speed
    }
// Method for generators to implement
    getGeneratedSpeed(){
        
    }


}
