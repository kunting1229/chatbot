import { Flex, Text } from "@radix-ui/themes";

export default function Message({ content, role }) {
  return (
    <Flex className="py-4 w-full" justify={role === "user" ? "end" : ""}>
      <Text
        className={`px-4 py-2 rounded-lg max-w-xs whitespace-pre-wrap ${
          role === "user"
            ? "bg-blue-500 text-white"
            : "bg-white text-gray-800 shadow"
        }`}
      >
        {content}
      </Text>
    </Flex>
  );
}
