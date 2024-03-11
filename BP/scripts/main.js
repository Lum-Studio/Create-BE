//idk what u wanna put in here lol
import {  EntityInitializationCause, world } from "@minecraft/server"
class MechanicalBelt {
    constructor(entity){

    }
}

world.afterEvents.entitySpawn.subscribe(ev=>{
    const {entity,cause} = ev
   
  if (cause === EntityInitializationCause.Spawned){
    switch(entity.typeId){
        case "createe:mechanical_belt": 
        new MechanicalBelt(entity);
        break
    }
  }
})