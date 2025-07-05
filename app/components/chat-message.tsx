import { Badge } from "@/components/ui/badge"
import { Bot, User, Sparkles } from "lucide-react"

interface ChatMessageProps {
  message: {
    id: string
    role: "user" | "assistant"
    content: string
  }
  gameMode: "riddles" | "trivia" | "story"
}

export default function ChatMessage({ message, gameMode }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? "bg-gradient-to-r from-blue-500 to-purple-600" : "bg-gradient-to-r from-green-500 to-emerald-600"
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      <div className={`flex-1 max-w-[80%] ${isUser ? "text-right" : "text-left"}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-gray-300">{isUser ? "You" : "AI Game Master"}</span>
          {!isUser && (
            <Badge variant="secondary" className="text-xs bg-gray-700">
              <Sparkles className="w-3 h-3 mr-1" />
              {gameMode}
            </Badge>
          )}
        </div>

        <div
          className={`rounded-lg px-4 py-2 ${
            isUser
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              : "bg-gray-800 text-gray-100 border border-gray-700"
          }`}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    </div>
  )
}
