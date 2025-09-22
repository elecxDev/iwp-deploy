import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface DashboardHeaderProps {
  title: string
  showSearch?: boolean
  searchPlaceholder?: string
  onSearch?: (value: string) => void
  rightContent?: React.ReactNode
}

export function DashboardHeader({ 
  title, 
  showSearch = true, 
  searchPlaceholder = "Search...",
  onSearch,
  rightContent 
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      
      <div className="flex items-center gap-4">
        {showSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={searchPlaceholder}
              className="pl-10 w-64"
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>
        )}
        
        {rightContent && (
          <div className="flex items-center gap-2">
            {rightContent}
          </div>
        )}

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Activity</span>
          <span className="text-sm text-blue-600 cursor-pointer">View All</span>
        </div>
      </div>
    </div>
  )
}
