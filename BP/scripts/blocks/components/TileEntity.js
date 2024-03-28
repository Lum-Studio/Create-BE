import { world } from "@minecraft/server";
import Cogwheel from "../Cogwheel";
import MechanicalMixer from "../Cogwheel";
import KineticInstances from "../KineticInstances";
import EncasedFan from "../EncasedFan";
import ValveHandle from "../cranks/ValveHandle";
import HandCrank from "../cranks/HandCrank";
import MechanicalPress from "../MechanicalPress";
import { AllKineticBlocks } from "../AllKineticBlocks";

world.beforeEvents.worldInitialize.subscribe((initEvent) => {
  initEvent.blockTypeRegistry.registerCustomComponent("create:tile_entity", {
    beforeOnPlayerPlace: (e) => {
      const { block, dimension } = e;
      dimension.spawnEntity(e.permutationToPlace.type.id, block.center());
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

world.afterEvents.entitySpawn.subscribe(({ entity }) => {
  const { dimension, location, typeId } = entity;
  if (AllKineticBlocks[typeId] === undefined) return;
  let block = dimension.getBlock(location);
  KineticInstances.add(dimension, block.location, new AllKineticBlocks[block.typeId].class(entity));
});

world.afterEvents.entityLoad.subscribe(({ entity }) => {
  const { dimension, location, typeId } = entity;
  if (AllKineticBlocks[typeId] === undefined) return;
  let block = dimension.getBlock(location);
  KineticInstances.add(dimension, block.location, new AllKineticBlocks[block.typeId].class(entity));
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
