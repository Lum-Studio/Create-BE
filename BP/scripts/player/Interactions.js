import { world } from "@minecraft/server";
import KineticInstances from "../blocks/KineticInstances";
import HandCrank from "../blocks/cranks/HandCrank";

world.afterEvents.playerInteractWithBlock.subscribe(({ block, player }) => {
    const { dimension } = block;

    const blockEntity = dimension.getEntitiesAtBlockLocation(block.center())[0];
    if (!blockEntity) return;
    const kineticBlock = KineticInstances.get(dimension, blockEntity.location);

    if (kineticBlock instanceof HandCrank) {
        kineticBlock.turn(player.isSneaking);
    }
});
