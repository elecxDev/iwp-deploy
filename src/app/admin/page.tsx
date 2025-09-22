"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { FileText, Users, Calendar, Award, MessageSquare, Download, Eye, Send } from "lucide-react"

// Sample data for students and their submissions
const studentsData = [
  { 
    id: 1, 
    name: "Adriel Clinton Maben",
    regno: "2362016",
    branch: "5 BTCS AIML A", 
    company: "Apple",
    internshipTitle: "Quantum Computing Intern",
    startDate: "2025-01-15",
    endDate: "2025-06-15",
    status: "ongoing",
    weeklyReports: 3,
    midTermSubmitted: false,
    finalSubmitted: false,
    averageGrade: "A-",
    lastActivity: "2025-07-10"
  },
  { 
    id: 2, 
    name: "Akhil Alex Aerathu",
    regno: "2362084",
    branch: "5 BTCS AIML A", 
    company: "Google",
    internshipTitle: "AI Research Intern",
    startDate: "2025-01-15",
    endDate: "2025-06-15",
    status: "ongoing",
    weeklyReports: 4,
    midTermSubmitted: true,
    finalSubmitted: false,
    averageGrade: "A",
    lastActivity: "2025-07-11"
  },
  { 
    id: 3, 
    name: "J Abishek Rufus Raj",
    regno: "2362085",
    branch: "5 BTCS AIML A", 
    company: "Microsoft",
    internshipTitle: "Software Engineering Intern",
    startDate: "2025-01-15",
    endDate: "2025-06-15",
    status: "completed",
    weeklyReports: 20,
    midTermSubmitted: true,
    finalSubmitted: true,
    averageGrade: "A+",
    lastActivity: "2025-06-15"
  },
]

interface ChartDataItem {
  name: string;
  value: number;
  color: string;
}

const chartData: ChartDataItem[] = [
  { name: "Ongoing", value: 65, color: "#3b82f6" },
  { name: "Completed", value: 25, color: "#22c55e" },
  { name: "Under Review", value: 10, color: "#f59e0b" },
]

