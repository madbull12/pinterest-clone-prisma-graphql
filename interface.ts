
export interface IPin {
    id:string;
    title:string;
    description?:string;
    imageUrl:string;
    category:string[];
    userId:string;
    comments:IComment[];
}
export interface IUser {
    image:string;
    email:string;
    id:string;
    pins:IPin[];
    role:Role
}

export interface IComment {
    id:string;
    content:string;
    createdAt:any;
    pinId:string;
    userId:string;
    user:IUser
}

export interface ISaved {
    id:string;
    userId:string;
    pin:IPin;
    pinId:string;
}

export interface IBoard {
    id:string;
    name:string;
    userId:string;
    secret:boolean;
    saved:ISaved[]
}


enum Role {
    USER = "user",
    ADMIN = "admin"
}