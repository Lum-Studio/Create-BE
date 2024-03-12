
class KineticNetwork {
    
    static generateID (){

    }
    constructor(){
    
        this.rotationalSources = new Set();
        this.members = new Set();
    }

    addMember(member){
        this.members.add(member)
    }

    addSource(source){
        this.rotationalSources.add(source);
    }


}

