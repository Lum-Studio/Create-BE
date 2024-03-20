import { ItemStack, world } from "@minecraft/server";
import KineticInstances from "../blocks/KineticInstances";
import HandCrank from "../blocks/cranks/HandCrank";

world.afterEvents.playerInteractWithBlock.subscribe(ev => {
    const { block: { dimension, location: { x, y, z }, typeId }, itemStack, player } = ev;

    const blockEntity = dimension.getEntitiesAtBlockLocation(block.center())[0];
    const kineticBlock = KineticInstances.get(dimension, blockEntity.location);

    if (typeId.startsWith('minecraft')) {
        const strippedLogs = [
            "minecraft:stripped_acacia_log",
            "minecraft:stripped_oak_log",
            "minecraft:stripped_dark_oak_log",
            "minecraft:stripped_birch_log",
            "minecraft:stripped_spruce_log",
            "minecraft:stripped_mangrove_log",
            "minecraft:stripped_jungle_log",
            "minecraft:stripped_cherry_log"
        ];
        if (strippedLogs.includes(typeId) && itemStack.typeId === 'create:andesite_alloy') {
            const inv = player.getComponent('inventory').container;
            dimension.runCommand(`setblock ${x} ${y} ${z} rc:andesite_casing replace`);
            inv.setItem(player.selectedSlot, itemStack.amount > 1 ? new ItemStack(itemStack.typeId, itemStack.amount--) : undefined);
        }
    } else if (kineticBlock instanceof HandCrank) {
        kineticBlock.turn(player.isSneaking);
    }
});
