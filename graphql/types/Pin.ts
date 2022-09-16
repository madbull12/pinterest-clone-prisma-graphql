import { DateTimeResolver } from "graphql-scalars";
import { objectType,extendType, enumType, nonNull, stringArg, queryField, asNexusMethod, list } from "nexus";  
import { Comment } from "./Comment";
import { User } from "./User";

 const GQLDate = asNexusMethod(DateTimeResolver,"date");

export const Pin = objectType({
    name:"Pin",
    definition(t) {
        t.string("id")
        t.date("createdAt")
        t.string("title")
        t.string("imageUrl")
        t.string("description")
        t.list.field("categories",{
            type:"Category",
            async resolve(_parent,_args,ctx) {
                return await ctx.prisma.pin
                    .findUnique({
                        where:{
                            id:_parent.id
                        }
                    })
                    .categories()
            }
        })
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
        t.nonNull.list.field("searchPins",{
            type:"Pin",
            args:{
                searchTerm:nonNull(stringArg())
            },
            resolve(_parent,{ searchTerm },ctx) {
                return ctx.prisma.pin.findMany({
                    where:{
                        OR:[
                            {
                                title:{
                                    contains: searchTerm
                                }
                            },
                            {
                                description:{
                                    contains:searchTerm
                                }
                            },
                            {
                                category:{
                                    has:searchTerm
                                }
                            }
                        ]
                    }
                })
            }
        })
    }
});

//mutation

export const PinMutation = extendType({
    type:"Mutation",
    definition(t) {
        t.nonNull.field("createPin",{
            type:'Pin',
            args:{
                title:nonNull(stringArg()),
                imageUrl:nonNull(stringArg()),
                description:stringArg(),
                category:list(stringArg()),
                userId:nonNull(stringArg())
                
            },
            async resolve(_parent: any,args: any,ctx: any) {
                if(!ctx.user) {
                    throw new Error("You need to be logged in to perform an action")
                }
                const newPin = {
                    title: args.title,
                    imageUrl: args.imageUrl,
                    category: args.category,
                    description: args.description,
                    userId:args.userId
                }
          
                return await ctx.prisma.pin.create({
                    data:{
                        title:args.title,
                        imageUrl:args.imageUrl,
                        description:args.description,
                        userId:args.userId,
                        categories:{
                            create:[
                                args.category.forEach((item:string)=>{
                                  
                                    return {
                                        category:{
                                            create:{
                                                name:item
                                            }
                                        }
                                    }
                                })
                            ]
                         
                        }
                    },
                })
            }
        })
    },
    
})





