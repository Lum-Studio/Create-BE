import { world, system } from "@minecraft/server";
import { Cogwheel } from "../Cogwheel";

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
            new Cogwheel(entity).init();
            break;
    }
});