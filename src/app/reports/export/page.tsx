"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Download, FileText, Users, Calendar, BarChart3, PieChart } from "lucide-react"

// Demo data for exports
const demoStudentData = [
  {
    id: 1,
    name: "Adriel Clinton Maben",
    studentId: "2362016",
    email: "adriel.maben@christuniversity.in",
    program: "5 BTCS AIML A",
    department: "Dept. of AI, ML & DS",
    internship: "Quantum Computing Intern",
    company: "Apple",
    status: "approved",
    startDate: "2024-01-15",
    endDate: "2024-06-15",
    supervisor: "Dr. Sarah Johnson",
    grade: "A",
    totalHours: 480,
    completedReports: 8,
    attendanceRate: 95.5
  },
  {
    id: 2,
    name: "J Abishek Rufus Raj",
    studentId: "2362083",
    email: "abishek.raj@christuniversity.in",
    program: "5 BTCS AIML A",
    department: "Dept. of AI, ML & DS",
    internship: "Machine Learning Engineer",
    company: "Google",
    status: "pending",
    startDate: "2024-02-01",
    endDate: "2024-07-01",
    supervisor: "Dr. Michael Chen",
    grade: "B+",
    totalHours: 420,
    completedReports: 6,
    attendanceRate: 88.2
  },
  {
    id: 3,
    name: "Tom Kattampally",
    studentId: "2362017",
    email: "tom.kattampally@christuniversity.in",
    program: "5 BTCS AIML A",
    department: "Dept. of AI, ML & DS",
    internship: "AI Research Intern",
    company: "Microsoft",
    status: "approved",
    startDate: "2024-01-20",
    endDate: "2024-06-20",
    supervisor: "Dr. Emily Rodriguez",
    grade: "A-",
    totalHours: 460,
    completedReports: 7,
    attendanceRate: 92.1
  },
  {
    id: 4,
    name: "Akhil Alex Aerathu",
    studentId: "2362021",
    email: "akhil.aerathu@christuniversity.in",
    program: "5 BTCS AIML A",
    department: "Dept. of AI, ML & DS",
    internship: "Data Science Intern",
    company: "Amazon",
    status: "rejected",
    startDate: "2024-03-01",
    endDate: "2024-08-01",
    supervisor: "Dr. James Wilson",
    grade: "C+",
    totalHours: 320,
    completedReports: 4,
    attendanceRate: 72.5
  },
  {
    id: 5,
    name: "Felix Francis Thekkekara",
    studentId: "2362069",
    email: "felix.francis@christuniversity.in",
    program: "5 BTCS AIML A",
    department: "Dept. of AI, ML & DS",
    internship: "Software Development Intern",
    company: "Netflix",
    status: "approved",
    startDate: "2024-02-15",
    endDate: "2024-07-15",
    supervisor: "Dr. Lisa Anderson",
    grade: "A",
    totalHours: 475,
    completedReports: 8,
    attendanceRate: 96.8
  }
]

