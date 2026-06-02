import { prisma } from "@/lib/prisma";

/**
 * GET /api/chat/:id
 * Fetch a single chat with messages
 */
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const chat = await prisma.chat.findUnique({
      where: { id: params.id },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!chat) {
      return new Response(JSON.stringify({ error: "Chat not found" }), {
        status: 404,
      });
    }

    return Response.json(chat);
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch chat" }),
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/chat/:id
 * Update chat metadata (title, etc.)
 */
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { title } = body;

    if (!title) {
      return new Response(JSON.stringify({ error: "Title is required" }), {
        status: 400,
      });
    }

    const updatedChat = await prisma.chat.update({
      where: { id: params.id },
      data: {
        title,
      },
    });

    return Response.json(updatedChat);
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to update chat" }),
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/chat/:id
 * Optional but useful for production cleanup
 */
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.message.deleteMany({
      where: { chatId: params.id },
    });

    await prisma.chat.delete({
      where: { id: params.id },
    });

    return Response.json({ success: true });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to delete chat" }),
      { status: 500 }
    );
  }
}
