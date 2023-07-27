// /graphql/context.ts
import { GetSessionParams, getSession } from 'next-auth/react'
import { PrismaClient } from '@prisma/client'
import prisma from '../lib/prisma'
import { DefaultUser, User,Session } from 'next-auth'

export type Context = {
  user?: DefaultUser;
  accessToken?: string
  prisma: PrismaClient
}

export async function createContext({ req }:any): Promise<Context> {
  const session = await getSession(req);
  const user = session?.user;


  if(!session) return { prisma }

  
  return {
    user,
    prisma,
  }
}