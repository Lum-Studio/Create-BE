import { EquipmentSlot, Player, system, world } from "@minecraft/server";
import KineticInstances from "../blocks/KineticInstances";

export default class GoggleOverlayRender {
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
        new GoggleOverlayRender(player).look();
      }
    });
  }

  look() {
    const block = this.player.getBlockFromViewDirection({ maxDistance: 7 })?.block;
    const helmetItem = this.player.getComponent("equippable").getEquipment(EquipmentSlot.Head);
    if (helmetItem?.typeId === "create:goggles" && block?.typeId.startsWith("create:")) {
      const kI = KineticInstances.get(block.dimension, block.location);
      if (kI.getDisplayInfo !== undefined) {
        const { title, text, text2 } = kI.getDisplayInfo();
        this.player.onScreenDisplay.setActionBar({
          rawtext: [{ translate: `${title}` }, { translate: `${text}` }, { translate: `${text2}` }],
        });
      }
    }
  }

  static makeProgressBar(length, filledLength, color) {
    let bar = " ";
    let emptySpaces = length - filledLength;
    for (i = 0; i < filledLength; i++) bar += "\u2588";
    for (i = 0; i < emptySpaces; i++) bar += "\u2592";
    return `${color}${bar}§r `;
  }
}
