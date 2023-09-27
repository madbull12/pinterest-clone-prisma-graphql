import {
    getServerSession,
    type NextAuthOptions,
    type DefaultSession,
  } from "next-auth";
import { type GetServerSidePropsContext } from "next";
import { authOptions } from "../pages/api/auth/[...nextauth]";


export const getServerAuthSession = (ctx: {
    req: GetServerSidePropsContext["req"];
    res: GetServerSidePropsContext["res"];
  }) => {
    return getServerSession(ctx.req, ctx.res, authOptions);
  };
  