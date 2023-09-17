import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { Category, CategoryPayload } from "@prisma/client";

export const pinRouter = createTRPCRouter({
  getAllPins: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.pin.findMany();
  }),
  getPin: publicProcedure
    .input(z.object({ pinId: z.string() }))
    .query(({ ctx, input }) => {
      const { pinId } = input;
      return ctx.prisma.pin.findUnique({
        where: {
          id: pinId,
        },
        include: {
          categories: true,
          comments: {
            include: {
              user: true,
            },
          },
          user: true,
        },
      });
    }),
  getRelatedPins: publicProcedure
    .input(
      z.object({
        categories: z.array(z.object({
          id:z.string(),
          name: z.string(),
        })),
        pinId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      const { categories, pinId } = input;

      return ctx.prisma.pin.findMany({
        where: {
          OR: categories?.map((category) => ({
            categories: {
              some: {
                name: {
                    
                  contains: category.name,
                },
              },
            },
          })),
          NOT: {
            id: pinId,
          },
        },
      });
    }),
    searchPins:publicProcedure.input(z.object({ searchTerm:z.string()})).query(({ ctx,input })=>{
      const { searchTerm } = input;
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
    })
});
