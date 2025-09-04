import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Book, ChartColumnIncreasing, FileChartColumnIncreasing } from "lucide-react"

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: ChartColumnIncreasing,
  },
  {
    title: "Relatórios",
    url: "/relatorio",
    icon: FileChartColumnIncreasing,
  },
  {
    title: "Documentação",
    url: "/sobre",
    icon: Book,
  },
]

export default function AppSidebar() {
  return (
    <Sidebar collapsible={"icon"}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}