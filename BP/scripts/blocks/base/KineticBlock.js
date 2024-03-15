import { BlockEvent } from "@minecraft/server";
import { EncasedFan } from "../EncasedFan";


class KineticBlock {

   constructor() {

   }

   /**
    * 
    * @param {BlockEvent} event 
    */
   onPlace(event) {
      const { typeId, dimension, location } = event.block;
      dimension.spawnEntity(typeId, location);
      switch (typeId) {
         case 'create:encased_fan':
            new EncasedFan(event.block)
            break;
      }

      
   }

}
