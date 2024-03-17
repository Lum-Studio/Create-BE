import { world, system } from "@minecraft/server";
import Cogwheel from "../Cogwheel";
import { KineticInstances } from "../kineticInstancen";

world.afterEvents.playerPlaceBlock.subscribe(({block, dimension}) => {
    switch (block.typeId) {
        case "create:cogwheel":
            dimension.spawnEntity(block.typeId, block.center());
            break;
        case "create:mechanical_press":
            dimension.spawnEntity(block.typeId, block.center());
            break;
    }
});

world.beforeEvents.playerBreakBlock.subscribe(({block, dimension}) => {
    switch (block.typeId) {
        case "create:cogwheel":
            system.runTimeout(() => { dimension.getEntitiesAtBlockLocation(block.location)[0].remove(); });
            break;
        case "create:mechanical_press":
            system.runTimeout(() => { dimension.getEntitiesAtBlockLocation(block.location)[0].remove(); });
            break;
    }
});

world.afterEvents.entitySpawn.subscribe(({entity}) => {
    switch (entity.typeId) {
        case "create:cogwheel":
            const be = new Cogwheel(entity);
            be.init();
            KineticInstances.add(entity.dimension, be.block.location, be);
            break;
    }
});
