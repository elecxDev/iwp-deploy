"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, FileText, Filter, Calendar, User, Star } from "lucide-react"

const reportsData = [
  { 
    id: 1, 
    student: "Adriel Clinton Maben", 
    type: "Weekly Report #4", 
    date: "2024-01-15", 
    status: "submitted",
    grade: "A",
    size: "2.3 MB"
  },
  { 
    id: 2, 
    student: "Akhil Alex Aerathu", 
    type: "Mid-term Report", 
    date: "2024-01-12", 
    status: "reviewed",
    grade: "B+",
    size: "4.1 MB"
  },
  { 
    id: 3, 
    student: "J Abishek Rufus Raj", 
    type: "Final Presentation", 
    date: "2024-01-10", 
    status: "graded",
    grade: "A-",
    size: "15.2 MB"
  },
  { 
    id: 4, 
    student: "Felix Francis", 
    type: "Weekly Report #3", 
    date: "2024-01-08", 
    status: "submitted",
    grade: "-",
    size: "1.8 MB"
  },
  { 
    id: 5, 
    student: "David Wilson", 
    type: "Progress Report", 
    date: "2024-01-05", 
    status: "under_review",
    grade: "-",
    size: "3.5 MB"
  }
]

export default function ReportsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("")

  const filteredReports = reportsData.filter(report => {
    const matchesSearch = 
      report.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.type.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    const matchesDate = !dateFilter || report.date.includes(dateFilter)
    
    return matchesSearch && matchesStatus && matchesDate
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Submitted</Badge>
      case "reviewed":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Reviewed</Badge>
      case "graded":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Graded</Badge>
      case "under_review":
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Under Review</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const exportReports = () => {
    console.log('Exporting reports:', filteredReports)
    // Simulate CSV export
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Student,Report Type,Date,Status,Grade,Size\n" +
      filteredReports.map(report => 
        `${report.student},${report.type},${report.date},${report.status},${report.grade},${report.size}`
      ).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "internship_reports.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => router.back()}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reports Management</h1>
              <p className="text-gray-600 mt-1">Review and export student reports</p>
            </div>
          </div>
          
          <Button 
            onClick={exportReports}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export All</span>
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <Input
                  placeholder="Search student or report type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="all">All Status</option>
                  <option value="submitted">Submitted</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="graded">Graded</option>
                  <option value="under_review">Under Review</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <Input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("")
                    setStatusFilter("all")
                    setDateFilter("")
                  }}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reports List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Reports ({filteredReports.length})</span>
              <FileText className="w-5 h-5 text-gray-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredReports.map((report) => (
                <div 
                  key={report.id} 
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{report.type}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{report.student}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{report.date}</span>
                        </span>
                        <span>{report.size}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {report.grade !== "-" && (
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="font-semibold text-gray-900">{report.grade}</span>
                      </div>
                    )}
                    {getStatusBadge(report.status)}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => console.log('Downloading report:', report.id)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {filteredReports.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No reports found</h3>
                  <p className="text-gray-600">Try adjusting your filters to see more results.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
