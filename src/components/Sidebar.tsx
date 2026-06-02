"use client";

import { useEffect, useState } from "react";

type Chat = {
  id: string;
  title: string | null;
  createdAt: string;
};

export default function Sidebar({
  activeChat,
  onSelectChat,
}: {
  activeChat: string | null;
  onSelectChat: (id: string) => void;
}) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  // rename state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");

  // -----------------------------
  // LOAD CHATS
  // -----------------------------
  useEffect(() => {
    const loadChats = async () => {
      const res = await fetch("/api/chats");
      const data = await res.json();
      setChats(data);
      setLoading(false);
    };

    loadChats();
  }, []);

  // -----------------------------
  // GROUP CHATS (TODAY / OLDER)
  // -----------------------------
  const today = new Date().toDateString();

  const grouped = {
    today: chats.filter(
      (c) => new Date(c.createdAt).toDateString() === today
    ),
    older: chats.filter(
      (c) => new Date(c.createdAt).toDateString() !== today
    ),
  };

  // -----------------------------
  // START RENAME
  // -----------------------------
  const startRename = (chat: Chat) => {
    setEditingId(chat.id);
    setNewTitle(chat.title || "New Chat");
  };

  // -----------------------------
  // SAVE RENAME
  // -----------------------------
  const saveRename = async (id: string) => {
    if (!newTitle.trim()) return;

    await fetch(`/api/chat/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle }),
    });

    setChats((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, title: newTitle } : c
      )
    );

    setEditingId(null);
    setNewTitle("");
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="w-64 h-full bg-[#111] text-white p-3 overflow-y-auto border-r border-gray-800">
      <h1 className="text-lg font-bold mb-4">OEDX AI</h1>

      {loading && (
        <p className="text-gray-500 text-sm">Loading chats...</p>
      )}

      {/* TODAY */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">Today</p>

        {grouped.today.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`p-2 rounded cursor-pointer mb-1 flex justify-between items-center ${
              activeChat === chat.id ? "bg-gray-800" : "hover:bg-gray-900"
            }`}
          >
            {editingId === chat.id ? (
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onBlur={() => saveRename(chat.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveRename(chat.id);
                }}
                autoFocus
                className="bg-gray-700 text-white text-sm px-2 py-1 rounded w-full"
              />
            ) : (
              <>
                <span className="text-sm truncate">
                  {chat.title || "New Chat"}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startRename(chat);
                  }}
                  className="text-xs text-gray-400 hover:text-white"
                >
                  ✎
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      {/* OLDER */}
      <div>
        <p className="text-xs text-gray-500 mb-2">Older</p>

        {grouped.older.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`p-2 rounded cursor-pointer mb-1 flex justify-between items-center ${
              activeChat === chat.id ? "bg-gray-800" : "hover:bg-gray-900"
            }`}
          >
            {editingId === chat.id ? (
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onBlur={() => saveRename(chat.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveRename(chat.id);
                }}
                autoFocus
                className="bg-gray-700 text-white text-sm px-2 py-1 rounded w-full"
              />
            ) : (
              <>
                <span className="text-sm truncate">
                  {chat.title || "New Chat"}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startRename(chat);
                  }}
                  className="text-xs text-gray-400 hover:text-white"
                >
                  ✎
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
