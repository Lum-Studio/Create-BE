import { Entity, MolangVariableMap, system } from "@minecraft/server";
import KineticBlockEntity from "./base/KineticBlockEntity";
import { vec3 } from "../Vector";

export default class EncasedFan extends KineticBlockEntity {

  #molangVarMap = new MolangVariableMap();

  /**
   *
   * @param {Entity} entity
   */
  constructor(entity) {
    const block = entity.dimension.getBlock(entity.location);
    super(block, entity);
    this.direction = vec3(block.north(1).location);
    this.maxPushDistance = this.getPushDistance(); // Default
    system.runInterval(() => this.tick())
  }

  tick() {
    if (this.speed != this.previousSpeed) {
      this.onSpeedChanged()
    }
    const dimension = this.block.dimension;
    this.#molangVarMap.setSpeedAndDirection('air_flow', this.speed, this.direction);
    dimension.spawnParticle('create:air_flow', this.direction, this.#molangVarMap)
    const entitiesToBlow = dimension.getEntitiesFromRay(this.block.location, this.direction, { maxDistance: this.maxPushDistance }).map(hit => hit.entity);
    const itemsToBlow = entitiesToBlow.filter(entity => entity.typeId === 'minecraft:item');

    if (this.canBlowEntities()) {
      this.blow(entitiesToBlow)
    } else {
      this.blow(itemsToBlow)
    }

  }

  getPushDistance() {
    const rpm = this.speed;
    switch (true) {
      case rpm <= 12:
        return 4;
      case rpm <= 28:
        return 5;
      case rpm <= 32:
        return 6;
      case rpm <= 48:
        return 7;
      case rpm <= 64:
        return 8;
      case rpm <= 80:
        return 9;
      case rpm <= 96:
        return 10;
      case rpm <= 112:
        return 11;
      case rpm <= 128:
        return 12;
      case rpm <= 192:
        return 16;
      case rpm <= 256:
        return 20;
      default:
        return -1;
    }
  }

  canBlowEntities() {
    return this.speed > 4
  }

  onSpeedChanged() {
    const directionNum = this.speed > 0 ? 1 : -1;
    this.direction = this.block.north(directionNum).location;
    this.maxPushDistance = this.getPushDistance();
  }

  blow(entities) {
    const vector = this.direction.multiply(this.speed).normalized
    entities.forEach(entity => {
      entity.applyImpulse(vector)
    })
  }
}
