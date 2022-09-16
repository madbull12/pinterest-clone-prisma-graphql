import { objectType } from "nexus";

export const Category = objectType({
    name:"Category",
    definition(t) {
        t.string("id")
        t.string("name")
        t.list.field("pins",{
            type:"Pin",
            async resolve(_parent,args,ctx) {
                return await ctx.prisma.category
                    .findUnique({
                        where:{
                            id:_parent.id
                        }
                    })
                    .pins()
            }
        })


    },
})