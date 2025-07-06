"use client"

import React from "react"
import { TextAnimate } from "@/components/magicui/text-animate";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { useState, useEffect } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, RotateCcw, Target, Trophy, X, Youtube, Sun, Mic, ArrowUp } from "lucide-react"
import HowToPlayModal from "./components/how-to-play-modal"

const WORD_LIST = [
  "water",
  "fire",
  "mountain",
  "ocean",
  "rainbow",
  "butterfly",
  "chocolate",
  "music",
  "adventure",
  "mystery",
  "treasure",
  "dragon",
  "castle",
  "forest",
  "magic",
  "dream",
  "thunder",
  "crystal",
  "phoenix",
  "galaxy",
  "whisper",
  "shadow",
  "diamond",
  "sunset",
  "journey",
  "wonder",
  "harmony",
  "freedom",
  "courage",
  "wisdom",
  "serenity",
  "bliss",
]

const MAX_PROMPTS = 10

const TargetWordAnimated = React.memo(function TargetWordAnimated({ word }: { word: string }) {
  return (
    <TextAnimate animation="blurInUp" by="word" className="mb-6">
      {`Target Word: ${word.toUpperCase()}`}
    </TextAnimate>
  );
});

export default function PromptTrapGame() {
  const [targetWord, setTargetWord] = useState("")
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)
  const [gameWon, setGameWon] = useState(false)
  const [gameLost, setGameLost] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [cheatWarning, setCheatWarning] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: "/api/chat",
    onFinish: (message) => {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      const aiResponse = message.content.toLowerCase()
      const targetLower = targetWord.toLowerCase()

      if (aiResponse.includes(targetLower)) {
        setGameWon(true)
        const points = Math.max(100 - (newAttempts - 1) * 10, 10)
        setScore((prev) => prev + points)
      } else if (newAttempts >= MAX_PROMPTS) {
        setGameLost(true)
      }
    },
  })

  const generateNewWord = () => {
    const newWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]
    setTargetWord(newWord)
    setGameWon(false)
    setGameLost(false)
    setAttempts(0)
    setMessages([])
  }

  const nextRound = () => {
    setRound((prev) => prev + 1)
    generateNewWord()
  }

  const resetGame = () => {
    setScore(0)
    setRound(1)
    generateNewWord()
  }

  useEffect(() => {
    generateNewWord()
  }, [])

  // Check if game has started (has messages)
  const gameStarted = messages.length > 0
  const remainingPrompts = MAX_PROMPTS - attempts
  const gameOver = gameWon || gameLost

  // Override handleSubmit to prevent submission when max prompts reached
  const customHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (attempts >= MAX_PROMPTS || gameOver) {
      e.preventDefault()
      return
    }
    // Check for cheating
    if (input.toLowerCase().includes(targetWord.toLowerCase())) {
      e.preventDefault()
      setCheatWarning(true)
      return
    }
    setCheatWarning(false)
    handleSubmit(e)
  }

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 relative">
            <div className="text-xl font-semibold text-gray-900">PROMPT THE WORD</div>
            <div className="flex items-center space-x-3">
              {gameStarted && (
                <div
                  className="
                    absolute left-1/2 top-full mt-2 w-max
                    -translate-x-1/2
                    text-base font-medium text-gray-900
                    bg-white px-3 py-1 rounded shadow
                    z-10
                    text-center
                    max-w-[90vw] truncate
                  "
                >
                  Target Word: {targetWord.toUpperCase()}
                </div>
              )}
              {!gameStarted && <HowToPlayModal />}
            </div>
          </div>
        </div>
      </header>

      {/* Game Won Banner */}
      {gameWon && (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg text-center">
            <Trophy className="w-8 h-8 mx-auto mb-3 text-green-600" />
            <h3 className="text-lg font-medium text-green-900 mb-2">Success!</h3>
            <p className="text-green-700 mb-4">
              You mastered the prompt! AI said "{targetWord}" in {attempts} attempts
              <br />
              <span className="text-sm">+{Math.max(100 - (attempts - 1) * 10, 10)} points</span>
            </p>
            <Button onClick={nextRound} className="bg-green-600 hover:bg-green-700 text-white">
              Next Round
            </Button>
          </div>
        </div>
      )}

      {/* Game Lost Banner */}
      {gameLost && (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="mt-6 p-6 bg-red-50 border border-red-200 rounded-lg text-center">
            <Target className="w-8 h-8 mx-auto mb-3 text-red-600" />
            <h3 className="text-lg font-medium text-red-900 mb-2">Game Over!</h3>
            <p className="text-red-700 mb-4">
              You've used all {MAX_PROMPTS} prompts without getting the AI to say "{targetWord}"
              <br />
              <span className="text-sm">Better luck next time!</span>
            </p>
            <Button onClick={nextRound} className="bg-red-600 hover:bg-red-700 text-white">
              Try Again
            </Button>
          </div>
        </div>
      )}

      {/* Show warning if user tries to cheat */}
      {cheatWarning && (
        <div className="max-w-2xl mx-auto mb-4 mt-16">
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-2 rounded text-center font-medium">
            🚫 Do not cheat! You can't use the target word in your prompt.
          </div>
        </div>
      )}

      {!gameStarted ? (
        /* Initial State - Clean Layout */
        <div className="flex-1 flex flex-col justify-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
            {/* Blue Badge */}
            

            {/* Main Heading */}
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Prompt the Word Guide AI to Guess the Word.</h1>
            <TargetWordAnimated word={targetWord} />
            {/* Input Field */}
            <div className="max-w-3xl mx-auto mb-12">
              <form onSubmit={customHandleSubmit} className="relative">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Describe the word without using it..."
                  className="w-full h-16 pl-6 pr-32 text-lg border-gray-300 rounded-xl focus:border-gray-400 focus:ring-1 focus:ring-gray-400 shadow-sm"
                  disabled={isLoading || gameOver}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  <Button
                    type="submit"
                    disabled={isLoading || !input.trim() || gameOver}
                    className="h-8 w-8 p-0 bg-gray-900 hover:bg-gray-800 rounded-full"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </div>

            {/* Stats */}
            <div className="flex justify-center items-center gap-8">
              <ShinyButton
                onClick={resetGame}
              >
                
                New Word
              </ShinyButton>
            </div>
          </div>
        </div>
      ) : (
        /* Game Started - Chat Layout */
        <>
          <div className="flex-1 overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
              <div className="h-full overflow-y-auto py-6">
                <div className="space-y-8">
                  {messages.map((message) => (
                    <div key={message.id} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {message.role === "user" ? "U" : "AI"}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium text-gray-900">
                            {message.role === "user" ? "You" : "PROMPT MASTER AI"}
                          </span>
                        </div>
                        <div className="text-gray-900 leading-relaxed">
                          {message.content}
                          {message.role === "assistant" &&
                            message.content.toLowerCase().includes(targetWord.toLowerCase()) && (
                              <div className="mt-3 p-3 bg-green-100 border border-green-200 rounded text-sm text-green-800">
                                <Target className="w-4 h-4 inline mr-2" />
                                Target word detected! You mastered the prompt!
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">AI</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center text-gray-500">
                          <div className="animate-pulse w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                          <span className="text-sm">AI is responding...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Input Area */}
          <div className="border-t border-gray-200 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <form onSubmit={customHandleSubmit} className="relative mb-4">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder={gameOver ? "Game Over" : "Message Prompt Master"}
                  className="w-full h-12 pl-4 pr-16 text-base border-gray-300 rounded-lg focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                  disabled={isLoading || gameOver}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  <Button type="button" variant="ghost" size="sm" className="p-2 h-8 w-8">
                    <Mic className="w-4 h-4 text-gray-500" />
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading || !input.trim() || gameOver}
                    className="h-8 w-8 p-0 bg-gray-900 hover:bg-gray-800"
                  >
                    <Send className="w-3 h-3" />
                  </Button>
                </div>
              </form>

              {/* Stats Row */}
              <div className="flex justify-center items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">Score:</span>
                  <span className="font-medium text-gray-900">{score}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">Prompts Left:</span>
                  <span className={`font-medium ${remainingPrompts <= 3 ? "text-red-600" : "text-gray-900"}`}>
                    {remainingPrompts}
                  </span>
                </div>
                <Button
                  onClick={resetGame}
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700 h-6 px-2"
                >
                  <RotateCcw className="w-3 h-3 mr-1" />
                  New Word
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Footer - Only show when not in game mode */}
      {!gameStarted && (
        <footer className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Follow us on</span>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                    <X className="w-4 h-4 text-gray-400" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                    <Youtube className="w-4 h-4 text-gray-400" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                    <Sun className="w-4 h-4 text-gray-400" />
                  </Button>
                </div>
              </div>
              <div className="text-sm text-gray-500">By using Prompt Master you agree to the Terms and Privacy.</div>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}
