import { world } from "@minecraft/server";

world.afterEvents.chatSend.subscribe(({sender, message}) => {
    if (message.startsWith("!")) {
        if (message === "!remove tile_entities") {
            for (const entity of sender.dimension.getEntities()) {
                if (entity.typeId.startsWith("create:")) {
                    entity.remove();
                };
            };
        };
    };
});