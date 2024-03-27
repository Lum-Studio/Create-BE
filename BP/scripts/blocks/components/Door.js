import { world, system } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe((initEvent) => {
    initEvent.blockTypeRegistry.registerCustomComponent("create:door", {
        beforeOnPlayerPlace: (e) => {
            const upper_block = e.block.above();
            if (!upper_block.isAir) {
                e.cancel = true;
                return;
            };
            const dir = e.permutationToPlace.getState("minecraft:cardinal_direction");
            const hinge = getHinge(e.player, dir);
            upper_block.setPermutation(
                e.permutationToPlace
                    .withState("create:half", "upper")
                    .withState("create:hinge", hinge)
            );
            e.permutationToPlace = e.permutationToPlace.withState("create:hinge", hinge);
        },
        onPlayerDestroy({ block, dimension, destroyedBlockPermutation }) {
            if (block.above().hasTag("upper_door")) {
                const { x, y, z } = block.above();
                dimension.runCommandAsync(`setblock ${x} ${y} ${z} air destroy`);
                if (destroyedBlockPermutation.getState("create:open")) {
                    dimension.getEntitiesAtBlockLocation(block.location)[0].remove();
                };
            } else {
                const below = block.below();
                const { x, y, z } = below;
                dimension.runCommandAsync(`setblock ${x} ${y} ${z} air destroy`);
                if (destroyedBlockPermutation.getState("create:open")) {
                    dimension.getEntitiesAtBlockLocation(below)[0].remove();
                };
            };
        },
        onPlayerInteract: (e) => {
            const block2 = e.block.hasTag("upper_door") ? e.block.below() : e.block.above();
            const direction = e.block.permutation.getState("minecraft:cardinal_direction");
            const hinge = !e.block.hasTag("left");
            const neighbour = e.dimension.getBlock(getN(direction, e.block.location, hinge));
            const open = e.block.hasTag("open");
            if (!open) {
                const bottom = e.block.hasTag("upper_door")
                    ? block2.bottomCenter()
                    : e.block.bottomCenter();
                const entity = e.dimension.spawnEntity(e.block.typeId, bottom);
                entity.setProperty("create:cardinal_direction", getEntityDirection(direction));
                entity.setProperty("create:hinge", hinge);
                e.block.setPermutation(e.block.permutation.withState("create:open", true));
                block2.setPermutation(block2.permutation.withState("create:open", true));
            } else {
                const entity = e.block.hasTag("upper_door")
                    ? e.dimension.getEntitiesAtBlockLocation(block2.location)[0]
                    : e.dimension.getEntitiesAtBlockLocation(e.block.location)[0];
                entity.setProperty("create:open", false);
                system.runTimeout(() => {
                    if (entity.getProperty("create:open") === false) {
                        e.block.setPermutation(e.block.permutation.withState("create:open", false));
                        block2.setPermutation(block2.permutation.withState("create:open", false));
                        e.dimension.playSound("close.iron_door", e.block.location, {pitch: Math.random() / 10 + 0.90});
                        system.runTimeout(() => {
                            entity.remove();
                        }, 1);
                    }
                }, 7);
            }
            if (neighbour.hasTag("door")) {
                const nDirection = neighbour.permutation.getState("minecraft:cardinal_direction");
                const nHinge = !neighbour.hasTag("left");
                if (nHinge != hinge && direction == nDirection) {
                    const nOpen = neighbour.hasTag("open");
                    if (nOpen == open) {
                        const upper = neighbour.hasTag("upper_door");
                        const bottom = upper ? neighbour.below() : neighbour;
                        const top = upper ? neighbour : neighbour.above();
                        if (!open) {
                            const entity2 = e.dimension.spawnEntity(
                                bottom.typeId,
                                bottom.bottomCenter()
                            );
                            entity2.setProperty(
                                "create:cardinal_direction",
                                getEntityDirection(nDirection)
                            );
                            entity2.setProperty("create:hinge", nHinge);
                            top.setPermutation(top.permutation.withState("create:open", true));
                            bottom.setPermutation(
                                bottom.permutation.withState("create:open", true)
                            );
                        } else {
                            const entity2 = e.dimension.getEntitiesAtBlockLocation(
                                bottom.location
                            )[0];
                            entity2.setProperty("create:open", false);
                            system.runTimeout(() => {
                                if (entity2.getProperty("create:open") === false) {
                                    top.setPermutation(
                                        top.permutation.withState("create:open", false)
                                    );
                                    bottom.setPermutation(
                                        bottom.permutation.withState("create:open", false)
                                    );
                                    e.dimension.playSound("close.iron_door", top.location, {pitch: Math.random() / 10 + 0.90});
                                    system.runTimeout(() => {
                                        entity2.remove();
                                    }, 1);
                                }
                            }, 7);
                        };
                    };
                };
            };
        },
    });
});

function getEntityDirection(string) {
    switch (string) {
        case "east":
            return 1;
        case "north":
            return 0;
        case "west":
            return 3;
        default:
            return 2;
    }
}

function getN(string, location, bool) {
    const val = bool == true ? 1 : -1;
    switch (string) {
        case "east":
            return { x: location.x, y: location.y, z: location.z - val };
        case "west":
            return { x: location.x, y: location.y, z: location.z + val };
        case "north":
            return { x: location.x - val, y: location.y, z: location.z };
        default:
            return { x: location.x + val, y: location.y, z: location.z };
    };
};

function getHinge(player, direction) {
    switch (direction) {
        case "north":
            if (player.getViewDirection().x < 0) {
                return "left";
            } else {
                return "right";
            };
        case "west":
            if (player.getViewDirection().z > 0) {
                return "left";
            } else {
                return "right";
            };
        case "east":
            if (player.getViewDirection().z < 0) {
                return "left";
            } else {
                return "right";
            };
        default:
            if (player.getViewDirection().x > 0) {
                return "left";
            } else {
                return "right";
            };
    };
};
