import { EquipmentSlot, Player, system, world } from "@minecraft/server";
import { getProperty } from "../../../foundation/entity/mappings";
import { getBlockEntity } from "../../../foundation/block/mappings";

export default class GoggleConfigScreen {
  /**
   * @param {Player} player
   */
  constructor(player) {
    this.player = player;
  }

  static registry() {
    system.runInterval(() => {
      const players = world.getAllPlayers();
      for (let i = 0; i < players.length; i++) {
        const player = players[i];
        new GoggleConfigScreen(player).look();
      }
    });
  }

  look() {
    const block = this.player.getBlockFromViewDirection({ maxDistance: 6 })?.block;
    const helmetItem = this.player.getComponent("equippable").getEquipment(EquipmentSlot.Head);
    if (helmetItem?.typeId === "create:goggles" && block?.typeId.startsWith("create:")) {
      const information = {
        "create:water_wheel": {
          title: "Generator Stats:",
          text: "\n§7Kinetic Stress Capacity:",
          text2: `\n §b${
            Math.abs(getProperty(getBlockEntity(block), "create:rotation_speed")) * 32
          }su §8at current speed`,
        },
      };

      if (information[block.typeId]) {
        const { title, text, text2 } = information[block.typeId];
        this.player.onScreenDisplay.setActionBar({
          rawtext: [{ translate: `${title}` }, { translate: `${text}` }, { translate: `${text2}` }],
        });
      }
    }
  }
}
