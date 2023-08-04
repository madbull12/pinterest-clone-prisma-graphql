import { Prisma } from "@prisma/client";

// export interface IPin {
//   id: string;
//   title: string;
//   description?: string;
//   media: string;
//   categories: ICategory[];
//   userId: string;
//   comments: CommentWithPayload[];
// }
// export interface IUser {
//   image: string;
//   email: string;
//   id: string;
//   pins: IPin[];
//   role: Role;
// }

// export interface IComment {
//   id: string;
//   content: string;
//   createdAt: any;
//   pinId: string;
//   userId: string;
//   user: IUser;
// }


// export interface IBoard {
//   id: string;
//   name: string;
//   userId: string;
//   secret: boolean;
//   saved: ISaved[];
// }

export interface ICategory extends CategoryWithPins {
  id: string;
  name: string;
}

enum Role {
  USER = "user",
  ADMIN = "admin",
}

export type CategoryWithPins = Prisma.CategoryGetPayload<{

  include: {
    pins: {
        select:{
            media:true
        }
    };
  };
}>;

export type CommentWithPayload = Prisma.CommentGetPayload<{
  include:{
    user:true
  }
}>
export type SavedWithPayload = Prisma.SavedGetPayload<{
  include:{
    pin:true
  }
}>

export type PinWithPayload = Prisma.PinGetPayload<{
  include:{
    comments:{
      include:{
        user:true
      }
    },
    user:true,
    saved:true,
    categories:true
  }
}>

export type BoardWithPayload = Prisma.BoardGetPayload<{
  include:{
      saved:{
          
          include:{
              pin:true
          }
      }
  }
}>