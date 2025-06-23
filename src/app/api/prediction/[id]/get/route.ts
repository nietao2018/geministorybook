import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "@/lib/db";
import { NextResponse } from 'next/server';
import { auth } from "@/auth";

export async function GET(request: Request, { params }: { params: { id: string } }) {

  const authFlag = request?.query?.auth

  const session = await auth();
  if (!session?.user && !!authFlag) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = params;
    const prediction = await prisma.prediction.findUnique({
      where: {
        id: id,
      },
    });
    
    if (!prediction) {
      return new Response("Studio not found or not owned by user", { status: 404 }); 
    }
    return new Response(JSON.stringify(prediction), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error querying prediction:', error);
    return new Response("Internal server error", { status: 500 }); 
  }
}