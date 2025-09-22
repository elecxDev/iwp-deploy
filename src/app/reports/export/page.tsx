"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Download, FileText, Users, Calendar, BarChart3, PieChart } from "lucide-react"

const exportOptions = [
  { 
    id: "student_reports", 
    label: "Student Reports", 
    description: "All submitted reports and grades",
    icon: FileText,
    count: 156
  },
  { 
    id: "attendance", 
    label: "Attendance Records", 
    description: "Work hours and attendance logs",
    icon: Calendar,
    count: 89
  },
  { 
    id: "student_data", 
    label: "Student Information", 
    description: "Personal and academic details",
    icon: Users,
    count: 45
  },
  { 
    id: "performance", 
    label: "Performance Analytics", 
    description: "Grades and progress statistics",
    icon: BarChart3,
    count: 1
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

  const handleExport = async () => {
    if (selectedOptions.length === 0) {
      alert("Please select at least one export option")
      return
    }

    setIsExporting(true)
    
    // Simulate export process
    console.log("Exporting:", { selectedOptions, dateRange, format })
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Create mock download
    const fileName = `internship_export_${new Date().toISOString().split('T')[0]}.${format}`
    const mockContent = selectedOptions.map(option => 
      exportOptions.find(opt => opt.id === option)?.label
    ).join(", ")
    
    const element = document.createElement("a")
    const file = new Blob([`Export data: ${mockContent}\nDate range: ${dateRange.start} to ${dateRange.end}\nFormat: ${format.toUpperCase()}`], 
      { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = fileName
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    
    setIsExporting(false)
    alert(`Export completed! Downloaded: ${fileName}`)
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
