"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar, Upload, Clock, CheckCircle, AlertCircle, FileText, Users, Star, BookOpen, Search} from "lucide-react"

// Sample data
const studentData = {
  name: "Adriel Clinton Maben",
  regno: "2362016",
  branch: "5 BTCS AIML A",
  department: "Dept. of AI, ML & DS",
  internshipTitle: "R&D Engineering Intern",
  company: "Google",
  startDate: "2025-04-15",
  endDate: "2025-06-15",
  status: "ongoing",
  weekNumber: 3,
  totalWeeks: 8
}

const milestones = [
  { id: 1, title: "Submit Offer Letter", completed: true, dueDate: "2025-01-10" },
  { id: 2, title: "First Week Report", completed: true, dueDate: "2025-01-22" },
  { id: 3, title: "Mid-term Report", completed: false, dueDate: "2025-03-15" },
  { id: 4, title: "Final Presentation", completed: false, dueDate: "2025-06-10" },
]

const weeklyReports = [
  { week: 1, submitted: true, grade: "A", feedback: "Excellent start!" },
  { week: 2, submitted: true, grade: "A-", feedback: "Good progress" },
  { week: 3, submitted: true, grade: "B+", feedback: "Need more detail" },
  { week: 4, submitted: false, grade: null, feedback: null },
]

const meetings = [
  { id: 1, date: "2025-07-15", time: "2:30 PM", guide: "Dr. Smith", status: "scheduled" },
  { id: 2, date: "2025-07-08", time: "3:00 PM", guide: "Dr. Smith", status: "completed" },
]

