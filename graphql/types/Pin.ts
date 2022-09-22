import { DateTimeResolver } from "graphql-scalars";
import { objectType,extendType, enumType, nonNull, stringArg, queryField, asNexusMethod, list } from "nexus";  
import { ICategory } from "../../interface";
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
        
        t.nonNull.field("deletePin",{
            type:"Pin",
            args:{
                pinId:nonNull(stringArg())
            },
            async resolve(_parent,{ pinId },ctx) {
                if(!ctx.user) {
                    throw new Error("You need to be logged in to perform an action")
                }

                return await ctx.prisma.pin.delete({
                    where:{
                        id:pinId
                    }
                })
            }
        })
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
                    description: args.description,
                    userId:args.userId
                }

                // const categoryList = await ctx.prisma.category.findMany({
                //     select:{
                //         name:true
                //     }
                // });
                console.log(args.category)

                // const categoryMapped = categoryList.map((category:ICategory)=>{
                //     return category.name;

                // });




                // console.log(categoryList)


          
                return await ctx.prisma.pin.create({
                    data:{
                        ...newPin,
                        categories:{
                            connectOrCreate: args?.category.map((item:string)=>{
                                return {
                                    where:{
                                        name:item
                                    },
                                    create:{
                                        name:item
                                    },
                                
                                }
                                // const categoryExists = categoryList.find((_category:ICategory)=>_category.name === item)
                                // if(categoryExists) {
                                //     return {
                                //         category:{
                                //             connect:{
                                //                 id:categoryExists?.id
                                //             }
                                //         }
                                //     }
                                // } else {
                                //     return {
                                //         category :{
                                //             create:{
                                //                 name:item
                                //             }
                                //         }
                                //     }
                                // }
                                // if(categoryMapped.includes(item)) {
                                //     return {
                                //         category:{
                                            
                                //             connect:{
                                //                 name:item
                                //             }
                                //         }
                                //     }
                                // } else {
                                //     return {
                                //         category:{
                                            
                                //             create:{
                                //                 name:item
                                //             }
                                //         }
                                //     }
                                // }
                       
                            })
                                
                            
                        }
                    },
                })
            }
        })
    },
    
})





