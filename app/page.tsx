"use client"

import React, { useState, useEffect, useRef } from "react"
import { TextAnimate } from "@/components/magicui/text-animate"
import { ShinyButton } from "@/components/magicui/shiny-button"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, RotateCcw, Target, Trophy, ArrowUp } from "lucide-react"
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

const MAX_PROMPTS = 5

const TargetWordAnimated = React.memo(function TargetWordAnimated({ word }: { word: string }) {
  return (
    <TextAnimate animation="blurInUp" by="word" className="mb-6">
      {`Secret Word: ${word.toUpperCase()}`}
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
  const [cheatWarning, setCheatWarning] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: "/api/chat",
    onFinish: (message) => {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      const aiResponse = message.content.toLowerCase()
      const targetLower = targetWord.toLowerCase()

      if (aiResponse.includes(targetLower)) {
        setGameWon(true)
        const points = Math.max(100 - (newAttempts - 1) * 20, 10)
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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isLoading])

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
      <header className="bg-white flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 relative">
            
            {/* Left side (optional, blank to center logo) */}
            <div className="w-1/3" />

            {/* Center logo (only when gameStarted is true) */}
            {gameStarted && (
              <div className="w-1/3 flex justify-center">
                <a href="/"> 
                  <img
                    src="/PWTNOBGV1.png"
                    alt="Logo"
                    className="h-[40px] sm:h-[80px] lg:h-[60px] w-auto pointer-events-none select-none"
                  />
                </a>
              </div>
            )}

            {/* Right side (Secret Word) */}
            <div className="w-1/3 flex justify-end">
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
                  Secret Word: {targetWord.toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>


      {/* Game Won Banner */}
      {gameWon && (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 w-full flex-shrink-0">
          <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg text-center">
            <Trophy className="w-8 h-8 mx-auto mb-3 text-green-600" />
            <h3 className="text-lg font-medium text-green-900 mb-2">Success!</h3>
            <p className="text-green-700 mb-4">
              You mastered the prompt! AI said "{targetWord}" in {attempts} attempts
              <br />
              <span className="text-sm">+{Math.max(100 - (attempts - 1) * 20, 10)} points</span>
            </p>
            {/* Play Again for now update to next round later */}
            <Button onClick={nextRound} className="bg-green-600 hover:bg-green-700 text-white">
              Play Again
            </Button>
          </div>
        </div>
      )}

      {/* Game Lost Banner */}
      {gameLost && (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 w-full flex-shrink-0">
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
        <div className="max-w-2xl mx-auto mb-4 mt-16 flex-shrink-0">
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-2 rounded text-center font-medium">
            🚫 Do not cheat! You can't use the secret word in your prompt.
          </div>
        </div>
      )}

      {!gameStarted ? (
        /* Initial State - Clean Layout */
        <div className="flex-1 flex flex-col justify-center relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[75%] w-full">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
              {/* Logo */}
              <div className="mb-1">
                <img
                  src="/PWTNOBGV1.png"
                  alt="Logo"
                  className="w-auto h-[100px] sm:h-[130px] lg:h-[130px] mx-auto pointer-events-none select-none"
                />
              </div>
              {/* Main Heading */}
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Help AI Guess the Secret Word.</h1>
              <TargetWordAnimated word={targetWord} />
              {/* Input Field */}
              <div className="max-w-3xl mx-auto mb-6">
                <form onSubmit={customHandleSubmit} className="relative">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Describe the secret word without using it..."
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
            </div>

            {/* Stats */}
            <div className="flex justify-center items-center gap-8">
              <ShinyButton
                onClick={resetGame}
              >
                
                New Word
              </ShinyButton>
              {!gameStarted && <HowToPlayModal />}
            </div>
          </div>
        </div>
      ) : (
        /* Game Started - Chat Layout */
        <>
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Added padding-bottom to account for fixed input (120px) */}
                <div className="py-6 pb-32 space-y-8">
                  {messages.map((message) => {
                    const isUser = message.role === "user";
                    return (
                      <div
                        key={message.id}
                        className={`flex gap-4 ${isUser ? "flex-row" : "flex-row-reverse"}`}
                      >
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">
                              {isUser ? "U" : "AI"}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`flex items-center gap-2 mb-2 ${isUser ? "justify-start" : "justify-end"}`}>
                            <span className="text-sm font-medium text-gray-900">
                              {isUser ? "You" : "PTW AI"}
                            </span>
                          </div>
                          <div className={`text-gray-900 leading-relaxed ${isUser ? "text-left" : "text-right"}`}>
                            {message.content}
                            {message.role === "assistant" &&
                              message.content.toLowerCase().includes(targetWord.toLowerCase()) && (
                                <div className="mt-3 p-3 bg-green-100 border border-green-200 rounded text-sm text-green-800">
                                  <Target className="w-4 h-4 inline mr-2" />
                                  Secret word detected! You mastered the prompt!
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {isLoading && (
                    <div className="flex gap-4 flex-row-reverse"> {/* Changed flex-row to flex-row-reverse here */}
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">AI</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center text-gray-500 justify-end"> {/* Added justify-end here */}
                          <div className="animate-pulse w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                          <span className="text-sm">AI is responding...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            </div>
          </div>
          {/* Bottom Input Area */}
          <div className="fixed bottom-0 left-0 w-full bg-white z-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <form onSubmit={customHandleSubmit} className="relative mb-4">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder={gameOver ? "Game Over" : "Describe the secret word without using it..."}
                  className="w-full h-12 pl-4 pr-16 text-base border-gray-300 rounded-lg focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                  disabled={isLoading || gameOver}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
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
        <footer className="fixed bottom-0 left-0 w-full bg-white z-10 border-t border-gray-200">
          <div className="grid grid-cols-3 items-center w-full px-4 sm:px-6 lg:px-8 py-3">
            
            {/* Column 1: Far Left */}
            <div className="text-xs text-gray-500 text-left">
              Created by{" "}
              <a
                href="https://ajbg.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gray-700 hover:underline"
              >
                Jeremy Gellido
              </a>
            </div>

            {/* Column 2: Center */}
            <div className="text-xs text-gray-500 text-center">
              By using Prompt The Word you agree to the{" "}
              <a href="#" className="font-medium hover:underline text-gray-700">Terms</a> and{" "}
              <a href="#" className="font-medium hover:underline text-gray-700">Privacy</a>.
            </div>

            {/* Column 3: Far Right (This is empty but ensures the center column is perfectly centered) */}
            <div className="text-right">
              {/* You could add content here if needed */}
            </div>
            
          </div>
        </footer>
      )}
    </div>
  )
}
