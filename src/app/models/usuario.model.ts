export class Usuario {

    static fromFirebase({ uid, nombre, email }: any): Usuario {
        return new Usuario(uid, nombre, email);
    }

    constructor(
        public uid: string | any,
        public nombre: string | any,
        public email: string | any
    ) { }
    
}