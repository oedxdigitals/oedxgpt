"use client";

import { useEffect,useState }
from "react";

import Sidebar
from "@/components/Sidebar";

import Header
from "@/components/Header";

export default function ChatPage(){

  const [chats,setChats] =
    useState([]);

  const [activeChat,
    setActiveChat] =
    useState("");

  useEffect(()=>{

    fetch("/api/chats")
      .then(r=>r.json())
      .then(setChats);

  },[]);

  return (

    <div
      className="
      flex
      h-screen
      "
    >

      <Sidebar
        chats={chats}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
      />

      <div
        className="
        flex-1
        flex
        flex-col
        "
      >

        <Header />

        Chat Window Here

      </div>

    </div>

  );
}
