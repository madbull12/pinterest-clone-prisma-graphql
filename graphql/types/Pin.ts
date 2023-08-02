import {  Category } from "@prisma/client";
import { DateTimeResolver } from "graphql-scalars";
import {
  objectType,
  extendType,
  enumType,
  nonNull,
  stringArg,
  queryField,
  asNexusMethod,
  list,
} from "nexus";
import { ICategory, IPin } from "../../interface";
import { Comment } from "./Comment";
import { User } from "./User";
import { ObjectDefinitionBlock } from "nexus/dist/core";

const GQLDate = asNexusMethod(DateTimeResolver, "date");

export const Pin = objectType({
  name: "Pin",
  definition(t) {
    t.string("id");
    t.string("createdAt");
    t.string("title");
    t.string("media");
    t.string("description");
    t.list.field<any>("categories", {
      type: "Category",
      async resolve(_parent: any, _args, ctx) {
        return await ctx.prisma.pin
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .categories();
      },
    });
    t.string("userId");
    t.field("user", {
      type: "User",
      async resolve(_parent: any, _args, ctx) {
        return await ctx.prisma.pin
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .user();
      },
    });
    t.list.field<any>("comments", {
      type: Comment,
      async resolve(_parent: any, _args, ctx) {
        return await ctx.prisma.pin
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .comments();
      },
    });
  },
});

export const PinsQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field<any>("pins", {
      type: "Pin",
      resolve(_parent, _args, ctx) {
        return ctx.prisma.pin.findMany();
      },
    });
    t.nonNull.field<any>("pin", {
      type: "Pin",
      args: {
        pinId: nonNull(stringArg()),
      },
      resolve(_parent, { pinId }, ctx) {
        return ctx.prisma.pin.findUnique({
          where: {
            id: pinId,
          },
        });
      },
    });
    t.nonNull.list.field<any>("relatedPins",{
      type:'Pin',
      args:{
        categories:nonNull(list(stringArg())),
        pinId:nonNull(stringArg())
      },
      resolve(_parent, { categories ,pinId },ctx) {
        return ctx.prisma.pin.findMany({
          where:{
           OR:categories?.map((category:string)=>({
              categories:{
                some:{
                  name:{
                    contains:category
                  }
                }
              }
           })),
           NOT:{
            id:pinId
           }
          }
        })
      }
    });
    t.nonNull.list.field<any>("searchPins", {
      type: "Pin",
      args: {
        searchTerm: nonNull(stringArg()),
      },
      resolve(_parent, { searchTerm }, ctx) {
        return ctx.prisma.pin.findMany({
          where: {
            OR: [
              {
                title: {
                  contains: searchTerm,
                  mode:"insensitive"
                },
              },
              {
                description: {
                  contains: searchTerm,
                  mode:"insensitive"
                },
              },
              {
                categories:{
                  some:{
                    name:{
                      contains:searchTerm,
                      mode:"insensitive"
                    }
                  }
                }
              }
            ],
          },
        });
      },
    });
  },
});

//mutation

export const PinMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field<any>("updatePin", {
      type: "Pin",
      args: {
        pinId: nonNull(stringArg()),
        description: stringArg(),
        title: stringArg(),
      },
      async resolve(_parent, { title, description, pinId }, ctx) {
        if(!ctx.user) {
            throw new Error("You need to be logged in to perform an action")
        }

        return await ctx.prisma.pin.update({
          where: {
            id: pinId,
          },
          data: {
            title,
            description,
          },
        });
      },
    });

    t.nonNull.field<any>("deletePin", {
      type: "Pin",
      args: {
        pinId: nonNull(stringArg()),
      },
      async resolve(_parent, { pinId }, ctx) {
        if(!ctx.user) {
            throw new Error("You need to be logged in to perform an action")
        }

        return await ctx.prisma.pin.delete({
          where: {
            id: pinId,
          },
        });
      },
    });
    t.nonNull.field("createPin", {
      type: "Pin",
      args: {
        title: nonNull(stringArg()),
        media: nonNull(stringArg()),
        description: stringArg(),
        categories: list(stringArg()),
        userId: nonNull(stringArg()),
      },
      async resolve(_parent: any, args: any, ctx: any) {
        if(!ctx.user) {
            throw new Error("You need to be logged in to perform an action")
        }

        const newPin = {
          title: args.title,
          media: args.media,
          description: args.description,
          userId: args.userId,
        };

        // const categoryList = await ctx.prisma.category.findMany({
        //     select:{
        //         name:true
        //     }
        // });
        console.log(args.categories);

        // const categoryMapped = categoryList.map((category:ICategory)=>{
        //     return category.name;

        // });

        // console.log(categoryList)

        return await ctx.prisma.pin.create({
          include: {
            categories: true,
          },
          data: {
            ...newPin,

            categories: {
              connectOrCreate:args.categories.map((item:string)=>({
                where:{
                  name:item.toLowerCase()
                },
                create:{
                  name:item.toLowerCase()
                },

              })),
       
                 
                
            },

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
          },
        });
      },
    });
  },
});
