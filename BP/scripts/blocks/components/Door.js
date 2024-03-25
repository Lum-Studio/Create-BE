import { world } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
    initEvent.blockTypeRegistry.registerCustomComponent('create:door', {
        onPlace: ({ block }) => {
            if (block.permutation.getState("create:half") === "lower") {
                block.above().setPermutation(block.permutation.withState("create:half", 'upper'));
            }
        },
        beforeOnPlayerPlace: e => {
            if (!e.block.above().isAir) {
                e.cancel = true
            }
        },
        onPlayerDestroy: ({ block, dimension }) => {
            if (block.above().hasTag("upper_door")) {
                dimension.runCommand(`setblock ${block.location.x} ${block.location.y + 1} ${block.location.z} air destroy`);
            } else {
                dimension.runCommand(`setblock ${block.location.x} ${block.location.y - 1} ${block.location.z} air destroy`);
            }
        },
        onPlayerInteract: e => {
            let block2 = e.block.hasTag("upper_door") ? e.block.below() : e.block.above();
            if (!e.block.hasTag("open")) {
                e.block.setPermutation(e.block.permutation.withState("create:open", true));
                block2.setPermutation(block2.permutation.withState("create:open", true));
            } else {
                e.block.setPermutation(e.block.permutation.withState("create:open", false));
                block2.setPermutation(block2.permutation.withState("create:open", false));
            }
        }
    });
});
