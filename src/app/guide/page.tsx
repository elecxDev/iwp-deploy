"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Search, Filter, SortAsc, SortDesc, X, Calendar, MessageSquare, FileText, Send, Users, Award, Eye, Download, AlertCircle, Plus } from "lucide-react"

// Sample data for students under guide
const studentsData = [
  { 
    id: 1, 
    name: "Adriel Clinton Maben", 
    studentId: "2362016", 
    program: "5 BTCS AIML A",
    department: "Dept. of AI, ML & DS",
    internship: "Quantum Computing Intern",
    company: "Apple",
    status: "approved" // green
  },
  { 
    id: 2, 
    name: "J Abishek Rufus Raj", 
    studentId: "2362083", 
    program: "5 BTCS AIML A",
    department: "Dept. of AI, ML & DS",
    internship: "Quantum Computing Intern",
    company: "Apple",
    status: "pending" // yellow
  },
  { 
    id: 3, 
    name: "Tom Kattampally", 
    studentId: "2362016", 
    program: "5 BTCS AIML A",
    department: "Dept. of AI, ML & DS",
    internship: "Quantum Computing Intern",
    company: "Apple",
    status: "approved" // green
  },
  { 
    id: 4, 
    name: "Akhil Alex Aerathu", 
    studentId: "2362021", 
    program: "5 BTCS AIML A",
    department: "Dept. of AI, ML & DS",
    internship: "Quantum Computing Intern",
    company: "Apple",
    status: "rejected" // red
  },
  { 
    id: 5, 
    name: "Felix Francis Thekkekara", 
    studentId: "2362069", 
    program: "5 BTCS AIML A",
    department: "Dept. of AI, ML & DS",
    internship: "Quantum Computing Intern",
    company: "Apple",
    status: "approved" // green
  },
  { 
    id: 6, 
    name: "Melwin Robinson", 
    studentId: "2362112", 
    program: "5 BTCS AIML A",
    department: "Dept. of AI, ML & DS",
    internship: "Quantum Computing Intern",
    company: "Apple",
    status: "rejected" // red
  },
  { 
    id: 7, 
    name: "Shreenidhi P L", 
    studentId: "2362083", 
    program: "5 BTCS AIML A",
    department: "Dept. of AI, ML & DS",
    internship: "Quantum Computing Intern",
    company: "Apple",
    status: "pending" // yellow
  },
  { 
    id: 8, 
    name: "Abhishek Anil George", 
    studentId: "2362005", 
    program: "5 BTCS AIML A",
    department: "Dept. of AI, ML & DS",
    internship: "Quantum Computing Intern",
    company: "Apple",
    status: "pending" // yellow
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "border-green-500 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
    case "rejected":
      return "border-red-500 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
    case "pending":
      return "border-yellow-500 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 hover:text-yellow-800"
    default:
      return "border-gray-500 bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-800"
  }
}

