// /graphql/context.ts
import {  getSession } from 'next-auth/react'
import { PrismaClient } from '@prisma/client'
import prisma from '../lib/prisma'
import { DefaultUser, User,Session, unstable_getServerSession } from 'next-auth'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import { NextApiRequest, NextApiResponse } from 'next'

export type Context = {
  user?: DefaultUser;
  accessToken?: string
  prisma: PrismaClient
}



export async function createContext({ req,res }:{req:NextApiRequest,res:NextApiResponse }): Promise<Context> {
  const session = await unstable_getServerSession(req,res,authOptions);
  console.log(session)
  const user = session?.user;


  if(!session) return { prisma }

  
  return {
    user,
    prisma,
  }
}