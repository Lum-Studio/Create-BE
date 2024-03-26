import { Direction, Player, world } from "@minecraft/server";

export class CreateLang {}

/**
 * This function takes a `face` parameter and returns a numerical value based on the input.
 * The function is used to determine the block face for which a block was placed on.
 *
 * @param {string} face - The face of the block where it was placed. It can be one of the following values: "Up", "Down", "North", "South", "West", "East".
 * @returns {number} - A numerical value representing the block face for which the block was placed on.
 */
export function QueryBlockFace3(face) {
  switch (face) {
    case "Up":
    case "Down":
      return 0;
    case "North":
    case "South":
      return 1;
    case "West":
    case "East":
      return 2;
  }
}

/**
 * Returns a numerical value representing the player's cardinal facing direction.
 * @param {Player} player - The player object for which to determine the cardinal facing direction.
 * @returns {number} - A numerical value representing the player's cardinal facing direction. Possible values are 0 (down), 1 (north/south), or 2 (east/west).
 */
export function QueryCardinal3(player) {
  const viewDirection = player.getViewDirection();
  const { x, y, z } = viewDirection;

  if (y >= 0.5 || y <= -0.5) {
    return 0; // down
  } else if (z >= 0.5 || z <= -0.5) {
    return 1; // north/south
  } else if (x >= 0.5 || x <= -0.5) {
    return 2; // east/west
  }
}

world.beforeEvents.worldInitialize.subscribe(({ blockTypeRegistry }) => {
  blockTypeRegistry.registerCustomComponent("create:block_face_3", {
    beforeOnPlayerPlace(arg) {
      const face = arg.face
      arg.permutationToPlace = arg.permutationToPlace.withState("create:placing_axis", QueryBlockFace3(face));
    },
  });

  blockTypeRegistry.registerCustomComponent("create:cardinal_direction_3", {
    beforeOnPlayerPlace(arg) {
      const player = arg.player
      arg.permutationToPlace = arg.permutationToPlace.withState("create:placing_axis", QueryCardinal3(arg.player));
    },
  });
});