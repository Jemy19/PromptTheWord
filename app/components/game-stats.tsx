"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Heart, Star, RotateCcw } from "lucide-react"

interface GameStatsProps {
  score: number
  level: number
  lives: number
  gameMode: "riddles" | "trivia" | "story"
  onReset: () => void
}

export default function GameStats({ score, level, lives, gameMode, onReset }: GameStatsProps) {
  const progressToNextLevel = score % 100

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-yellow-600 to-orange-700 border-0 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Trophy className="w-5 h-5" />
            Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{score}</div>
          <div className="text-sm opacity-90">Points earned</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 border-0 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Star className="w-5 h-5" />
            Level {level}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progressToNextLevel} className="mb-2" />
          <div className="text-sm opacity-90">{100 - progressToNextLevel} points to next level</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-red-600 to-pink-700 border-0 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Heart className="w-5 h-5" />
            Lives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-1 mb-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart key={i} className={`w-6 h-6 ${i < lives ? "fill-current text-red-400" : "text-gray-500"}`} />
            ))}
          </div>
          <div className="text-sm opacity-90">{lives} remaining</div>
        </CardContent>
      </Card>

      <Card className="bg-black/20 backdrop-blur-sm border-gray-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-lg">Game Mode</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="secondary" className="mb-3 bg-gray-700 text-white">
            {gameMode.charAt(0).toUpperCase() + gameMode.slice(1)}
          </Badge>
          <Button
            onClick={onReset}
            variant="outline"
            className="w-full border-gray-600 text-white hover:bg-gray-800 bg-transparent"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Game
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
