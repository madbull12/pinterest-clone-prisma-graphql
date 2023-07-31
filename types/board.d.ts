import { Prisma } from "@prisma/client";

export type BoardWithPayload = Prisma.BoardGetPayload<{
    include:{
        saved:{
            
            include:{
                pin:true
            }
        }
    }
}>