const demoAttendanceData = [
  { studentId: "2362016", studentName: "Adriel Clinton Maben", date: "2024-09-01", clockIn: "09:00", clockOut: "17:30", hoursWorked: 8.5, status: "present" },
  { studentId: "2362016", studentName: "Adriel Clinton Maben", date: "2024-09-02", clockIn: "08:45", clockOut: "17:15", hoursWorked: 8.5, status: "present" },
  { studentId: "2362016", studentName: "Adriel Clinton Maben", date: "2024-09-03", clockIn: "09:15", clockOut: "17:45", hoursWorked: 8.5, status: "present" },
  { studentId: "2362083", studentName: "J Abishek Rufus Raj", date: "2024-09-01", clockIn: "09:30", clockOut: "17:00", hoursWorked: 7.5, status: "present" },
  { studentId: "2362083", studentName: "J Abishek Rufus Raj", date: "2024-09-02", clockIn: null, clockOut: null, hoursWorked: 0, status: "absent" },
  { studentId: "2362017", studentName: "Tom Kattampally", date: "2024-09-01", clockIn: "08:30", clockOut: "17:30", hoursWorked: 9, status: "present" },
  { studentId: "2362017", studentName: "Tom Kattampally", date: "2024-09-02", clockIn: "09:00", clockOut: "18:00", hoursWorked: 9, status: "present" },
  { studentId: "2362021", studentName: "Akhil Alex Aerathu", date: "2024-09-01", clockIn: "10:00", clockOut: "16:30", hoursWorked: 6.5, status: "present" },
  { studentId: "2362069", studentName: "Felix Francis Thekkekara", date: "2024-09-01", clockIn: "08:45", clockOut: "17:45", hoursWorked: 9, status: "present" },
  { studentId: "2362069", studentName: "Felix Francis Thekkekara", date: "2024-09-02", clockIn: "09:00", clockOut: "18:00", hoursWorked: 9, status: "present" }
]

const demoReportsData = [
  {
    reportId: "RPT001",
    studentId: "2362016",
    studentName: "Adriel Clinton Maben",
    reportType: "Weekly Report",
    weekNumber: 1,
    submissionDate: "2024-09-06",
    title: "Introduction to Quantum Computing Fundamentals",
    description: "Explored basic quantum computing principles and got familiar with IBM Qiskit framework.",
    tasksCompleted: ["Setup development environment", "Completed quantum gates tutorial", "Built first quantum circuit"],
    challenges: "Understanding quantum superposition concepts",
    nextWeekGoals: "Implement quantum algorithms",
    supervisorFeedback: "Excellent start! Good understanding of fundamentals.",
    grade: "A",
    submissionStatus: "graded"
  },
  {
    reportId: "RPT002",
    studentId: "2362083",
    studentName: "J Abishek Rufus Raj",
    reportType: "Weekly Report",
    weekNumber: 1,
    submissionDate: "2024-09-08",
    title: "Machine Learning Model Development",
    description: "Started working on predictive analytics model for user behavior.",
    tasksCompleted: ["Data collection and cleaning", "Exploratory data analysis", "Feature engineering"],
    challenges: "Large dataset processing efficiency",
    nextWeekGoals: "Model training and validation",
    supervisorFeedback: "Good progress on data preprocessing. Focus on optimization.",
    grade: "B+",
    submissionStatus: "graded"
  },
  {
    reportId: "RPT003",
    studentId: "2362017",
    studentName: "Tom Kattampally",
    reportType: "Mid-term Report",
    weekNumber: 8,
    submissionDate: "2024-09-05",
    title: "AI Research Project Progress",
    description: "Comprehensive review of research progress in natural language processing.",
    tasksCompleted: ["Literature review completion", "Dataset preparation", "Initial model implementation", "Preliminary results analysis"],
    challenges: "Model accuracy optimization",
    nextWeekGoals: "Advanced model tuning and evaluation",
    supervisorFeedback: "Outstanding research methodology. Results are promising.",
    grade: "A-",
    submissionStatus: "graded"
  }
]

const demoPerformanceData = [
  {
    metric: "Overall Program Completion Rate",
    value: "87.5%",
    trend: "+5.2%",
    category: "completion"
  },
  {
    metric: "Average Student Grade",
    value: "B+",
    trend: "+0.3 GPA",
    category: "academic"
  },
  {
    metric: "Industry Partner Satisfaction",
    value: "4.6/5.0",
    trend: "+0.2",
    category: "satisfaction"
  },
  {
    metric: "Employment Rate Post-Internship",
    value: "92%",
    trend: "+8%",
    category: "employment"
  },
  {
    metric: "Average Attendance Rate",
    value: "89.0%",
    trend: "-2.1%",
    category: "attendance"
  }
]

