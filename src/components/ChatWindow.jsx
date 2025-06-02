import { Flex } from "@radix-ui/themes";
import { FaArrowDown } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

import Message from "./Message";
import { useIsMutating } from "@tanstack/react-query";

export default function ChatWindow({ messages }) {
  const isMutating = useIsMutating();

  const messageBottomRef = useRef(null);

  useEffect(() => {
    messageBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isMutating]);

  const messagesContainerRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const container = messagesContainerRef.current;

    const checkScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
      setShowScrollButton(!isAtBottom);
    };

    container.addEventListener("scroll", checkScroll);
    return () => container.removeEventListener("scroll", checkScroll);
  }, []);

  function scrollToBottom() {
    messageBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <Flex
        className="px-4 py-8 lg:mx-auto lg:w-3xl h-full overflow-y-auto"
        direction="column"
        align="center"
        ref={messagesContainerRef}
      >
        {messages.map((message, index) => (
          <Message key={index} {...message} />
        ))}
        {isMutating > 0 && <Message role="System" content="AI 正在回覆中…" />}
        <div
          className="bottomDivForScrollIntoView"
          ref={messageBottomRef}
        ></div>
        {showScrollButton && (
          <button
            className="cursor-pointer absolute rounded-full border p-2  bottom-30"
            onClick={scrollToBottom}
          >
            <FaArrowDown size="16px" />
          </button>
        )}
      </Flex>
    </>
  );
}
