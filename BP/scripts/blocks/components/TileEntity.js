import { world } from "@minecraft/server";
import KineticInstances from "../KineticInstances";
import KineticStats from "../AllKineticBlocks";

world.beforeEvents.worldInitialize.subscribe((initEvent) => {
  initEvent.blockTypeRegistry.registerCustomComponent("create:tile_entity", {
    beforeOnPlayerPlace: (e) => {
      const entity = e.dimension.spawnEntity(e.permutationToPlace.type.id, e.block.center());
      const classType = KineticStats.getClass(e.permutationToPlace.type.id);
      const ki = new classType(entity)
      ki.initialize();
      KineticInstances.add(e.dimension, e.block.location, ki);
    },

    onPlayerDestroy: (e) => {
      const { block, dimension, destroyedBlockPermutation } = e;
      const location = block.location;
      dimension
        .getEntitiesAtBlockLocation(block.location)
        .filter((v) => v.typeId == destroyedBlockPermutation.type.id)[0]
        .remove();
      KineticInstances.delete(dimension, location);
    },
  });

  initEvent.blockTypeRegistry.registerCustomComponent("create:placed", {
    beforeOnPlayerPlace: (e) => {
      e.permutationToPlace = e.permutationToPlace.withState("create:placed", true);
    },
  });
});

world.afterEvents.entityLoad.subscribe(({entity}) => {
  if (KineticStats.hasStats(entity.typeId)) {
    let block = entity.dimension.getBlock(entity.location);
    const classType = KineticStats.getClass(block.typeId);
    KineticInstances.add(entity.dimension, block.location, new classType(entity));
  };
});

//Attempt at non-pushable blocks <it destroys then on piston push> not working
// world.afterEvents.pistonActivate.subscribe((arg) => {
//   for (let block of arg.piston.getAttachedBlocks()) {
//     let dimension = block.dimension;
//     console.warn(block.typeId)
//     if (block.typeId.includes("create:")) {
//           console.warn(block.typeId);
//       dimension
//         .getEntitiesAtBlockLocation(block.location)
//         .filter((v) => v.typeId == block.typeId)[0]
//         .remove();
//       dimension.runCommand(`setblock ${block.location.x} ${block.location.y} ${block.location.z} air destroy`)
//       KineticInstances.delete(dimension, location);
//       return;
//     }
//   }
// });
