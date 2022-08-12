// /graphql/resolvers.ts
export const resolvers = {
    Query:{
        pins:(_parent:any,_args:any,ctx:any) => {
            return ctx.prisma.link.findMany();
        }
    }
  }