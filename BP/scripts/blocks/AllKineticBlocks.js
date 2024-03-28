import GeneratingKineticBlockEntity from "./base/GeneratingKineticBlockEntity";
import Cogwheel from "./Cogwheel";
import MechanicalPress from "./MechanicalPress";
import KineticBlockEntity from "./base/KineticBlockEntity";
import LargeCogwheel from "./LargeCogwheel";
import HandCrank from "./cranks/HandCrank";

const AllKineticBlocks = {
  "create:creative_motor": {
    class: GeneratingKineticBlockEntity,
    capacity: 16384,
    stress: 0,
  },
  "create:cogwheel": {
    class: Cogwheel,
    capacity: 0,
    stress: 0,
  },
  "create:hand_crank": {
    class: HandCrank,
    capacity: 0,
    stress: 0,
  },
  "create:large_cogwheel": {
    class: LargeCogwheel,
    capacity: 0,
    stress: 0,
  },
  "create:mechanical_press": {
    class: MechanicalPress,
    capacity: 0,
    stress: 4,
  },
  "create:shaft": {
    class: KineticBlockEntity,
    capacity: 0,
    stress: 0,
  },
};

export default class KineticStats {

    static getStress(typeId) {
        if (AllKineticBlocks[typeId] === undefined) return 0;
        return AllKineticBlocks[typeId];
    };

    static getClass(typeId) {
        return AllKineticBlocks[typeId].class;
    };

    static getcapacity(typeId) {
        if (AllKineticBlocks[typeId] === undefined) return 0;
        return AllKineticBlocks[typeId].capacity;
    };

    static hasCapacity(typeId) {
        if (AllKineticBlocks[typeId] === undefined) return false;
        return AllKineticBlocks[typeId].capacity !== 0;
    };

    static hasStress(typeId) {
        if (AllKineticBlocks[typeId] === undefined) return false;
        return AllKineticBlocks[typeId].stress !== 0;
    };

    static hasStats(typeId) {
        return AllKineticBlocks[typeId] !== undefined;
    };
};