const performanceData = [
  { month: "Jan", reports: 45, grade: 3.8 },
  { month: "Feb", reports: 52, grade: 3.9 },
  { month: "Mar", reports: 48, grade: 3.7 },
  { month: "Apr", reports: 61, grade: 4.0 },
  { month: "May", reports: 55, grade: 3.8 },
  { month: "Jun", reports: 58, grade: 3.9 },
]

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [gradeInput, setGradeInput] = useState("")
  const [feedbackInput, setFeedbackInput] = useState("")
  const [announcementText, setAnnouncementText] = useState("")
  const [meetingDate, setMeetingDate] = useState("")
  const [meetingTime, setMeetingTime] = useState("")
  const [hoveredSegment, setHoveredSegment] = useState<ChartDataItem | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const TabButton = ({ id, label, icon: Icon }: { id: string; label: string; icon: React.ComponentType<{ className?: string }> }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        activeTab === id ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing": return "bg-blue-500"
      case "completed": return "bg-green-500"
      case "under review": return "bg-yellow-500"
      default: return "bg-gray-500"
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        title="Admin"
        subtitle="Dashboard"
        userEmail="admin@christuniversity.in"
      >
        <div className="space-y-2">
          <TabButton id="overview" label="Overview" icon={Users} />
          <TabButton id="students" label="Students" icon={FileText} />
          <TabButton id="reports" label="Reports" icon={FileText} />
          <TabButton id="grades" label="Grades" icon={Award} />
          <TabButton id="meetings" label="Meetings" icon={Calendar} />
        </div>
      </Sidebar>      <div className="flex-1 p-8 overflow-auto custom-scrollbar">
        <div className="bg-white rounded-3xl p-8 h-full shadow-sm border border-gray-100 
          backdrop-blur-sm animate-slide-up">
          
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Header */}
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold gradient-text mb-2">Admin Dashboard</h2>
                <p className="text-gray-600">Manage and oversee the entire internship program</p>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "Total Students", value: "124", change: "+12 this semester", icon: Users },
                  { title: "Pending Reviews", value: "18", change: "Requires attention", icon: FileText },
                  { title: "Average Grade", value: "3.8", change: "Out of 4.0", icon: Award },
                  { title: "Completion Rate", value: "89%", change: "Above target", icon: Calendar }
                ].map((stat, index) => (
                  <div key={index} 
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200
                      hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group
                      animate-fade-in"
                    style={{ animationDelay: `${index * 150}ms` }}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center
                        group-hover:scale-110 transition-transform duration-300">
                        <stat.icon className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="w-3 h-3 rounded-full bg-gray-400 animate-pulse-subtle"></div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-600 font-medium">{stat.change}</p>
                    </div>
                  </div>
                ))}
              </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="relative">
                    <CardHeader>
                      <CardTitle>Internship Status Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div 
                        className="h-64 relative"
                        onMouseMove={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect()
                          setMousePosition({
                            x: e.clientX - rect.left,
                            y: e.clientY - rect.top
                          })
                        }}
                        onMouseLeave={() => setHoveredSegment(null)}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={chartData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={100}
                              dataKey="value"
                              onMouseEnter={(data) => setHoveredSegment(data)}
                              onMouseLeave={() => {}}
                            >
                              {chartData.map((entry, index) => (
                                <Cell 
                                  key={`cell-${index}`} 
                                  fill={entry.color}
                                  style={{
                                    filter: hoveredSegment?.name === entry.name ? 'brightness(1.1)' : 'none',
                                    transform: hoveredSegment?.name === entry.name ? 'scale(1.05)' : 'scale(1)',
                                    transformOrigin: 'center',
                                    transition: 'all 0.2s ease-in-out'
                                  }}
                                />
                              ))}
                            </Pie>
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                        
                        {/* Hover Card */}
                        {hoveredSegment && (
                          <div 
                            className="absolute bg-white border border-gray-300 rounded-lg shadow-xl p-4 pointer-events-none z-10 transform -translate-x-1/2 -translate-y-full min-w-48"
                            style={{
                              left: mousePosition.x,
                              top: mousePosition.y - 10,
                              animation: 'fadeIn 0.2s ease-in-out'
                            }}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div 
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: hoveredSegment.color }}
                              ></div>
                              <h4 className="font-semibold text-sm">{hoveredSegment.name}</h4>
                            </div>
                            <div className="space-y-1 text-xs">
                              <p className="font-medium text-2xl text-gray-900">{hoveredSegment.value}%</p>
                              <p className="text-gray-600 text-sm">
                                {hoveredSegment.name === "Ongoing" ? "124 students currently interning" :
                                 hoveredSegment.name === "Completed" ? "31 students finished internships" :
                                 "12 students under evaluation"}
                              </p>
                              <p className="text-gray-500 text-xs">
                                {hoveredSegment.name === "Ongoing" ? "Expected completion: Aug 2025" :
                                 hoveredSegment.name === "Completed" ? "Average grade: A-" :
                                 "Avg. review time: 3 days"}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={performanceData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="reports" fill="#3b82f6" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Submissions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { student: "Adriel Clinton Maben", type: "Weekly Report #4", time: "2 hours ago", status: "pending" },
                        { student: "Akhil Alex Aerathu", type: "Mid-term Report", time: "5 hours ago", status: "reviewed" },
                        { student: "J Abishek Rufus Raj", type: "Final Presentation", time: "1 day ago", status: "graded" },
                        { student: "Felix Francis", type: "Final Presentation", time: "2 days ago", status: "reviewed" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{item.student}</p>
                            <p className="text-sm text-gray-600">{item.type} • {item.time}</p>
                          </div>
                          <Badge variant={item.status === "pending" ? "warning" : item.status === "reviewed" ? "default" : "success"}>
                            {item.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "students" && (
              <div className="space-y-6">
                <DashboardHeader
                  title="Student Management"
                  searchPlaceholder="Search students..."
                />

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentsData.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-gray-600">{student.regno}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{student.company}</p>
                            <p className="text-sm text-gray-600">{student.internshipTitle}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">{student.startDate}</p>
                            <p className="text-sm text-gray-600">to {student.endDate}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">Reports: {student.weeklyReports}/20</p>
                            <p className="text-sm text-gray-600">
                              Mid: {student.midTermSubmitted ? "✓" : "✗"}, 
                              Final: {student.finalSubmitted ? "✓" : "✗"}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-lg">{student.averageGrade}</span>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(student.status)} text-white`}>
                            {student.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl">
                                <DialogHeader>
                                  <DialogTitle>Student Details - {student.name}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-semibold">Personal Information</h4>
                                      <p>Reg No: {student.regno}</p>
                                      <p>Branch: {student.branch}</p>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold">Internship Details</h4>
                                      <p>Company: {student.company}</p>
                                      <p>Role: {student.internshipTitle}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Recent Submissions</h4>
                                    <div className="space-y-2">
                                      {[1,2,3].map(week => (
                                        <div key={week} className="flex justify-between items-center p-2 border rounded">
                                          <span>Week {week} Report</span>
                                          <div className="flex gap-2">
                                            <Button size="sm" variant="outline">Download</Button>
                                            <Button size="sm">Grade</Button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm">Grade</Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Grade Submission</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <Input placeholder="Grade (A+, A, B+, etc.)" value={gradeInput} onChange={(e) => setGradeInput(e.target.value)} />
                                  <Textarea placeholder="Feedback and comments..." value={feedbackInput} onChange={(e) => setFeedbackInput(e.target.value)} />
                                  <Button className="w-full">Submit Grade & Feedback</Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {activeTab === "reports" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Reports & Submissions</h3>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export All
                    </Button>
                    <Button>Generate Report</Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-center">Weekly Reports</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="text-3xl font-bold text-blue-600">284</div>
                      <p className="text-sm text-gray-600">Total submitted</p>
                      <Button className="mt-4 w-full" variant="outline">View All</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-center">Mid-term Reports</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="text-3xl font-bold text-green-600">89</div>
                      <p className="text-sm text-gray-600">Submitted</p>
                      <Button className="mt-4 w-full" variant="outline">Review Pending</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-center">Final Reports</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="text-3xl font-bold text-purple-600">45</div>
                      <p className="text-sm text-gray-600">Completed</p>
                      <Button className="mt-4 w-full" variant="outline">Grade All</Button>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Pending Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { student: "Adriel Clinton Maben", report: "Week 4 Report", submitted: "2 hours ago", urgent: true },
                        { student: "Felix Francis", report: "Mid-term Report", submitted: "1 day ago", urgent: false },
                        { student: "J Abishek Rufus Raj", report: "Week 3 Report", submitted: "3 days ago", urgent: true },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            {item.urgent && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
                            <div>
                              <p className="font-medium">{item.student}</p>
                              <p className="text-sm text-gray-600">{item.report} • {item.submitted}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button size="sm">Review</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "grades" && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Grade Management</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {["A+", "A", "B+", "B"].map((grade) => (
                    <Card key={grade}>
                      <CardContent className="text-center p-6">
                        <div className="text-2xl font-bold">{grade}</div>
                        <p className="text-sm text-gray-600">
                          {grade === "A+" ? "15" : grade === "A" ? "32" : grade === "B+" ? "28" : "18"} students
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Grade Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { grade: "A+", count: 15, percentage: 16 },
                        { grade: "A", count: 32, percentage: 35 },
                        { grade: "B+", count: 28, percentage: 30 },
                        { grade: "B", count: 18, percentage: 19 },
                      ].map((item) => (
                        <div key={item.grade} className="flex items-center gap-4">
                          <div className="w-12 text-center font-medium">{item.grade}</div>
                          <div className="flex-1 bg-gray-200 rounded-full h-6">
                            <div 
                              className="bg-blue-500 h-6 rounded-full flex items-center justify-end pr-2"
                              style={{ width: `${item.percentage}%` }}
                            >
                              <span className="text-white text-xs">{item.count}</span>
                            </div>
                          </div>
                          <div className="w-16 text-sm text-gray-600">{item.percentage}%</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "meetings" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Meeting Management</h3>
                  <Button>Schedule Group Meeting</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Meetings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { student: "Adriel Clinton Maben", date: "Today", time: "2:30 PM", type: "Weekly Review" },
                          { student: "Akhil Alex Aerathu", date: "Tomorrow", time: "10:00 AM", type: "Mid-term Discussion" },
                          { student: "J Abishek Rufus Raj", date: "Jul 15", time: "3:00 PM", type: "Final Presentation" },
                        ].map((meeting, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">{meeting.student}</p>
                              <p className="text-sm text-gray-600">{meeting.type}</p>
                              <p className="text-sm text-blue-600">{meeting.date} at {meeting.time}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">Reschedule</Button>
                              <Button size="sm">Join</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Meeting Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { student: "Alex Kumar", requested: "2 hours ago", preferredTime: "Any time this week" },
                          { student: "Emma Wilson", requested: "1 day ago", preferredTime: "Friday afternoon" },
                        ].map((request, index) => (
                          <div key={index} className="p-3 border rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <p className="font-medium">{request.student}</p>
                              <span className="text-xs text-gray-500">{request.requested}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{request.preferredTime}</p>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">Decline</Button>
                              <Button size="sm">Schedule</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>

      {/* Right Sidebar - Activity Panel */}
      <div className="w-80 bg-white border-l p-6 flex flex-col">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Activity</h3>
            <span className="text-blue-600 text-sm cursor-pointer">View All</span>
          </div>
          
          <div className="space-y-4">
            {[
              { initial: "AC", title: "Report Submitted", student: "Adriel Clinton", time: "2 hours ago", type: "submission" },
              { initial: "AA", title: "Meeting Requested", student: "Akhil Aerathu", time: "4 hours ago", type: "meeting" },
              { initial: "AR", title: "Grade Updated", student: "Abishek Raj", time: "1 day ago", type: "grade" },
              { initial: "FF", title: "Grade Updated", student: "Felix Francis", time: "1 day ago", type: "submission" },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                  activity.type === "submission" ? "bg-blue-500" : 
                  activity.type === "meeting" ? "bg-green-500" : "bg-purple-500"
                }`}>
                  {activity.initial}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-gray-600">{activity.student}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-auto">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Announcement
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Send Announcement</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                    <select className="w-full border rounded-md px-3 py-2">
                      <option value="all">All Students</option>
                      <option value="active">Active Interns</option>
                      <option value="pending">Pending Evaluations</option>
                      <option value="guides">Faculty Guides</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Announcement</label>
                    <Textarea 
                      placeholder="Type your announcement here..."
                      value={announcementText}
                      onChange={(e) => setAnnouncementText(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <Button 
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      console.log('Sending announcement:', announcementText)
                      setAnnouncementText("")
                    }}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Announcement
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule Faculty Meeting</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Type</label>
                    <select className="w-full border rounded-md px-3 py-2">
                      <option value="">Choose meeting type...</option>
                      <option value="department">Department Meeting</option>
                      <option value="evaluation">Evaluation Board</option>
                      <option value="review">Progress Review</option>
                      <option value="planning">Planning Session</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <Input 
                      type="date" 
                      value={meetingDate}
                      onChange={(e) => setMeetingDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <Input 
                      type="time" 
                      value={meetingTime}
                      onChange={(e) => setMeetingTime(e.target.value)}
                    />
                  </div>
                  <Button 
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      console.log('Scheduling meeting for:', meetingDate, meetingTime)
                      setMeetingDate("")
                      setMeetingTime("")
                    }}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Meeting
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => router.push('/reports/export')}
            >
              <Download className="w-4 h-4 mr-2" />
              Export Reports
            </Button>
            
          </div>
        </div>
      </div>
    </div>
  )
}
