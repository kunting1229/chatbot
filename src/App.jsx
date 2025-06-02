import { Flex, Theme } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import Header from "./components/Header";
import { queryClient } from "./util/fetch";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const localStorageMessages = localStorage.getItem("react-chatbot-messages");

    if (localStorageMessages) {
      setMessages(JSON.parse(localStorageMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("react-chatbot-messages", JSON.stringify(messages));
  }, [messages]);

  function handleSubmit(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Theme>
        <Flex className="h-screen bg-gray-100" direction="column">
          <Header />
          <ChatWindow messages={messages} />
          <ChatInput messages={messages} onSend={handleSubmit} />
        </Flex>
      </Theme>
    </QueryClientProvider>
  );
}

export default App;
