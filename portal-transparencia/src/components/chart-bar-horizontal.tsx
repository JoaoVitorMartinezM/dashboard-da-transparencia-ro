"use client"

import { Bar, BarChart, Cell, LabelList, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A horizontal bar chart"

const COLORS = ["var(--chart-1)","var(--chart-2)","var(--chart-3)","var(--chart-4)","var(--chart-5)"];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

type BarRechartsProps = {
  data: any[]
  title?: string
  descripton?: string
}

type DataSchema = {
  category: string
  target: number
}

const BAR_SIZE = 24         // espessura da barra
const ROW_HEIGHT = 36       // altura por categoria (BAR_SIZE + espaço)
const MIN_ROWS = 3

export function ChartBarHorizontal({ data, title, descripton }:BarRechartsProps) {
  let dataSchema: DataSchema[] = data.map((x) => {
    let obj: DataSchema = { category: '', target: 0 }
    for (const value of Object.values(x)) {
      if ("string" === typeof value) obj.category = value
      else obj.target = Number(value)
    }
    return obj
  })

  const maxTarget = Math.max(...dataSchema.map(d => d.target))
  const chartHeight = Math.max(dataSchema.length, MIN_ROWS) * ROW_HEIGHT
  const categoryGap = Math.max(ROW_HEIGHT - BAR_SIZE, 0)

  return (
    <Card className="w-full h-auto mx-4  sm:h-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{descripton}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer style={{ height: chartHeight }} className="w-full" config={chartConfig}>
          {/* 🔑 Wrap no ResponsiveContainer para evitar scroll lateral */}
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart
              accessibilityLayer
              data={dataSchema}
              layout="vertical"
              margin={{ left: 0, right: 56, top: 0, bottom: 0 }}
              barGap={0}
              barCategoryGap={categoryGap}
            >
              <XAxis type="number" domain={[0, maxTarget * 1.2]} hide />
              <YAxis dataKey="category" type="category" tickLine={false} axisLine={false} hide />
              
              <ChartTooltip
                formatter={(value: number, name: string) => [
                  name + " - ",
                  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                ]}
                cursor={false}
                content={<ChartTooltipContent className="flex flex-row gap-4" />}
              />

              <Bar
                dataKey="target"
                animationDuration={1000}
                barSize={BAR_SIZE}
                radius={[50, 50, 50, 50]}
                legendType="circle"
                activeBar={{ stroke: 'black', strokeWidth: 2 }}
                name="Valor Total"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                
                <LabelList
                  dataKey="category"
                  position="insideLeft"
                  offset={5}
                  className="fill-(--color-label)"
                  fontSize={12}
                  formatter={(value: string) => {
                    const parts = value.split(" ")
                    const first = parts[0]
                    const last = parts[parts.length - 1]
                    const middle = parts.length > 2 ? parts[1][0] + "." : ""
                    return `${first} ${middle} ${last}`
                  }}
                />

                <LabelList
                  dataKey="target"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={14}
                  formatter={(value: number) =>
                    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                  }
                />
              </Bar>

              <Legend align="right" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
