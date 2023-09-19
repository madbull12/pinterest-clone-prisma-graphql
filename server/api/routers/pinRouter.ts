import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { Category, CategoryPayload } from "@prisma/client";
import { TRPCError } from "@trpc/server";

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
        categories: z.array(
          z.object({
            id: z.string(),
            name: z.string(),
          })
        ),
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
  searchPins: publicProcedure
    .input(z.object({ searchTerm: z.string() }))
    .query(({ ctx, input }) => {
      const { searchTerm } = input;
      return ctx.prisma.pin.findMany({
        where: {
          OR: [
            {
              title: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
            {
              categories: {
                some: {
                  name: {
                    contains: searchTerm,
                    mode: "insensitive",
                  },
                },
              },
            },
          ],
        },
      });
    }),
  createdPins: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      const { userId } = input;
      return ctx.prisma.pin.findMany({
        where: {
          userId: userId as string,
        },
        include: {
          user: true,
        },
      });
    }),
  createPin: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1, "Title shouldn't be empty"),
        media: z.string(),
        description: z.string().optional(),
        categories: z.string().array(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = await ctx.session.user.id;
      const newPin = {
        title: input.title,
        media: input.media,
        description: input.description,
      };
      return await ctx.prisma.pin.create({
        include: {
          categories: true,
        },
        data: {
          ...newPin,
          user: {
            connect: {
              id: userId,
            },
          },

          categories: {
            connectOrCreate: input.categories.map((item: string) => ({
              where: {
                name: item.toLowerCase(),
              },
              create: {
                name: item.toLowerCase(),
              },
            })),
          },
        },
      });
    }),
  updatePin: protectedProcedure
    .input(z.object({ title: z.string(), description: z.string().optional(),pinId:z.string() }))
    .mutation(async({ ctx, input }) => {
      const { pinId,title,description } = input;
      const userId = await ctx.session.user.id;
      const isRightUser = (await ctx.prisma.pin.findUnique({
        where:{
          id:pinId
        }
      }))?.userId === userId;

      if(!isRightUser) {
        return new TRPCError({
          code:"FORBIDDEN",
          message:"You have no control over this pin!"
        })
      }

      return await ctx.prisma.pin.update({
        where:{
          id:pinId
        },
        data:{
          title,
          description
        }
      })

    }),
    deletePin:protectedProcedure.input(z.object({ pinId:z.string() })).mutation(({ ctx,input})=>{
      const { pinId } = input;

      return ctx.prisma.pin.delete({
        where:{
          id:pinId
        }
      })
    })
});
