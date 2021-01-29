export class User {
    public active: boolean;
    
    constructor(
        public username: string,
        public password: string
    ){
        this.active = true;
    }
}