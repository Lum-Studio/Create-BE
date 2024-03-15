import { Block, MolangVariableMap, system } from "@minecraft/server";
import { KineticBlockEntity } from "./base/KineticBlockEntity";
import { vec3 } from "../Vector";

export class EncasedFan extends KineticBlockEntity {
  /**
   *
   * @param {Block} block
   */
  constructor(block) {
    super(block);
    this.block = block;
    system.runInterval(() => this.tick())
  }

  tick() {
    const directionNum = speed > 0 ? 1 : -1;
    const direction = this.block.north(directionNum).location;
    const dimension = this.block.dimension;
    const maxPushDistance = this.getPushDistance();
    const molangVarMap = new MolangVariableMap();
    molangVarMap.setSpeedAndDirection('air_flow', speed, direction);
    dimension.spawnParticle('create:air_flow', direction, molangVarMap)
    const entitiesToBlow = dimension.getEntities({ location: direction, maxDistance: maxPushDistance });
    const itemsToBlow = entitiesToBlow.filter(entity => entity.typeId === 'minecraft:item');

    if (this.canBlowEntities()) {
      this.blow(entitiesToBlow, direction)
    } else {
      this.blow(itemsToBlow, direction)
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

  blow(entities, direction) {
    const vector = vec3(direction).multiply(this.speed).normalized
    entities.forEach(entity => {
      entity.applyImpulse(vector)
    })
  }
}
