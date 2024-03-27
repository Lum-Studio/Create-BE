import { GameMode, world } from "@minecraft/server";

world.afterEvents.playerInteractWithBlock.subscribe(({ block, player, itemStack }) => {
    if (!itemStack) return;

    if (itemStack.typeId === "create:andesite_alloy" && block.typeId.startsWith("minecraft")) {
        const strippedLogs = [
            "minecraft:stripped_acacia_log",
            "minecraft:stripped_oak_log",
            "minecraft:stripped_dark_oak_log",
            "minecraft:stripped_birch_log",
            "minecraft:stripped_spruce_log",
            "minecraft:stripped_mangrove_log",
            "minecraft:stripped_jungle_log",
            "minecraft:stripped_cherry_log",
        ];

        if (strippedLogs.includes(block.typeId)) {
            const inv = player.getComponent("inventory").container;
            block.setType("create:andesite_casing");
            block.dimension.playSound("dig.wood", block.location);

            // TODO: Replace with correct sound
            // block.dimension.playSound("note.iron_xylophone", block.location);

            if (player.getGameMode() === GameMode.creative) return;
            if (itemStack.amount > 1) itemStack.amount--;
            else itemStack = undefined;

            inv.setItem(player.selectedSlot, itemStack);
        }

        return;
    }
});

// Wait until onUseOn released
// world.beforeEvents.worldInitialize.subscribe(({ itemComponentRegistry }) => {
//     itemComponentRegistry.registerCustomComponent("create:andesite_alloy", {
//         onUse() {},
//     });
// });
