import { Badge } from "@/components/ui/badge"
import { Gamepad2, Sparkles } from "lucide-react"

export default function GameHeader() {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
          <Gamepad2 className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          AI Chatbot Game Arena
        </h1>
      </div>

      <div className="flex items-center justify-center gap-2">
        <Badge variant="secondary" className="bg-purple-800/50 text-purple-200">
          <Sparkles className="w-3 h-3 mr-1" />
          Powered by AI
        </Badge>
        <Badge variant="secondary" className="bg-blue-800/50 text-blue-200">
          Interactive Gaming
        </Badge>
      </div>
    </header>
  )
}
