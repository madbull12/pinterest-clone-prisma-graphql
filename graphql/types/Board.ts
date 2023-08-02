// import { Board, Board, Board } from "@prisma/client";
import { booleanArg, extendType, nonNull, objectType, stringArg } from "nexus";

export const Board = objectType({
    name:"Board",
    definition(t) {
        t.string("id")
        t.string("name")
        t.string("userId")
        t.boolean("secret")
        t.field("user",{
            type:"User",
            async resolve(_parent,_,ctx) {
                return await ctx.prisma.board
                    .findUnique({
                        where:{
                            id:_parent.id as string
                        }
                    })
                    .user()
            } 
        })
        t.list.field<any>("saved",{
            type:"Saved",
            async resolve(_parent:any,_,ctx) {
                return await ctx.prisma.board
                    .findUnique({
                        where:{
                            id:_parent.id as string
                        }
                    })
                    .saved()
            }
        })
    },
});

export const BoardQuery = extendType({
    type:"Query",
    definition(t) {
        t.list.nonNull.field("userBoards",{
            type:"Board",
            args:{
                userId:nonNull(stringArg())
            },
            resolve(_parent,{ userId },ctx) {
                return ctx.prisma.board.findMany({
                    where:{
                        userId
                    }
                })
            }

        }),
        t.nonNull.field<any>("firstUserBoard",{
            type:"Board",
            args:{
                userId:nonNull(stringArg())
            },
            resolve(_parent,{ userId },ctx) {
                return ctx.prisma.board.findFirst({
                    where:{
                        userId
                    }
                })
            }

        }),
        t.nonNull.field<any>("boardPins",{
            type:"Board",
            args:{
                boardId:nonNull(stringArg())
            },
            resolve(_parent,{ boardId }, ctx) {
                return ctx.prisma.board.findUnique({
                    where:{
                        id:boardId
                    }
                })
            }
            
        })

    },
});

export const BoardMutation = extendType({
    type:"Mutation",
    definition(t) {
        t.nonNull.field<any>("createBoard",{
            type:"Board",
            args:{
                userId:nonNull(stringArg()),
                name:nonNull(stringArg()),
                secret:nonNull(booleanArg())

            },
            async resolve(_parent,args,ctx) {
                if(!ctx.user) {
                    throw new Error("Unauthorized!");
                  }
                return await ctx.prisma.board
                    .create({
                        data:{
                            name:args.name,
                            userId:args.userId,
                            secret:args.secret
                        }
                    })
            }
        })
        

    },
})