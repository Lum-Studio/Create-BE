
import HandCrank from "./HandCrank";

export default class ValveHandle extends HandCrank {
    constructor(entity) {
        super(entity);
        this.setSpeed(16);
    }


}