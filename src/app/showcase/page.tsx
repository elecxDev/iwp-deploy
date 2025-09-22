"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Calendar, Upload, Clock, Star, FileText, Users, BookOpen, CheckCircle } from "lucide-react"

export default function ComponentShowcase() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Design System Colors */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Color Palette</h2>
          <div className="grid grid-cols-8 gap-4">
            <div className="bg-black h-20 rounded-lg flex items-end p-2">
              <span className="text-white text-xs">Black</span>
            </div>
            <div className="bg-gray-50 h-20 rounded-lg border flex items-end p-2">
              <span className="text-gray-800 text-xs">Gray-50</span>
            </div>
            <div className="bg-gray-800 h-20 rounded-lg flex items-end p-2">
              <span className="text-white text-xs">Gray-800</span>
            </div>
            <div className="bg-blue-500 h-20 rounded-lg flex items-end p-2">
              <span className="text-white text-xs">Blue-500</span>
            </div>
            <div className="bg-blue-50 h-20 rounded-lg border flex items-end p-2">
              <span className="text-blue-800 text-xs">Blue-50</span>
            </div>
            <div className="bg-red-500 h-20 rounded-lg flex items-end p-2">
              <span className="text-white text-xs">Red-500</span>
            </div>
            <div className="bg-green-500 h-20 rounded-lg flex items-end p-2">
              <span className="text-white text-xs">Green-500</span>
            </div>
            <div className="bg-yellow-500 h-20 rounded-lg flex items-end p-2">
              <span className="text-white text-xs">Yellow-500</span>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Typography</h2>
          <div className="space-y-4">
            <div className="text-4xl font-bold">Heading 1 - 4xl bold</div>
            <div className="text-2xl font-bold">Heading 2 - 2xl bold</div>
            <div className="text-xl font-semibold">Heading 3 - xl semibold</div>
            <div className="text-base">Body Text - base</div>
            <div className="text-sm text-gray-600">Caption - sm gray-600</div>
            <div className="text-xs text-gray-500">Small Text - xs gray-500</div>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Buttons</h2>
          <div className="flex gap-4 flex-wrap">
            <Button className="bg-black text-white">Primary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Upload className="w-6 h-6" />
              <span className="text-sm">Icon Button</span>
            </Button>
          </div>
        </section>

        {/* Form Elements */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Form Elements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            <Input placeholder="Email address" />
            <Input type="password" placeholder="Password" />
            <Input type="date" />
            <Input type="time" />
          </div>
        </section>

        {/* Cards */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Statistics Card</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">3/4</div>
                <p className="text-xs text-green-600 font-medium">1 pending</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
              <CardHeader>
                <CardTitle>Gradient Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Content with gradient background</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg p-0 overflow-hidden">
              <CardHeader className="bg-black p-5 text-white rounded-none">
                <CardTitle>Special Card</CardTitle>
              </CardHeader>
              <CardContent className="p-left-6">
                <p className="text-gray-600">Card with special header</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Badges */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Badges</h2>
          <div className="flex gap-4 flex-wrap">
            <Badge className="bg-blue-500 text-white">Ongoing</Badge>
            <Badge className="bg-green-500 text-white">Completed</Badge>
            <Badge className="bg-yellow-500 text-white">Under Review</Badge>
            <Badge className="bg-gray-500 text-white">Not Shared</Badge>
          </div>
        </section>

        {/* Avatars */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Avatars</h2>
          <div className="flex gap-4">
            <Avatar className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600">
              <AvatarFallback className="bg-gradient-to-br from-red-500 to-red-600 text-white text-lg font-bold">
                AC
              </AvatarFallback>
            </Avatar>
            <Avatar className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-lg font-bold">
                JA
              </AvatarFallback>
            </Avatar>
          </div>
        </section>

        {/* Progress Bars */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Progress Bars</h2>
          <div className="space-y-4 max-w-md">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Week 3 of 8</span>
                <span className="font-bold text-blue-600">37% Complete</span>
              </div>
              <Progress value={37} className="h-3" />
            </div>
          </div>
        </section>

        {/* Icons */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Icons</h2>
          <div className="grid grid-cols-8 gap-4">
            <div className="flex flex-col items-center gap-2">
              <Calendar className="w-6 h-6" />
              <span className="text-xs">Calendar</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-6 h-6" />
              <span className="text-xs">Upload</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Clock className="w-6 h-6" />
              <span className="text-xs">Clock</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Star className="w-6 h-6" />
              <span className="text-xs">Star</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <FileText className="w-6 h-6" />
              <span className="text-xs">FileText</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Users className="w-6 h-6" />
              <span className="text-xs">Users</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <BookOpen className="w-6 h-6" />
              <span className="text-xs">BookOpen</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              <span className="text-xs">CheckCircle</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
