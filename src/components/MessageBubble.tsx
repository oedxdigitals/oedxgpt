import MarkdownRenderer from "./MarkdownRenderer";

export default function MessageBubble({ message }: any) {
  return (
    <div
      className={`flex w-full mb-4 ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-md
        ${
          message.role === "user"
            ? "bg-blue-600 text-white"
            : "bg-[#1f1f1f] text-gray-100"
        }`}
      >
        <MarkdownRenderer content={message.content} />

      {message.streaming && (
      <div className="mt-2 flex gap-1">
        <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></span>
        <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce delay-150"></span>
        <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce delay-300"></span>
      </div>
     )}	
      </div>
    </div>
  );
}
