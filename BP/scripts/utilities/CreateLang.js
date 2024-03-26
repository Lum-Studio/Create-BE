import { Direction, Player, world } from "@minecraft/server";

export class CreateLang {}

/**
 * @param {Direction} face
 * @returns the block face for what the block was placed on.
 */

export function QueryBlockFace3(face) {
  switch (face) {
    case "Up":
      return 0;
      break;
    case "Down":
      return 0;
      break;
    case "North":
      return 1;
      break;
    case "South":
      return 1;
      break;
    case "West":
      return 2;
      break;
    case "East":
      return 2;
      break;
  }
}

/**
 * @param {Player} player
 * @returns the players cardinal facing direction
 */

export function QueryCardinal3(player) {
  let viewDirection = player.getViewDirection();
  let viewDirectionX = viewDirection.x;
  let viewDirectionY = viewDirection.y;
  let viewDirectionZ = viewDirection.z;

  // down
  if (viewDirectionY >= 0.5) {
    return 0;
  }
  // down
  if (viewDirectionY <= -0.5) {
    return 0;
  }
  // north
  if (viewDirectionZ >= 0.5) {
    return 1;
  }
  // south
  if (viewDirectionZ <= -0.5) {
    return 1;
  }
  // east
  if (viewDirectionX >= 0.5) {
    return 2;
  }
  // west
  if (viewDirectionX <= -0.5) {
    return 2;
  }
}

world.beforeEvents.worldInitialize.subscribe(({ blockTypeRegistry }) => {
  blockTypeRegistry.registerCustomComponent("create:block_face_3", {
    beforeOnPlayerPlace(arg) {
      const face = arg.face
      arg.permutationToPlace = arg.permutationToPlace.withState("create:block_face", QueryBlockFace3(face));
    },
  });

  blockTypeRegistry.registerCustomComponent("create:cardinal_direction_3", {
    beforeOnPlayerPlace(arg) {
      const player = arg.player
      arg.permutationToPlace = arg.permutationToPlace.withState("create:cardinal_direction", QueryCardinal3(arg.player));
    },
  });
});