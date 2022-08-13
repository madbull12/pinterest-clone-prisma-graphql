import { enumType, objectType } from "nexus";
import { Pin } from "./Pin";

export const User = objectType({
    name:"User",
    definition(t) {
        t.string("id")
        t.string("email")
        t.string("image")
        t.field("role",{ type:Role })
        t.list.field("pins",{
            type:Pin,
            async resolve(_parent,_args,ctx) {
                return await ctx.prisma.user.findUnique({
                    where:{
                        id:_parent.id
                    }
                })
                .pins()
            }
        })
    },
});

const Role = enumType({
    name:"Role",
    members:["USER","ADMIN"]
})