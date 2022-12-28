import { extendType, objectType } from "nexus";

export const Category = objectType({
    name:"Category",
    definition(t) {
        t.string("id")
        t.string("name")
        t.list.field<any>("pins",{
            type:"Pin",
            async resolve(_parent:any,args,ctx) {
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
});

export const CategoryQuery = extendType({
    type:"Query",
    definition(t) {
        t.list.nonNull.field<any>("categories",{
            type:"Category",
            resolve(_parent,args,ctx) {
                return ctx.prisma.category.findMany({
                    include:{
                        pins:{
                            select:{
                                media:true
                            }
                        }
                    }
                })
            }
        }),
        t.list.nonNull.field<any>("categoriesHighestPins",{
            type:"Category",
            resolve(_parent,args,ctx) {
                return ctx.prisma.category.findMany({
                    include:{
                        pins:{
                            select:{
                                media:true,
                                
                            },
                           
                            
                        }
                    },
                    orderBy:{
                        pins:{
                            _count:"desc"
                        }
                    }
                
                })

            }
        })
    }
})