const exportOptions = [
  { 
    id: "student_reports", 
    label: "Student Reports", 
    description: "All submitted reports and grades",
    icon: FileText,
    count: 3
  },
  { 
    id: "attendance", 
    label: "Attendance Records", 
    description: "Work hours and attendance logs",
    icon: Calendar,
    count: 10
  },
  { 
    id: "student_data", 
    label: "Student Information", 
    description: "Personal and academic details",
    icon: Users,
    count: 5
  },
  { 
    id: "performance", 
    label: "Performance Analytics", 
    description: "Grades and progress statistics",
    icon: BarChart3,
    count: 5
  },
  { 
    id: "summary", 
    label: "Program Summary", 
    description: "Overall internship program metrics",
    icon: PieChart,
    count: 1
  }
]

export default function ExportPage() {
  const router = useRouter()
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [dateRange, setDateRange] = useState({ start: "", end: "" })
  const [format, setFormat] = useState("csv")
  const [isExporting, setIsExporting] = useState(false)

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generateCSV = (data: any[], filename: string) => {
    if (data.length === 0) return null
    
    const headers = Object.keys(data[0])
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header]
          // Handle arrays and objects
          if (Array.isArray(value)) {
            return `"${value.join('; ')}"`
          }
          if (typeof value === 'object' && value !== null) {
            return `"${JSON.stringify(value)}"`
          }
          // Escape quotes and wrap in quotes if contains comma
          const stringValue = String(value || '')
          if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
            return `"${stringValue.replace(/"/g, '""')}"`
          }
          return stringValue
        }).join(',')
      )
    ].join('\n')
    
    return { content: csvContent, filename: `${filename}.csv` }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generateJSON = (data: any[], filename: string) => {
    return { 
      content: JSON.stringify(data, null, 2), 
      filename: `${filename}.json` 
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generatePDF = (data: any[], filename: string, title: string) => {
    // Simple text-based PDF content
    let content = `${title}\n${'='.repeat(title.length)}\n\n`
    content += `Generated on: ${new Date().toLocaleDateString()}\n`
    content += `Total records: ${data.length}\n\n`
    
    data.forEach((item, index) => {
      content += `Record ${index + 1}:\n`
      Object.entries(item).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          content += `  ${key}: ${value.join(', ')}\n`
        } else if (typeof value === 'object' && value !== null) {
          content += `  ${key}: ${JSON.stringify(value)}\n`
        } else {
          content += `  ${key}: ${value}\n`
        }
      })
      content += '\n'
    })
    
    return { content, filename: `${filename}.txt` } // Using .txt as simple PDF alternative
  }

  const getExportData = (optionId: string) => {
    switch (optionId) {
      case "student_data":
        return {
          data: demoStudentData,
          filename: "student_information",
          title: "Student Information Report"
        }
      case "attendance":
        return {
          data: demoAttendanceData,
          filename: "attendance_records",
          title: "Attendance Records Report"
        }
      case "student_reports":
        return {
          data: demoReportsData,
          filename: "student_reports",
          title: "Student Reports Data"
        }
      case "performance":
        return {
          data: demoPerformanceData,
          filename: "performance_analytics",
          title: "Performance Analytics Report"
        }
      case "summary":
        // Generate summary data
        const summaryData = [{
          totalStudents: demoStudentData.length,
          approvedStudents: demoStudentData.filter(s => s.status === "approved").length,
          pendingStudents: demoStudentData.filter(s => s.status === "pending").length,
          rejectedStudents: demoStudentData.filter(s => s.status === "rejected").length,
          averageGrade: "B+",
          averageAttendance: "89.0%",
          totalReports: demoReportsData.length,
          companiesPartnered: [...new Set(demoStudentData.map(s => s.company))].length,
          programDuration: "6 months",
          generatedDate: new Date().toISOString()
        }]
        return {
          data: summaryData,
          filename: "program_summary",
          title: "Internship Program Summary"
        }
      default:
        return { data: [], filename: "export", title: "Export Data" }
    }
  }

  const downloadFile = (content: string, filename: string, type: string = 'text/plain') => {
    const element = document.createElement("a")
    const file = new Blob([content], { type })
    element.href = URL.createObjectURL(file)
    element.download = filename
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleExport = async () => {
    if (selectedOptions.length === 0) {
      alert("Please select at least one export option")
      return
    }

    setIsExporting(true)
    
    try {
      // Process each selected option
      for (const optionId of selectedOptions) {
        const { data, filename, title } = getExportData(optionId)
        
        // Filter data by date range if specified
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let filteredData: any[] = data
        if (dateRange.start || dateRange.end) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          filteredData = data.filter((item: any) => {
            // Try to find a date field in the item
            const dateField = (item.date || item.submissionDate || item.startDate || new Date().toISOString()) as string
            const itemDate = new Date(dateField)
            
            if (dateRange.start && itemDate < new Date(dateRange.start)) return false
            if (dateRange.end && itemDate > new Date(dateRange.end)) return false
            return true
          })
        }
        
        let fileData
        
        switch (format) {
          case "csv":
          case "xlsx":
            fileData = generateCSV(filteredData, filename)
            break
          case "json":
            fileData = generateJSON(filteredData, filename)
            break
          case "pdf":
            fileData = generatePDF(filteredData, filename, title)
            break
          default:
            fileData = generateCSV(filteredData, filename)
        }
        
        if (fileData) {
          // Add timestamp to filename
          const timestamp = new Date().toISOString().split('T')[0]
          const finalFilename = `${timestamp}_${fileData.filename}`
          downloadFile(fileData.content, finalFilename)
        }
      }
      
      setIsExporting(false)
      alert(`Export completed! Downloaded ${selectedOptions.length} file(s) in ${format.toUpperCase()} format.`)
      
    } catch (error) {
      setIsExporting(false)
      console.error("Export error:", error)
      alert("Export failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
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
              <h1 className="text-3xl font-bold text-gray-900">Export Reports</h1>
              <p className="text-gray-600 mt-1">Download internship program data</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Export Options */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Select Data to Export</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {exportOptions.map((option) => {
                  const Icon = option.icon
                  return (
                    <div 
                      key={option.id}
                      className={`flex items-center space-x-4 p-4 border rounded-lg transition-all cursor-pointer ${
                        selectedOptions.includes(option.id) 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleOptionToggle(option.id)}
                    >
                      <Checkbox 
                        checked={selectedOptions.includes(option.id)}
                        onChange={() => handleOptionToggle(option.id)}
                      />
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{option.label}</h3>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {option.count} {option.count === 1 ? 'item' : 'items'}
                      </Badge>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Export Settings */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Export Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <div className="space-y-2">
                    <Input
                      type="date"
                      placeholder="Start date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                    />
                    <Input
                      type="date"
                      placeholder="End date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                  <select 
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full border rounded-md px-3 py-2"
                  >
                    <option value="csv">CSV (Excel compatible)</option>
                    <option value="json">JSON (Raw data)</option>
                    <option value="pdf">PDF (Formatted report)</option>
                    <option value="xlsx">Excel (.xlsx)</option>
                  </select>
                </div>

                <div className="pt-4 border-t">
                  <div className="text-sm text-gray-600 mb-4">
                    Selected: {selectedOptions.length} data types
                  </div>
                  
                  <Button 
                    onClick={handleExport}
                    disabled={selectedOptions.length === 0 || isExporting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center space-x-2"
                  >
                    {isExporting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Exporting...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Export Data</span>
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Export Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>Format: {format.toUpperCase()}</div>
                  <div>Items: {selectedOptions.length} selected</div>
                  {dateRange.start && <div>From: {dateRange.start}</div>}
                  {dateRange.end && <div>To: {dateRange.end}</div>}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
