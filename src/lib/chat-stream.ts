export async function streamChat(messages: any[], onData: (text: string) => void) {
  const res = await fetch("/api/chat-stream", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });

  const reader = res.body?.getReader();
  const decoder = new TextDecoder();

  if (!reader) return;

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    onData(decoder.decode(value));
  }
}
