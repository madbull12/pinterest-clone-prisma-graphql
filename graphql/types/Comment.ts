import { objectType,asNexusMethod } from "nexus"
import { DateTimeResolver } from "graphql-scalars";

import { Pin } from "./Pin"
import { User } from "./User"

export const GQLDate = asNexusMethod(DateTimeResolver,"date");

export const Comment = objectType({
    name:"Comment",
    definition(t) {
        t.string("id")
        t.date("createdAt")
        t.string("content")
        t.string("pinId")
        t.field("pin",{
            type:Pin,
            async resolve(_parent,args,ctx) {
                return await ctx.prisma.comment.findUnique({
                    where:{
                        id:_parent.id
                    }
                })
                .pin()
            }
        })
        t.string("userId")
        t.field("user",{
            type:User,
            async resolve(_parent,_args,ctx) {
                return await ctx.prisma.comment
                    .findUnique({
                        where:{
                            id:_parent.id
                        }
                    })
                    .user()
            }
        })
        
    },
})