export default function GuideDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [showFilters, setShowFilters] = useState(false)
  const [meetingDate, setMeetingDate] = useState("")
  const [meetingTime, setMeetingTime] = useState("")
  const [messageText, setMessageText] = useState("")

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

  // Filter and sort students based on search and filters
  const filteredAndSortedStudents = studentsData
    .filter(student => {
      const matchesSearch = 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.internship.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === "all" || student.status === statusFilter
      
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      let aValue, bValue
      
      switch (sortBy) {
        case "name":
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
        case "status":
          aValue = a.status
          bValue = b.status
          break
        case "company":
          aValue = a.company.toLowerCase()
          bValue = b.company.toLowerCase()
          break
        case "studentId":
          aValue = a.studentId
          bValue = b.studentId
          break
        default:
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
      }
      
      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        title="Guide"
        subtitle="Dashboard"
        userEmail="guide@christuniversity.in"
      >
        <div className="space-y-2">
          <TabButton id="overview" label="Overview" icon={Users} />
          <TabButton id="students" label="My Students" icon={Users} />
          <TabButton id="reports" label="Reports" icon={FileText} />
          <TabButton id="meetings" label="Meetings" icon={Calendar} />
          <TabButton id="feedback" label="Feedback" icon={MessageSquare} />
        </div>
      </Sidebar>

      <div className="flex-1 p-8 overflow-auto">
        <div className="bg-white rounded-3xl p-8 min-h-full shadow-sm border border-gray-100 
          backdrop-blur-sm animate-slide-up">
          
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Header */}
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold gradient-text mb-2">Guide Dashboard</h2>
                <p className="text-gray-600">Monitor and guide your students through their internship journey</p>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "My Students", value: "8", change: "Active interns", icon: Users },
                  { title: "Pending Reviews", value: "3", change: "Need attention", icon: AlertCircle },
                  { title: "Meetings This Week", value: "5", change: "Scheduled", icon: Calendar },
                  { title: "Average Progress", value: "78%", change: "Overall completion", icon: Award }
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

              {/* Student Progress Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-semibold mb-4">My Students</h3>
                  <div className="space-y-3">
                    {studentsData.map((student) => (
                      <div key={student.id} className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${getStatusColor(student.status)}`}>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                            <AvatarFallback className="font-semibold">{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-gray-900">{student.name}</p>
                            <p className="text-sm text-gray-600">{student.studentId} • {student.program}</p>
                            <p className="text-sm text-gray-600">{student.department}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">{student.internship}</p>
                            <p className="text-sm text-gray-600">{student.company}</p>
                          </div>
                          <div className={`w-4 h-4 rounded-full ${
                            student.status === "approved" ? "bg-green-500" : 
                            student.status === "pending" ? "bg-yellow-500" : 
                            student.status === "rejected" ? "bg-red-500" : "bg-gray-500"
                          }`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { student: "Adriel Clinton", action: "Submitted Week 4 Report", time: "2 hours ago", type: "submission" },
                        { student: "Felix Francis", action: "Requested Meeting", time: "5 hours ago", type: "meeting" },
                        { student: "Abishek Raj", action: "Submitted Mid-term", time: "1 day ago", type: "submission" },
                        { student: "Akhil Aerathu", action: "Updated Progress", time: "2 days ago", type: "update" }
                      ].map((activity, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            activity.type === "submission" ? "bg-blue-500" : 
                            activity.type === "meeting" ? "bg-green-500" : "bg-purple-500"
                          }`}></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.student}</p>
                            <p className="text-xs text-gray-600">{activity.action}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Remove the additional section */}
            </div>
          )}

          {activeTab === "students" && (
            <div className="space-y-6">
              <DashboardHeader
                title="My Students"
                searchPlaceholder="Search students..."
              />

              {/* Search and Filters */}
              <div className="mb-6 space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search by name, ID, company, or internship..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border-gray-300 rounded-lg focus:border-gray-500 transition-colors"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Filters Row */}
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2"
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                    {((searchTerm ? 1 : 0) + (statusFilter !== "all" ? 1 : 0)) > 0 && (
                      <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-xs">
                        {(searchTerm ? 1 : 0) + (statusFilter !== "all" ? 1 : 0)}
                      </Badge>
                    )}
                  </Button>

                  {/* Status Filter */}
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-gray-500 transition-colors"
                  >
                    <option value="all">All Status</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>

                  {/* Sort Options */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-gray-500 transition-colors"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="studentId">Sort by ID</option>
                    <option value="status">Sort by Status</option>
                    <option value="company">Sort by Company</option>
                  </select>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                    className="flex items-center gap-2"
                  >
                    {sortOrder === "asc" ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                    {sortOrder === "asc" ? "A-Z" : "Z-A"}
                  </Button>
                </div>
              </div>

              {/* Students Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead>Internship</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-gray-600">{student.studentId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{student.program}</p>
                          <p className="text-sm text-gray-600">{student.department}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{student.company}</p>
                          <p className="text-sm text-gray-600">{student.internship}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(student.status)}>
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={student.status === "approved" ? 75 : student.status === "pending" ? 50 : 25} className="w-16" />
                          <span className="text-sm text-gray-600">
                            {student.status === "approved" ? "75%" : student.status === "pending" ? "50%" : "25%"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Student Details - {student.name}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Personal Information</h4>
                                    <p><strong>Name:</strong> {student.name}</p>
                                    <p><strong>Student ID:</strong> {student.studentId}</p>
                                    <p><strong>Program:</strong> {student.program}</p>
                                    <p><strong>Department:</strong> {student.department}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Internship Details</h4>
                                    <p><strong>Company:</strong> {student.company}</p>
                                    <p><strong>Role:</strong> {student.internship}</p>
                                    <p><strong>Status:</strong> 
                                      <Badge className={`ml-2 ${getStatusColor(student.status)}`}>
                                        {student.status}
                                      </Badge>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button size="sm" onClick={() => setActiveTab("meetings")}>
                            Schedule
                          </Button>
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
                <h3 className="text-xl font-semibold">Student Reports</h3>
                <Button>
                  <Download className="w-4 h-4 mr-2" />
                  Export All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">Weekly Reports</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-blue-600">42</div>
                    <p className="text-sm text-gray-600">Submitted this month</p>
                    <Button className="mt-4 w-full" variant="outline">Review All</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">Pending Reviews</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-orange-600">5</div>
                    <p className="text-sm text-gray-600">Need your attention</p>
                    <Button className="mt-4 w-full" variant="outline">Review Now</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">Graded Reports</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-green-600">37</div>
                    <p className="text-sm text-gray-600">Completed reviews</p>
                    <Button className="mt-4 w-full" variant="outline">View All</Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { student: "Adriel Clinton Maben", report: "Week 4 Report", submitted: "2 hours ago", status: "pending" },
                      { student: "Felix Francis", report: "Mid-term Report", submitted: "1 day ago", status: "reviewed" },
                      { student: "Abishek Raj", report: "Week 3 Report", submitted: "3 days ago", status: "pending" },
                      { student: "Akhil Aerathu", report: "Week 2 Report", submitted: "5 days ago", status: "graded" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{item.student}</p>
                          <p className="text-sm text-gray-600">{item.report} • {item.submitted}</p>
                        </div>
                        <div className="flex gap-2 items-center">
                          <Badge variant={item.status === "pending" ? "warning" : item.status === "reviewed" ? "default" : "success"}>
                            {item.status}
                          </Badge>
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

          {activeTab === "meetings" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Meeting Management</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Schedule Meeting
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Schedule New Meeting</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Student</label>
                        <select className="w-full border rounded-md px-3 py-2">
                          <option value="">Select a student...</option>
                          {studentsData.filter(s => s.status === "approved").map(student => (
                            <option key={student.id} value={student.id}>{student.name}</option>
                          ))}
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
                      <Button className="w-full">Schedule Meeting</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Meetings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { student: "Adriel Clinton Maben", date: "Today", time: "2:30 PM", type: "Weekly Review", status: "confirmed" },
                        { student: "Felix Francis", date: "Tomorrow", time: "10:00 AM", type: "Progress Check", status: "pending" },
                        { student: "Abishek Raj", date: "Jul 15", time: "3:00 PM", type: "Mid-term", status: "confirmed" },
                      ].map((meeting, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{meeting.student}</p>
                            <p className="text-sm text-gray-600">{meeting.type}</p>
                            <p className="text-sm text-blue-600">{meeting.date} at {meeting.time}</p>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant={meeting.status === "confirmed" ? "success" : "warning"}>
                              {meeting.status}
                            </Badge>
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
                        { student: "Akhil Aerathu", requested: "2 hours ago", preferredTime: "Any time this week", reason: "Discuss project challenges" },
                        { student: "Melwin Robinson", requested: "1 day ago", preferredTime: "Friday afternoon", reason: "Mid-term preparation" },
                      ].map((request, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <p className="font-medium">{request.student}</p>
                            <span className="text-xs text-gray-500">{request.requested}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{request.reason}</p>
                          <p className="text-sm text-gray-600 mb-3">Preferred: {request.preferredTime}</p>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Decline</Button>
                            <Button size="sm">Accept & Schedule</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "feedback" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Student Feedback & Communication</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Send Message to Student</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Recipient</label>
                        <select className="w-full border rounded-md px-3 py-2">
                          <option value="">Select a student...</option>
                          {studentsData.map(student => (
                            <option key={student.id} value={student.id}>{student.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                        <Input placeholder="Enter message subject..." />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                        <Textarea 
                          placeholder="Type your message here..."
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          rows={4}
                        />
                      </div>
                      <Button className="w-full">Send Message</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Messages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { student: "Adriel Clinton", subject: "Report Feedback", preview: "Great work on the weekly report...", time: "1 hour ago", unread: false },
                        { student: "Felix Francis", subject: "Meeting Request", preview: "I would like to schedule a meeting...", time: "3 hours ago", unread: true },
                        { student: "Abishek Raj", subject: "Project Update", preview: "I've completed the second phase...", time: "1 day ago", unread: false },
                      ].map((message, index) => (
                        <div key={index} className={`p-3 border rounded-lg ${message.unread ? 'bg-blue-50 border-blue-200' : ''}`}>
                          <div className="flex justify-between items-start mb-1">
                            <p className="font-medium">{message.student}</p>
                            <span className="text-xs text-gray-500">{message.time}</span>
                          </div>
                          <p className="text-sm font-medium mb-1">{message.subject}</p>
                          <p className="text-sm text-gray-600">{message.preview}</p>
                          {message.unread && (
                            <div className="flex justify-end mt-2">
                              <Badge variant="default" className="text-xs">New</Badge>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Feedback Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Positive Feedback</span>
                        <Badge variant="success">85%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Improvement Areas</span>
                        <Badge variant="warning">15%</Badge>
                      </div>
                      <div className="pt-4 border-t">
                        <h4 className="font-semibold mb-2">Common Feedback Topics</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Code Quality</span>
                            <span className="text-gray-600">12 mentions</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Communication</span>
                            <span className="text-gray-600">8 mentions</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Time Management</span>
                            <span className="text-gray-600">5 mentions</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
