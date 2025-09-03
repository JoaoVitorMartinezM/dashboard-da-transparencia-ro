"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts"

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

export const description = "A line chart"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  indenizacao: {
    label: "Indenizações",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

type Props = {
  data: any[]
  title: string
  description?: string

}

type ChartData = {
  value: number
  time: Date
}

export function ChartLineDefault( { title, description, data }:Props ) {
  let chartData: ChartData[] = data.map((x) => {
    let obj: ChartData = { value: x.valor_total, time: x.data }
    return obj
  })
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top:0,
              bottom:0
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={0}

              tickFormatter={(value) => {
                let string_arr = value.split(" ")
                return string_arr[2].concat("-") + string_arr[3]
              }}
            />
            
            <YAxis
              dataKey="value"
              tickLine={false}
              axisLine={false}
              tickMargin={0}
              tickFormatter={(value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            }
            />
            <ChartTooltip
              formatter={(value: number) => [
                value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
              ]}
              labelFormatter={(label: string) => {
                const date = new Date(label); // converte string para Date
                return date.toLocaleDateString("pt-BR", {
                  month: "2-digit",
                  year: "numeric",
                });
              }}
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Line
              dataKey="value"
              type="natural"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={true}
            />
            <Legend align="right" iconSize={24}/>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
