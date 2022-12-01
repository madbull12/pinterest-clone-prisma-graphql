// /graphql/context.ts
import { getSession } from 'next-auth/react'
import { PrismaClient } from '@prisma/client'
import prisma from '../lib/prisma'
import { User } from 'next-auth'

export type Context = {
  user?: User
  accessToken?: string
  prisma: PrismaClient
}

export async function createContext({ req,res }:any): Promise<Context> {
  const session = getSession(req);

  if(!session) return { prisma }

  
  return {
   
    prisma,
  }
}