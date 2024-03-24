import { world, BlockPermutation } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
    initEvent.blockTypeRegistry.registerCustomComponent('create:door', {
        onPlace: e => {
            const per = e.block.permutation;
            if (per.getState("create:half") === "lower") {
                e.block.above().setPermutation(BlockPermutation.resolve("create:andesite_door", {"minecraft:cardinal_direction": per.getState("minecraft:cardinal_direction"), "create:half": "upper", "create:hinge": per.getState("create:hinge")}));
            }
        },
        beforeOnPlayerPlace: e => {
            if (!e.block.above().isAir) {
                e.cancel = true
            }
        },
        onPlayerDestroy: e => {
            if (e.block.above().hasTag("upper_door")) {
                e.dimension.runCommand(`setblock ${e.block.location.x} ${e.block.location.y + 1} ${e.block.location.z} air destroy`);
            } else {
                e.dimension.runCommand(`setblock ${e.block.location.x} ${e.block.location.y - 1} ${e.block.location.z} air destroy`);
            }
        },
        onPlayerInteract: e => {
            if (e.block.hasTag("upper_door")) {
                
            }
        }
    });
});