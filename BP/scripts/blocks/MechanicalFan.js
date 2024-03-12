import { Entity } from "@minecraft/server"

class MechanicalFan {

    /**
     * 
     * @param {Entity} entity 
     */
    constructor(entity) {
        this.entity = entity;
        this.rotationController = new RotationConstroller();
        
    }
}