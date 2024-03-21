import { BlockPermutation, world } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(({ blockTypeRegistry }) => {
  blockTypeRegistry.registerCustomComponent("create:andesite_door", {
    onPlace: ({ dimension, block }) => {
      //let blockLoc = { x: block.location.x, y: block.location.y + 1, z: block.location.z };
      if (block.permutation.getState("create:half") == "lower") {
        // dimension.runCommand(
        //   `setblock ${block.location.x} ${block.location.y + 1} ${block.location.z} ${
        //     block.typeId
        //   } ["create:half"="upper"]`
        // );
        const upper = block.above();
        upper.setPermutation(
          BlockPermutation.resolve("create:andesite_door", {
            "create:half": "upper",
            "minecraft:cardinal_direction": block.permutation.getState("minecraft:cardinal_direction"),
          })
        );
      }
    },

    onPlayerInteract: ({ block, player, dimension }) => {
      if (block.permutation.getState("create:half") == "lower") {
        if (block.permutation.getState("create:open") == false) {
          [block.above(), block].forEach((block) => {
            block.setPermutation(block.permutation.withState("create:open", true));
          });
        } else {
          block.setPermutation(block.permutation.withState("create:open", false));
          block.above().setPermutation(block.above().permutation.withState("create:open", false));
        }
      }

      if (block.permutation.getState("create:half") == "upper") {
        if (block.permutation.getState("create:open") == false) {
          block.setPermutation(block.permutation.withState("create:open", true));
          block.below().setPermutation(block.below().permutation.withState("create:open", true));
        } else {
          block.setPermutation(block.permutation.withState("create:open", false));
          block.below().setPermutation(block.below().permutation.withState("create:open", false));
        }
      }
    },
  });
});
