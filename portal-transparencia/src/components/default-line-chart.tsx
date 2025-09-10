"use client"

import { TrendingUp, X } from "lucide-react"
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
import { Input } from "./ui/input"
import { useRouter } from "next/navigation"
import { Dropdown } from "./dropdown"
import { Label } from "./ui/label"
import { MONTHS } from "@/app/relatorio/months"
import { useState } from "react"
import { Button } from "./ui/button"

export const description = "A line chart"

const chartConfigDash = {
  indenizacao: {
    label: "Indenizações",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

type Props = {
  data: any[]
  title: string
  description?: string
  isDashboard?: boolean

}

type ChartData = {
  value: number,
  time: string,
  [deputado: string]: number | string | undefined
}

export function ChartLineDefault({ title, description, data, isDashboard = false }: Props) {
  const router = useRouter();
  const params = new URLSearchParams()
  const [ano, setAno] = useState("")
  const [mes, setMes] = useState("")
  const [dtInicio, setDtInicio] = useState("")
  const [dtFim, setDtFim] = useState("")
  const [deputado, setDeputado] = useState("")
  const [fixedTooltip, setFixedTooltip] = useState<null | { payload: any[]; label: string | undefined}>(null)


  const resetFiltros = () => {
    setAno("")
    setDeputado("")
    setDtFim("")
    setDtInicio("")
    setMes("")
    setFixedTooltip(null)

  }

  const aplicarFiltros = () => {


    if (ano) params.set("ano", ano)
    if (mes) params.set("mes", mes)
    if (dtInicio) params.set("dt_inicio", dtInicio)
    if (dtFim) params.set("dt_fim", dtFim)
    if (deputado) params.set("nome", deputado)

    router.push(`?${params.toString()}#grafico-temporal`)
  }

  let chartData: ChartData[] = []
  let deputados: string[] = []
  let chartConfig: ChartConfig = {}

  if (!isDashboard) {
    // 1. Agrupar por data
    const grouped: Record<string, any> = {}
    data.forEach((x) => {
      const date = x.data
      if (!grouped[date]) {
        grouped[date] = { time: date }
      }
      grouped[date][x.nome] = x.total_liquido // nome do deputado vira uma key
    })

    // 2. Transformar em array
    chartData = Object.values(grouped)

    // 3. Pegar lista de deputados únicos
    deputados = [...new Set(data.map((x) => x.nome))]

    // 4. Criar chartConfig dinamicamente
    chartConfig = deputados.reduce((acc, dep, i) => {
      acc[dep] = {
        label: dep,
        color: `var(--chart-${(i % 5) + 1})`, // ciclo de 5 cores
      }
      return acc
    }, {} as ChartConfig)

  } else {
    chartData = data.map((x) => {
      let obj: ChartData
      if (x.total_liquido) {
        obj = { value: x.total_liquido, time: x.data }
        return obj
      }

      obj = { value: x.valor_total, time: x.data }
      return obj
    })
  }



  return (
    <Card id="grafico-temporal">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {
          !isDashboard &&
          <div className="flex justify-between gap-2 md:px-4">

            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="ano" className="text-sm md:text:md">Ano:</Label>
                <Input
                  id="ano"
                  className="max-w-[100px] md:max-w-sm"
                  placeholder="Digite o ano"
                  value={ano}
                  onChange={(e) => setAno(e.target.value)}
                />
                <Label htmlFor="mes" className="text-sm md:text:md">Mês:</Label>
                <Dropdown
                  dropdownItems={MONTHS.dropdownItems}
                  label="--Selecione--"
                  placeHolder="Busque pelo mês"
                  onSelect={(currentValue) => {
                    setMes(currentValue)
                  }}
                />

              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="dt_inicio" className="text-sm md:text:md">Data Início:</Label>
                <Input
                  id="dt_inicio"
                  className="max-w-sm"
                  value={dtInicio}
                  placeholder="Digite a data de início"
                  onChange={(e) => setDtInicio(e.target.value)}
                />

                <Label htmlFor="dt_fim" className="text-sm md:text:md">Data Fim:</Label>
                <Input
                  id="dt_fim"
                  className="max-w-sm"
                  value={dtFim}
                  placeholder="Digite a data de fim"
                  onChange={(e) => setDtFim(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-start gap-4">
              {/* <Label htmlFor="deputados">Busca:</Label> */}
              <div className="flex flex-col gap-2">
                {/* <Input
                id="deputados"
                  placeholder="Busque pelos deputados..."
                  onChange={(e) => setDeputado(e.target.value)}
                /> */}
                <Dropdown
                  dropdownItems={deputados.map(dep => ({ value: dep, label: dep }))}
                  label="--Selecione--"
                  placeHolder="Busque pelo deputado"
                  value={deputado}
                  onSelect={(currentValue) => {
                    setDeputado(currentValue)
                  }} />
                <Button
                  className="hover:bg-cyan-500 transition duration-150"
                  onClick={aplicarFiltros}>Buscar</Button>
                <Button
                  className="bg-(--destructive) hover:bg-red-500 transition duration-700"
                  onClick={resetFiltros}>Reset</Button>
              </div>

            </div>
          </div>


        }
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 0,
              bottom: 0
            }}
            onClick={(e) => {
              if (e && e.activePayload) {
                // salva o ponto clicado
                setFixedTooltip({
                  payload: e.activePayload,
                  label: e.activeLabel,
                })
              }
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={0}

              tickFormatter={(value) => {
                console.log(value)
                const date = new Date(value)
                const labelFormatted = date.toLocaleDateString("pt-BR", {
                  month: "2-digit",
                  year: "numeric",
                  timeZone: "UTC",
                })

                return labelFormatted
              }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={0}
              tickFormatter={(value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
              }
            />
            <ChartTooltip
              cursor={false}
              position={{ x: 600, y: -50 }}
              content={({ active, payload, label }) => {
                // Se tiver tooltip fixo, mostra ele
                if (fixedTooltip) {
                  payload = fixedTooltip.payload
                  label = fixedTooltip.label
                  active = true
                }
                if (!active || !payload) return null

                return (
                  <div className="rounded-lg border bg-background p-2 shadow-md max-h-48 overflow-y-auto" style={{ pointerEvents: "auto" }}>
                    <div className="mb-1 text-sm font-medium">{label}</div>
                    {payload.map((entry, i) => (
                        entry.name && entry.payload?.[entry.name] &&
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <span
                              className="h-3 w-3 rounded-full"
                              style={{ backgroundColor: entry.color }}
                            />
                            <span className="font-medium">{entry.name}:</span>
                            <span>
                              {entry.payload[entry.name].toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </span>
                          </div>
                    ))}
                  </div>
                )
              }}
            />
            {
              isDashboard &&
              <Line
                dataKey="value"
                type="natural"
                stroke="var(--chart-1)"
                strokeWidth={2}
                dot={true}
              />

            }
            {!isDashboard && deputados.map((dep, i) => (
              <Line
                key={dep}
                dataKey={dep}
                type="natural"
                stroke={`var(--chart-${i + 1})`}
                strokeWidth={2}
                dot={false}
              />
            ))}
            {
              isDashboard && <Legend align="right" iconSize={24} />

            }

          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
