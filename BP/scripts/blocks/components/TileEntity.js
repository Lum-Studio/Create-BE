import { world } from "@minecraft/server";
import Cogwheel from "../Cogwheel";
import MechanicalMixer from "../Cogwheel";
import KineticInstances from "../KineticInstances";
import EncasedFan from "../EncasedFan";
import ValveHandle from "../cranks/ValveHandle";
import HandCrank from "../cranks/HandCrank";

world.beforeEvents.worldInitialize.subscribe((initEvent) => {
  initEvent.blockTypeRegistry.registerCustomComponent("create:tile_entity", {
    beforeOnPlayerPlace: (e) => {
      const { block, dimension } = e;
      // I am sure their are more that don't have tile entities
      if (block.typeId === "create:andesite_casing") return;
      dimension.spawnEntity(block.typeId, block.center());
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

    onPlayerInteract: (e) => {
      if (e.block.hasTag("upper_door")) {
      }
    },
  });
});

world.afterEvents.entitySpawn.subscribe(({ entity }) => {
  const { dimension, location, typeId } = entity;
  switch (typeId) {
    case "create:cogwheel":
      KineticInstances.add(dimension, location, new Cogwheel(entity));
      break;

    case "create:encased_fan":
      KineticInstances.add(dimension, location, new EncasedFan(entity));
      break;

    case "create:valve_handle":
      KineticInstances.add(dimension, location, new ValveHandle(entity));
      break;

    case "create:hand_crank":
      KineticInstances.add(dimension, location, new HandCrank(entity));
      break;

    case "create:mechanical_mixer":
      KineticInstances.add(dimension, location, new MechanicalMixer(entity));
      break;
  }
});