export default function StudentDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [newMeetingDate, setNewMeetingDate] = useState("")
  const [newMeetingTime, setNewMeetingTime] = useState("")
  const [weeklyReflection, setWeeklyReflection] = useState("")
  const [attendanceHours, setAttendanceHours] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [reportFilter, setReportFilter] = useState("all")
  const [reportContent, setReportContent] = useState("")

  // Filter reports based on search and filters
  const filteredReports = weeklyReports.filter(report => {
    const matchesSearch = !searchTerm || 
      `Week ${report.week}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (report.feedback && report.feedback.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (report.grade && report.grade.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesFilter = reportFilter === "all" || 
      (reportFilter === "submitted" && report.submitted) ||
      (reportFilter === "pending" && !report.submitted)
    
    return matchesSearch && matchesFilter
  })

  // Filter meetings based on search
  const filteredMeetings = meetings.filter(meeting => {
    return !searchTerm || 
      meeting.guide.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.date.includes(searchTerm) ||
      meeting.status.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing": return "bg-blue-500"
      case "completed": return "bg-green-500"
      case "under review": return "bg-yellow-500"
      case "not shared": return "bg-gray-500"
      default: return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "ongoing": return "Ongoing"
      case "completed": return "Completed"
      case "under review": return "Under Review"
      case "not shared": return "Not Shared"
      default: return status
    }
  }

  const TabButton = ({ id, label, icon: Icon }: { id: string; label: string; icon: React.ComponentType<{ className?: string }> }) => (
    <button
      onClick={() => setSelectedTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        selectedTab === id ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  )

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        title="Student"
        subtitle="Dashboard"
        userEmail="student@gmail.com"
      >
        <div className="space-y-2">
          <TabButton id="overview" label="Overview" icon={BookOpen} />
          <TabButton id="reports" label="Reports" icon={FileText} />
          <TabButton id="meetings" label="Meetings" icon={Users} />
          <TabButton id="milestones" label="Milestones" icon={CheckCircle} />
          <TabButton id="attendance" label="Attendance" icon={Clock} />
        </div>
      </Sidebar>

      <div className="flex-1 p-8 overflow-auto">
        <div className="bg-white rounded-2xl p-8 h-full">
            {/* Student Profile Header */}
            <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 mb-8 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 slide-up">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <Avatar className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105">
                    <AvatarFallback className="bg-gradient-to-br from-red-500 to-red-600 text-white text-xl font-bold">
                      JA
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">{studentData.name}</h2>
                  <p className="text-gray-600 font-medium">Reg No: {studentData.regno}</p>
                  <p className="text-gray-600">{studentData.branch}</p>
                  <p className="text-gray-600">{studentData.department}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-800 mb-1">{studentData.internshipTitle}</p>
                  <p className="text-gray-700 text-lg font-medium">{studentData.company}</p>
                  <p className="text-sm text-gray-500 mb-2">{studentData.startDate} to {studentData.endDate}</p>
                  <Badge className={`${getStatusColor(studentData.status)} text-white shadow-md hover:shadow-lg transition-shadow duration-200`}>
                    {getStatusText(studentData.status)}
                  </Badge>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-6 fade-in">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span className="font-medium">Week {studentData.weekNumber} of {studentData.totalWeeks}</span>
                  <span className="font-bold text-blue-600">{Math.round((studentData.weekNumber / studentData.totalWeeks) * 100)}% Complete</span>
                </div>
                <div className="relative">
                  <Progress value={(studentData.weekNumber / studentData.totalWeeks) * 100} className="h-3 bg-gray-200 rounded-full overflow-hidden" />
                  <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out shadow-sm" 
                       style={{ width: `${(studentData.weekNumber / studentData.totalWeeks) * 100}%` }}></div>
                </div>
              </div>
            </div>

            {/* Tab Content */}
            {selectedTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="group bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 scale-in">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">Reports Submitted</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600 group-hover:text-green-700 transition-colors">3/4</div>
                      <p className="text-xs text-green-600 font-medium">1 pending</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="group bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 scale-in">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">Average Grade</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">A-</div>
                      <p className="text-xs text-gray-600 font-medium">Excellent performance</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="group bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 scale-in">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">Meetings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">7</div>
                      <p className="text-xs text-gray-600 font-medium">Total sessions</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="group bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 scale-in">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">Hours Logged</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">320</div>
                      <p className="text-xs text-gray-600 font-medium">This semester</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card className="border-0 shadow-lg bg-gradient-to-br from-white via-gray-50 to-blue-50 slide-up">
                  <CardHeader className="bg-black text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="h-20 flex-col gap-2 group bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                            <Upload className="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition-colors" />
                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Upload Report</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-2xl border-0 shadow-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-gray-800">Upload Weekly Report</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Input type="file" accept=".pdf,.doc,.docx" className="rounded-lg border-gray-300 focus:border-gray-500 transition-colors" />
                            <Textarea 
                              placeholder="Add comments or notes..." 
                              value={reportContent}
                              onChange={(e) => setReportContent(e.target.value)}
                              className="rounded-lg border-gray-300 focus:border-gray-500 transition-colors" 
                            />
                            <Button 
                              className="w-full bg-black hover:bg-gray-800 text-white transition-all duration-300 rounded-lg"
                              onClick={() => {
                                console.log('Submitting report with content:', reportContent)
                                setReportContent("")
                              }}
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              Submit Report
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="h-20 flex-col gap-2 group bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                            <Calendar className="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition-colors" />
                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Schedule Meeting</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-2xl border-0 shadow-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-gray-800">Request Meeting with Guide</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Input type="date" value={newMeetingDate} onChange={(e) => setNewMeetingDate(e.target.value)} className="rounded-lg border-gray-300 focus:border-gray-500 transition-colors" />
                            <Input type="time" value={newMeetingTime} onChange={(e) => setNewMeetingTime(e.target.value)} className="rounded-lg border-gray-300 focus:border-gray-500 transition-colors" />
                            <Textarea placeholder="Meeting agenda or topics to discuss..." className="rounded-lg border-gray-300 focus:border-gray-500 transition-colors" />
                            <Button 
                              className="w-full bg-black hover:bg-gray-800 text-white transition-all duration-300 rounded-lg"
                              onClick={() => {
                                console.log('Requesting meeting for:', newMeetingDate, newMeetingTime)
                                setNewMeetingDate("")
                                setNewMeetingTime("")
                              }}
                            >
                              <Calendar className="w-4 h-4 mr-2" />
                              Request Meeting
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="h-20 flex-col gap-2 group bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                            <Clock className="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition-colors" />
                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Log Hours</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-2xl border-0 shadow-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-gray-800">Log Work Hours</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Input type="date" className="rounded-lg border-gray-300 focus:border-gray-500 transition-colors" />
                            <Input type="number" placeholder="Hours worked" value={attendanceHours} onChange={(e) => setAttendanceHours(e.target.value)} className="rounded-lg border-gray-300 focus:border-gray-500 transition-colors" />
                            <Textarea placeholder="Describe your work today..." className="rounded-lg border-gray-300 focus:border-gray-500 transition-colors" />
                            <Button 
                              className="w-full bg-black hover:bg-gray-800 text-white transition-all duration-300 rounded-lg"
                              onClick={() => {
                                console.log('Logging hours:', attendanceHours)
                                setAttendanceHours("")
                              }}
                            >
                              <Clock className="w-4 h-4 mr-2" />
                              Log Hours
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="h-20 flex-col gap-2 group bg-white hover:bg-gray-50 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                            <Star className="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition-colors" />
                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Weekly Reflection</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-2xl border-0 shadow-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-gray-800">Weekly Reflection Form</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Textarea 
                              placeholder="What did you learn this week?" 
                              value={weeklyReflection}
                              onChange={(e) => setWeeklyReflection(e.target.value)}
                              className="rounded-lg border-gray-300 focus:border-gray-500 transition-colors"
                            />
                            <Textarea placeholder="What challenges did you face?" className="rounded-lg border-gray-300 focus:border-gray-500 transition-colors" />
                            <Textarea placeholder="Goals for next week?" className="rounded-lg border-gray-300 focus:border-gray-500 transition-colors" />
                            <Button 
                              className="w-full bg-black hover:bg-gray-800 text-white transition-all duration-300 rounded-lg"
                              onClick={() => {
                                console.log('Submitting reflection:', weeklyReflection)
                                setWeeklyReflection("")
                              }}
                            >
                              <Star className="w-4 h-4 mr-2" />
                              Submit Reflection
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {selectedTab === "reports" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Reports & Submissions</h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload New Report
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Upload Report</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <select className="w-full p-2 border rounded">
                          <option>Weekly Report</option>
                          <option>Mid-term Report</option>
                          <option>Final Report</option>
                          <option>Presentation</option>
                        </select>
                        <Input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx" />
                        <Textarea placeholder="Additional comments..." />
                        <Button className="w-full">Submit</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Search and Filter for Reports */}
                <div className="space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search reports by week, grade, or feedback..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border-gray-300 rounded-lg focus:border-gray-500 transition-colors"
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <select
                      value={reportFilter}
                      onChange={(e) => setReportFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-gray-500 transition-colors"
                    >
                      <option value="all">All Reports</option>
                      <option value="submitted">Submitted</option>
                      <option value="pending">Pending</option>
                    </select>
                    
                    <div className="text-sm text-gray-600 flex items-center">
                      Showing {filteredReports.length} of {weeklyReports.length} reports
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  {filteredReports.map((report) => (
                    <Card key={report.week}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">Week {report.week} Report</h4>
                            <p className="text-sm text-gray-600">{report.feedback || "No feedback yet"}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            {report.submitted ? (
                              <Badge variant="success">Submitted</Badge>
                            ) : (
                              <Badge variant="destructive">Pending</Badge>
                            )}
                            {report.grade && (
                              <div className="text-lg font-bold text-blue-600">{report.grade}</div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === "meetings" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Meetings with Guide</h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Calendar className="w-4 h-4 mr-2" />
                        Request Meeting
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Request Meeting</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input type="date" />
                        <Input type="time" />
                        <Textarea placeholder="Meeting agenda..." />
                        <Button className="w-full">Send Request</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Search for Meetings */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search meetings by guide, date, or status..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border-gray-300 rounded-lg focus:border-gray-500 transition-colors"
                  />
                </div>

                <div className="space-y-4">
                  {filteredMeetings.length > 0 ? (
                    filteredMeetings.map((meeting) => (
                    <Card key={meeting.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">Meeting with {meeting.guide}</h4>
                            <p className="text-sm text-gray-600">{meeting.date} at {meeting.time}</p>
                          </div>
                          <Badge variant={meeting.status === "completed" ? "success" : "warning"}>
                            {meeting.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Search className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-500">No meetings found matching your search</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedTab === "milestones" && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Task Checklist & Milestones</h3>
                
                <div className="space-y-4">
                  {milestones.map((milestone) => (
                    <Card key={milestone.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <Checkbox checked={milestone.completed} />
                          <div className="flex-1">
                            <h4 className={`font-semibold ${milestone.completed ? "line-through text-gray-500" : ""}`}>
                              {milestone.title}
                            </h4>
                            <p className="text-sm text-gray-600">Due: {milestone.dueDate}</p>
                          </div>
                          {milestone.completed ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-yellow-500" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === "attendance" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Attendance & Hours Log</h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Clock className="w-4 h-4 mr-2" />
                        Log Hours
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Log Work Hours</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input type="date" />
                        <Input type="number" placeholder="Hours worked" />
                        <Textarea placeholder="Work description..." />
                        <Button className="w-full">Log Hours</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>This Week Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold">32</div>
                        <p className="text-sm text-gray-600">Hours This Week</p>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-sm text-gray-600">Days Present</p>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">320</div>
                        <p className="text-sm text-gray-600">Total Hours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>

      {/* Right Sidebar - Notifications Panel */}
      <div className="w-80 bg-white border-l p-6 flex flex-col">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Notifications</h3>
            <span className="text-blue-600 text-sm cursor-pointer">View All</span>
          </div>
          
          <div className="space-y-4">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
              <p className="text-sm font-medium text-yellow-800">Reminder</p>
              <p className="text-xs text-yellow-700">Submit Week 4 report by Friday</p>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
              <p className="text-sm font-medium text-blue-800">Meeting Scheduled</p>
              <p className="text-xs text-blue-700">Weekly review at 2:30 PM tomorrow</p>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded">
              <p className="text-sm font-medium text-green-800">Grade Updated</p>
              <p className="text-xs text-green-700">Week 3 report graded: B+</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-auto">
          <h3 className="font-semibold mb-4">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Completion</span>
              <span className="text-sm font-semibold">40%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Next Deadline</span>
              <span className="text-sm font-semibold">3 days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Guide Rating</span>
              <span className="text-sm font-semibold">4.8/5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
