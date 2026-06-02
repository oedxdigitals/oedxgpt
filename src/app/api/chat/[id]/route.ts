import { prisma } from "@/lib/prisma";

export async function GET(
  req:Request,
  { params }:any
){

  const chat =
    await prisma.chat.findUnique({
      where:{
        id:params.id
      },
      include:{
        messages:true
      }
    });

  return Response.json(chat);
}
