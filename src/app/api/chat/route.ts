import { openai } from "@/lib/openai";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { message, chatId } = await req.json();

    let chat;

    if (chatId) {
      chat = await prisma.chat.findUnique({
        where: { id: chatId },
      });
    }

    if (!chat) {
      chat = await prisma.chat.create({
        data: {
          title: message.slice(0, 40),
        },
      });
    }

    await prisma.message.create({
      data: {
        role: "user",
        content: message,
        chatId: chat.id,
      },
    });

    const completion =
      await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      });

    const reply =
      completion.choices[0].message.content || "";

    await prisma.message.create({
      data: {
        role: "assistant",
        content: reply,
        chatId: chat.id,
      },
    });

    return Response.json({
      success: true,
      chatId: chat.id,
      reply,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: "Failed",
      },
      { status: 500 }
    );
  }
}
