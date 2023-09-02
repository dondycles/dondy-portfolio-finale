"use client";
import React, { useState, useEffect } from "react";
import { supabaseAdmin } from "@/util/supabase";
import { useChatStore } from "@/store";
type Message = {
  sender: null | string;
  content: null | string;
};

export default function Messages() {
  const chat = useChatStore();
  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    const subscription = supabaseAdmin
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
        },
        (payload) =>
          setMessages((prevMessages: any) => [
            payload.new,
            ...prevMessages.slice(0, 4),
          ])
      )
      .subscribe();

    const fetchMessages = async () => {
      const { data, error } = await supabaseAdmin
        .from("messages")
        .select()
        .eq("chatSession_Id", chat.chatSession_Id as string)
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error fetching messages:", error.message);
        return;
      }

      setMessages(data);
    };

    fetchMessages();

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <div
      className="flex flex-col-reverse w-full"
      onClick={(e) => e.stopPropagation()}
    >
      {messages.map((message: any) => {
        return (
          <React.Fragment key={message.id}>
            {!message.isAdmin ? (
              <div className="chat chat-end ml-auto mr-0">
                <div className="chat-bubble chat-bubble-accent">
                  {message.content}
                </div>
              </div>
            ) : (
              <div className="chat chat-start ml-0 mr-auto">
                <div className="chat-bubble chat-base-100">
                  {message.content}
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
