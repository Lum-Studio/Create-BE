import { Entity } from "@minecraft/server";

class EncasedFan {
  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    this.entity = entity;
    this.rotationController = new RotationConstroller();
  }
}
