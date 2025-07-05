"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Target, MessageCircle, Lightbulb, Users, HelpCircle, Trophy } from "lucide-react"

export default function HowToPlayModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 bg-white border border-gray-300">
          <HelpCircle  className="w-4 h-4 mr-2" />
          How to Play
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">How to Play Prompt Master</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="text-gray-600">
            You are given a secret target word (e.g., "water"). Your task is to prompt the AI in a way that it naturally
            says the target word in its response — without giving the word directly or making it too obvious.
          </div>

          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
              <Trophy className="w-5 h-5 mr-2" />🔹 Example Round
            </h3>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Target word:</strong> Water
              </p>
              <p>
                <strong>User prompt:</strong> "What do most people drink when they wake up in the morning?"
              </p>
              <p>
                <strong>AI response:</strong> "Most people drink water or coffee after waking up."
              </p>
              <p className="text-green-600 font-semibold">✅ You win!</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">🔹 Game Rules (Basic Version)</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <Target className="w-5 h-5 text-green-600 mr-2" />
                  <div className="font-medium text-gray-900">Basic Rules</div>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• A target word is chosen (secretly shown to the human player).</li>
                  <li>• The player writes a prompt to the AI.</li>
                  <li>• If the AI's first response includes the word, the player wins that round.</li>
                  <li>• Set a max number of prompts or add scoring based on difficulty (common vs rare words).</li>
                </ul>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <Lightbulb className="w-5 h-5 text-purple-600 mr-2" />
                  <div className="font-medium text-gray-900">Scoring System</div>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Fewer attempts = Higher score</li>
                  <li>• First attempt: 100 points</li>
                  <li>• Each additional attempt: -10 points</li>
                  <li>• Minimum score per round: 10 points</li>
                  <li>• Optional: Scoring based on word difficulty (common vs rare words)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center mb-2">
                <MessageCircle className="w-5 h-5 text-orange-600 mr-2" />
                <div className="font-medium text-gray-900">Strategy Tips</div>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Ask about related topics or contexts</li>
                <li>• Create scenarios where the word naturally appears</li>
                <li>• Use "what", "how", or "why" questions</li>
                <li>• Think about when people use that word</li>
              </ul>
            </div>

            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-center mb-2">
                <Users className="w-5 h-5 text-red-600 mr-2" />
                <div className="font-medium text-gray-900">What NOT to Do</div>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Don't ask for the word directly</li>
                <li>• Don't spell out the word</li>
                <li>• Don't make it too obvious</li>
                <li>• Avoid saying "the word is..." or similar</li>
              </ul>
            </div>
          </div>

          <div className="text-sm text-gray-500 text-center">
            <strong>Goal:</strong> Master the art of crafting clever prompts to get the AI to naturally say your target
            word!
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
