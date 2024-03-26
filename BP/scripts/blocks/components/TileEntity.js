import { world } from "@minecraft/server";
import Cogwheel from "../Cogwheel";
import MechanicalMixer from "../Cogwheel";
import KineticInstances from "../KineticInstances";
import EncasedFan from "../EncasedFan";
import ValveHandle from "../cranks/ValveHandle";
import HandCrank from "../cranks/HandCrank";
import MechanicalPress from "../MechanicalPress";

world.beforeEvents.worldInitialize.subscribe((initEvent) => {
  initEvent.blockTypeRegistry.registerCustomComponent("create:tile_entity", {
    beforeOnPlayerPlace: (e) => {
      const { block, dimension } = e;
      // I am sure their are more that don't have tile entities
      if (block.typeId === "create:andesite_casing") return;
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
  let block = dimension.getBlock(location);
  switch (typeId) {
    case "create:cogwheel":
      KineticInstances.add(dimension, block.location, new Cogwheel(entity));
      break;

    case "create:encased_fan":
      KineticInstances.add(dimension, block.location, new EncasedFan(entity));
      break;

    case "create:valve_handle":
      KineticInstances.add(dimension, block.location, new ValveHandle(entity));
      break;

    case "create:hand_crank":
      KineticInstances.add(dimension, block.location, new HandCrank(entity));
      break;

    case "create:mechanical_mixer":
      KineticInstances.add(dimension, block.location, new MechanicalMixer(entity));
      break;

    case "create:mechanical_press":
      KineticInstances.add(dimension, block.location, new MechanicalPress(entity));
      break;
  }
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
