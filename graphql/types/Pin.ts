import { DateTimeResolver } from "graphql-scalars";
import { objectType,extendType, enumType, nonNull, stringArg, queryField, asNexusMethod } from "nexus";  
import { Comment } from "./Comment";
import { User } from "./User";

export const GQLDate = asNexusMethod(DateTimeResolver,"date");

export const Pin = objectType({
    name:"Pin",
    definition(t) {
        t.string("id")
        t.date("createdAt")
        t.string("title")
        t.string("imageUrl")
        t.string("description")
        t.list.string("category")
        t.string("userId")
        t.field("user",{
            type:User,
            async resolve(_parent,_args,ctx) {
                return await ctx.prisma.pin
                    .findUnique({
                        where:{
                            id:_parent.id
                        }
                    })
                    .user()
            }
        })
        t.list.field("comments",{
            type:Comment,
            async resolve(_parent,_args,ctx) {
                return await ctx.prisma.pin
                    .findUnique({
                        where:{
                            id:_parent.id
                        }
                    })
                    .comments()
            } 
        })
    },
})

export const PinsQuery = extendType({
    type:"Query",
    definition(t) {
        t.nonNull.list.field("pins",{
            type:'Pin',
            resolve(_parent,_args,ctx) {
                return ctx.prisma.pin.findMany()
            }
        

        })
        t.nonNull.field("pin",{
            type:'Pin',
            args:{
                pinId:nonNull(stringArg())
            },
            resolve(_parent,{ pinId },ctx) {
                return ctx.prisma.pin.findUnique({
                    where:{
                        id:pinId
                    }
                })
            }
            

        })
    }
});







