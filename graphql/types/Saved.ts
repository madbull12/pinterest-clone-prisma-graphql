import { DateTimeResolver } from "graphql-scalars";
import { asNexusMethod, extendType, nonNull, objectType, stringArg } from "nexus";
import { resolve } from "path";

const GQLDate = asNexusMethod(DateTimeResolver,"date");


export const Saved = objectType({
    name:"Saved",
    definition(t) {
        t.string("id")
        t.string("createdAt")
        t.string("userId")
        t.string("pinId")
        t.field("user",{
            type:"User",
            async resolve(_parent:any,_args,ctx) {
                return await ctx.prisma.saved
                    .findUnique({
                        where:{
                            id:_parent.id
                        }
                    })
                    .user()
            }
        })
        t.field<any>("pin",{
            type:"Pin",
            async resolve(_parent:any,_args,ctx) {
                return await ctx.prisma.saved
                    .findUnique({
                        where:{
                            id:_parent.id
                        }
                    })
                    .pin()
            }
        })
    },
});

export const SavedQuery = extendType({
    type:"Query",
    definition(t) {
        
        t.nonNull.list.field<any>("saved",{
            type:"Saved",
            resolve(_parent,_args,ctx) {
                return ctx.prisma.saved.findMany()
            }
        }),
        t.nonNull.list.field<any>("userSaved",{
            type:"Saved",
            args:{
                userId:nonNull(stringArg())
            },
            resolve(_parent,{ userId },ctx) {
                return ctx.prisma.saved.findMany({
                    where:{
                        userId
                    }
                })
            }
        })

    }
});

export const SaveMutation = extendType({
    type:"Mutation",
    definition(t) {
 
        t.nonNull.field<any>("savePin",{
            type:"Saved",
            args:{
                pinId:nonNull(stringArg()),
                boardId:nonNull(stringArg()),
                userId:nonNull(stringArg())
            },
            async resolve(_parent,args:any,ctx) {
             

                const saveData = {
                    pinId:args.pinId,
                    userId:args.userId,
                    boardId:args.boardId
                }

                return await ctx.prisma.saved.create({
                    data:saveData
                })
            }
        })
        t.nonNull.field<any>("deleteSave",{
            type:"Saved",
            args:{
                saveId:nonNull(stringArg())
            },
            async resolve(_parent,{ saveId },ctx) {
                return await ctx.prisma.saved.delete({
                    where:{
                        id:saveId
                    }
                })
            }
        })
    },
})