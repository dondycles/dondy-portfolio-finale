"use client";
import React, { useState, useEffect } from "react";
import { useChatStore } from "@/store";
import {
  DocumentData,
  collection,
  doc,
  limit,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { firestore } from "@/util/firebase";

export default function Messages() {
  const chat = useChatStore();
  const [messages, setMessages] = useState<DocumentData>([]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(
          firestore,
          "chatIds",
          String(chat.chatSession_Id),
          "messages"
        ),
        orderBy("created_at", "asc"),
        limitToLast(5)
      ),
      (message) => {
        setMessages(message.docs.map((m) => m.data()));
      }
    );
    console.log(messages);
  }, []);

  return (
    <div className="flex flex-col w-full" onClick={(e) => e.stopPropagation()}>
      {messages.map((message: any) => {
        return (
          <React.Fragment key={message.id}>
            {!message.isAdmin ? (
              <div className="chat chat-end ml-auto mr-0">
                <div className="chat-bubble chat-bubble-accent">
                  {message.message}
                </div>
              </div>
            ) : (
              <div className="chat chat-start ml-0 mr-auto">
                <div className="chat-bubble chat-base-100">
                  {message.message}
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
