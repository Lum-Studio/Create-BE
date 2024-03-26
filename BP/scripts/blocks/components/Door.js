import { world, BlockPermutation } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe(initEvent => {
    initEvent.blockTypeRegistry.registerCustomComponent('create:door', {
        onPlace: ({ block }) => {
            const per = block.permutation;
            if (per.getState("create:half") === "lower") {
                const upper = block.above();
                upper.setPermutation(BlockPermutation.resolve(block.typeId, { "minecraft:cardinal_direction": per.getState("minecraft:cardinal_direction"), "create:half": "upper", "create:hinge": per.getState("create:hinge") }));
            }
        },
        beforeOnPlayerPlace: ({ block }) => {
            const upper = block.above();
            if (!upper?.isAir) {
                e.cancel = true
            }
        },
        onPlayerDestroy: ({ block, dimension }) => {
            const { x, y, z } = block.location;
            const per = block.permutation
            if (per.getState('create:half') === "lower") {
                dimension.runCommand(`setblock ${x} ${y + 1} ${z} air destroy`);
            } else {
                dimension.runCommand(`setblock ${x} ${y - 1} ${z} air destroy`);
            }
        },
        onPlayerInteract: ({ block }) => {
            const per = block.permutation;
            if (per.getState("create:half") == "lower") {
                const doorPieces = [block.above(), block]
                if (per.getState("create:open") == false) {
                    doorPieces.forEach((block) => {
                        const per = block?.permutation
                        block?.setPermutation(per.withState("create:open", true));
                    });
                } else {
                    doorPieces.forEach((block) => {
                        const per = block?.permutation
                        block?.setPermutation(per.withState("create:open", false));
                    });
                }
            }

            if (per.getState("create:half") == "upper") {
                const doorPieces = [block, block.below()];
                if (per.getState("create:open") == false) {
                    doorPieces.forEach(block => {
                        block.setPermutation(per.withState('create:open', true));
                    })
                } else {
                    doorPieces.forEach(block => {
                        block.setPermutation(per.withState('create:open', false));
                    })
                }
            }
        }
    })
});
