"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A mixed bar chart"

const chartDataEx = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfigEx = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

type ChartBarMixedProps = {
  data: DataSchema[]
}

type DataSchema = {
    deputado: string
    valor_total: number
    fill?: string
}

// let chartConfig = {
//   valor_total: {
//     label: "Valor Total",
//   },    
// }

// let chartData: DataSchema[] = []

export function ChartBarMixed({ data }: ChartBarMixedProps) {
  const chartData: DataSchema[] = []
  let chartConfig: Record<string, { label: string; color?: string }> = {
    valor_total: { label: "Valor Total" },
  }

    for (const d of data){
        var obj = {
            deputado: d.deputado,
            valor_total: d.valor_total,
            fill: d.fill
        }

        chartData.push(obj)
        console.log(obj)
        chartConfig = {
            ...chartConfig,
            [obj.deputado]: {
                label: obj.deputado,
                color: "#f5f",
            },

        }
    }
    
  return (
    <Card>
      <CardHeader>
        <CardTitle>Maiores Indenizações X Deputado</CardTitle>
        <CardDescription>Valor total de indenizações pagas por deputado.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="deputado"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="valor_total" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="valor_total" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
