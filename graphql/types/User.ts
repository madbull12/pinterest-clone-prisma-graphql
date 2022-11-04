import { enumType, extendType, nonNull, objectType, stringArg } from "nexus";
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
            async resolve(_parent:any,_args,ctx) {
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

export const UsersQuery = extendType({
    type:"Query",
    definition(t) {
        t.nonNull.field<any>("user",{
            type:'User',
            args:{
                userId:nonNull(stringArg())
            },
            resolve(_parent,{ userId },ctx) {
                return ctx.prisma.user
                    .findUnique({
                        where:{
                            email:userId
                        }
                    })
            }

    })
}})



const Role = enumType({
    name:"Role",
    members:["USER","ADMIN"]
})