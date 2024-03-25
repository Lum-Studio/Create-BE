import { world } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
    initEvent.blockTypeRegistry.registerCustomComponent('create:door', {
        beforeOnPlayerPlace: e => {
            const upper_block = e.block.above();
            if (!upper_block.isAir) {
                e.cancel = true
            };
            upper_block.setPermutation(e.permutationToPlace.withState("create:half", 'upper'));
        },
        onPlayerDestroy: ({ block, dimension }) => {
            if (block.above().hasTag("upper_door")) {
                dimension.runCommand(`setblock ${block.location.x} ${block.location.y + 1} ${block.location.z} air destroy`);
            } else {
                dimension.runCommand(`setblock ${block.location.x} ${block.location.y - 1} ${block.location.z} air destroy`);
            };
        },
        onPlayerInteract: e => {
            const block2 = e.block.hasTag("upper_door") ? e.block.below() : e.block.above();
            if (!e.block.hasTag("open")) {
                e.block.setPermutation(e.block.permutation.withState("create:open", true));
                block2.setPermutation(block2.permutation.withState("create:open", true));
            } else {
                e.block.setPermutation(e.block.permutation.withState("create:open", false));
                block2.setPermutation(block2.permutation.withState("create:open", false));
            };
        }
    });
});
