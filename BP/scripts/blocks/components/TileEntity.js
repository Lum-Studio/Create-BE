import { world, system } from "@minecraft/server";
import Cogwheel from "../Cogwheel";
import MechanicalMixer from "../MechanicalMixer";
import KineticInstances from "../KineticInstances";
import EncasedFan from "../EncasedFan";
import ValveHandle from "../cranks/ValveHandle";
import HandCrank from "../cranks/HandCrank";

world.afterEvents.playerPlaceBlock.subscribe(({ block, dimension }) => {
    switch (block.typeId) {
        case "create:cogwheel":
            dimension.spawnEntity(block.typeId, block.center());
            break;
        case "create:mechanical_press":
            dimension.spawnEntity(block.typeId, block.center());
            break;
    }
});

world.beforeEvents.playerBreakBlock.subscribe(({ block, dimension }) => {
    switch (block.typeId) {
        case "create:cogwheel":
            system.runTimeout(() => { dimension.getEntitiesAtBlockLocation(block.location)[0].remove(); });
            break;
        case "create:mechanical_press":
            system.runTimeout(() => { dimension.getEntitiesAtBlockLocation(block.location)[0].remove(); });
            break;
    }
});


world.afterEvents.entitySpawn.subscribe(({ entity }) => {
    const { dimension, location, typeId } = entity
    switch (typeId) {
        case "create:cogwheel":
            KineticInstances.add(dimension, location, new Cogwheel(entity))
            break;

        case "create:encased_fan":
            KineticInstances.add(dimension, location, new EncasedFan(entity))
            break;

        case "create:valve_handle":
            KineticInstances.add(dimension, location, new ValveHandle(entity))
            break;

        case "create:hand_crank":
            KineticInstances.add(dimension, location, new HandCrank(entity))
            break;

        case "create:mechanical_mixer":
            KineticInstances.add(dimension, location, new MechanicalMixer(entity))
            break;
    }
});


