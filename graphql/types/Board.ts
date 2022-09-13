import { extendType, nonNull, objectType, stringArg } from "nexus";
import { resolve } from "path";

export const Board = objectType({
    name:"Board",
    definition(t) {
        t.string("id")
        t.string("name")
        t.string("userId")
        t.boolean("secret")
        t.field("user",{
            type:"User",
            async resolve(_parent,args,ctx) {
                return await ctx.prisma.board
                    .findUnique({
                        where:{
                            id:_parent.id
                        }
                    })
                    .user()
            }
        })
        t.list.field("saved",{
            type:"Saved",
            async resolve(_parent,args,ctx) {
                return await ctx.prisma.board
                    .findUnique({
                        where:{
                            id:_parent.id
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
        t.list.nonNull.field("UserBoards",{
            type:Board,
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

        })

    },
})