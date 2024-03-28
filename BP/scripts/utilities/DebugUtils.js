import { world } from "@minecraft/server";
import KineticInstances from "../blocks/KineticInstances";

world.afterEvents.chatSend.subscribe(({sender, message}) => {
    if (message.startsWith("!")) {
        switch(message) {
            // debug tools didnt work with beforeevents
            case "!clear tile entities":
                for (const entity of sender.dimension.getEntities()) {
                    if (entity.typeId.startsWith("create:")) {
                        entity.remove();
                    };
                };
                break;
            case "!data get":
                printData(sender);
                break
            case "!data get all":
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
    let data = `${be.block.location.x}, ${be.block.location.y}, ${
      be.block.location.z
    } has the following block data: {§bSpeed: §6${be.speed}, §bNetwork: §6${
      be.network
    }, §bStress: §6${be.stress}, §bCapacity: §6${be.capacity}, §bSource: §6${JSON.stringify(block.location)}§f}`;
    sender.sendMessage(data);
}
