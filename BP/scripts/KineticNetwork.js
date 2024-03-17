
class KineticNetwork {

    static generateID() {
        //I hope this is random enough
        return Math.round(Math.random() * 100000000);
    }
    
    constructor() {
    
        this.rotationalSources = new Set();
        this.members = new Set();
    }

    addMember(location) {
        this.members.add(`x${location.x}y${location.y}${location.z}`);
    }

    addSource(location) {
        this.rotationalSources.add(`x${location.x}y${location.y}${location.z}`);
    }
}