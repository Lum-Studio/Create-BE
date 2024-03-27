import GeneratingKineticBlockEntity from "./base/GeneratingKineticBlockEntity";
import Cogwheel from "./Cogwheel";
import MechanicalPress from "./MechanicalPress";
import KineticBlockEntity from "./base/KineticBlockEntity";

export default {
    "create:creative_motor": {
        class : GeneratingKineticBlockEntity,
        capacity: 16384,
        stress: 0
    },
    "create:cogwheel": {
        class: Cogwheel,
        capacity: 0,
        stress: 0
    },
    "create:mechanical_press": {
        class: MechanicalPress,
        capacity: 0,
        stress: 4
    },
    "create:shaft": {
        class : KineticBlockEntity,
        capacity: 0,
        stress: 0
    }
};