import { world } from "@minecraft/server";
import KineticInstances from "../blocks/KineticInstances";

world.beforeEvents.chatSend.subscribe(e => {
    if (e.message.startsWith("!")) {
        switch(e.message) {
            // debug tools didnt work with beforeevents
            case "!clear tile entities":
                e.cancel = true;
                for (const entity of e.sender.dimension.getEntities()) {
                    if (entity.typeId.startsWith("create:")) {
                        entity.remove();
                    };
                };
                break;
            case "!data get":
                e.cancel = true;
                printData(sender);
                break
            case "!data get all":
                e.cancel = true;
                console.warn(KineticInstances.debugInstances());
                break;
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
