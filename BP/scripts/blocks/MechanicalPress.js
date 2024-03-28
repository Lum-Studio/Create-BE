import KineticBlockEntity from "./base/KineticBlockEntity";

export default class MechanicalPress extends KineticBlockEntity {
  constructor(entity) {
    super(entity)
  }

  getDisplayInfo() {
    return {
      title: "Kinetic Stats",
      text: "\n§7Kinetic Stress Impact:",
      text2: `\n §b${Math.abs(this.speed) * 32}su §8at current speed`,
    };
  }
}
