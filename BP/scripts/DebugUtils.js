import { world } from "@minecraft/server";
import KineticInstances from "./blocks/";

world.beforeEvents.chatSend.subscribe(({sender, message, cancel}) => {
    if (message.startsWith("!")) {
        switch(message) {
            case "!clear tile entities":
                cancel = true;
                for (const entity of sender.dimension.getEntities()) {
                    if (entity.typeId.startsWith("create:")) {
                        entity.remove();
                    };
                };
                break;
            case "!data get":
                cancel = true;
                printData(sender);
                break
        }
    };
});

function printData(sender) {
    const block = sender.getBlockFromViewDirection().block;
    let be = KineticInstances.get(block.dimension, block.location);
    if (be === undefined) {
        sender.sendMessage("§cNot a kineticblock§f");
        return;
    };
    let data = `§bSpeed: §6${be.speed}, §bNetwork: §6${be.network}, §bStress: §6${0}, §bSource: §6${JSON.stringify(block.location)}§f`;
    sender.sendMessage(data);
}
