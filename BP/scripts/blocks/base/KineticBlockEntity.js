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
    this.stress = 0;
    this.capacity = 0;
    this.overStressed = false;
    this.lastStressApplied = 0;
    this.lastCapacityProvided = 0;
    this.networkSize = 0;
    this.network = KineticNetwork.generateID();
    this.initialize();
    system.runInterval(() => this.tick());
  }

  initialize() {
    if (this.network) {
      const network = this.getOrCreateNetwork();
      if (!network.initialized) network.initFromTE(this.capacity, this.stress, this.networkSize);
      network.addSilently(this, this.lastCapacityProvided, this.lastStressApplied);
    }

    // super.initialize();
  }

  onSpeedChanged(previousSpeed) {
    this.previousSpeed = previousSpeed;
  }

  setNetwork(networkId) {
    if (this.network == networkId) return;
    this.network = network;

    if (this.network != null) this.getOrCreateNetwork().remove(this);

    if (networkId == null) return;

    this.network = networkId;
    const network = getOrCreateNetwork();
    network.initialized = true;
    network.add(this);
  }

  setSpeed(speed) {
    if (speed === this.speed) return;
    this.onSpeedChanged(this.speed);
    this.speed = speed;
    this.speedUpRotation(ROTATION_ID, speed);
  }

  tick() {}

  // Method for child classes to implement
  getDisplayInfo() {
    const information = {
      title: "Kinetic Stats",
      text: "\n§7Kinetic Stress Impact:",
      // I know it isn't correct
      text2: `\n §b${Math.abs(this.speed) * 32}su §8at current speed`,
    };
    return information;
  }

  getSpeed() {
    if (overStressed) return 0;
    return this.speed;
  }
  // Method for generators to implement
  getGeneratedSpeed() {
    return 0;
  }

  getOrCreateNetwork() {
    return TorquePropagator.getOrCreateNetworkFor(this);
  }

  updateFromNetwork(maxStress, currentStress, networkSize) {
    networkDirty = false;
    this.capacity = maxStress;
    this.stress = currentStress;
    this.networkSize = networkSize;
    const overStressed = maxStress < currentStress;

    if (overStressed != this.overStressed) {
      const prevSpeed = this.speed;
      this.overStressed = overStressed;
      this.onSpeedChanged(prevSpeed);
    }
  }

  calculateAddedStressCapacity() {
    const capacity = something.getCapacity();
    this.lastCapacityProvided = capacity;
    return capacity;
  }

  calculateStressApplied() {
    const impact = 0//something.getImpact();
    this.lastStressApplied = impact;
    return impact;
  }
}
