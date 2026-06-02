"use client";

import { Plus } from "lucide-react";

export default function Sidebar({
  chats,
  activeChat,
  setActiveChat
}: any) {

  return (
    <aside className="w-72 border-r">

      <div className="p-4">

        <button
          className="w-full rounded bg-black text-white p-3"
        >
          <Plus size={18} />
          New Chat
        </button>

      </div>

      <div>

        {chats.map((chat:any)=>(
          <button
            key={chat.id}
            onClick={() =>
              setActiveChat(chat.id)
            }
            className="w-full text-left p-3"
          >
            {chat.title}
          </button>
        ))}

      </div>

    </aside>
  );
}
