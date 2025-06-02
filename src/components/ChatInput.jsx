import { Flex } from "@radix-ui/themes";
import { AiOutlineEnter } from "react-icons/ai";
import { FiLoader } from "react-icons/fi";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";

import { callAI } from "../util/fetch";

export default function ChatInput({ messages, onSend }) {
  const messageRef = useRef();

  const { mutate, isPending } = useMutation({
    mutationFn: (messages) => callAI(messages),
    onSuccess: ({ role, content }) => onSend({ role, content }),
  });

  function handleSubmit() {
    if (isPending) {
      return;
    }

    const content = messageRef.current?.value || "";
    const role = "user";

    if (content.trim().length) {
      const userMessage = { role, content };

      onSend(userMessage);
      messageRef.current.value = "";

      setTimeout(() => {
        mutate([...messages, userMessage]);
      }, 1000);
    }
  }

  return (
    <Flex
      className="m-4 p-4 lg:mx-auto lg:w-3xl rounded-2xl bg-white"
      align="center"
      gap="2"
    >
      <textarea
        ref={messageRef}
        className="w-full resize-none focus:outline-none"
        placeholder="詢問任何問題"
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSubmit();
          }
        }}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={isPending}
      >
        {isPending ? <FiLoader size="32" /> : <AiOutlineEnter size="32" />}
      </button>
    </Flex>
  );
}
