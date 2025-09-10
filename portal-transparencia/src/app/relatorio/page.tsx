import { ChartLineDefault } from "@/components/default-line-chart"
import { columns, Payment } from "./columns"
import { DataTable } from "./data-table"

interface SearchParamsProps {
    searchParams: {
        nome?: string;
        ano?: string;
        mes?: string;
        dt_inicio?: string;
        dt_fim?: string;
    };
}

async function getData(): Promise<Payment[]> {
    const URL_INDENIZACOES_REL = process.env.URL_INDENIZACOES_REL || "http://127.0.0.1:5000/indenizacoes"
    // Fetch data from your API here.
    const response = await fetch(URL_INDENIZACOES_REL, { cache: "no-store" })
    const data = await response.json()
    return data
}

export default async function Reports({ searchParams }: SearchParamsProps) {
    const params = await searchParams;

    const data = await getData()
    const nome = params?.nome || "";
    const ano = params?.ano || "";
    const mes = params?.mes || "";
    const dataInicio = params?.dt_inicio || "";
    const dataFim = params?.dt_fim || "";

    const url_salarios = process.env.URL_SALARIOS ? `${process.env.URL_SALARIOS}?nome=${nome}&ano=${ano}&mes=${mes}&dt_inicio=${dataInicio}&dt_fim=${dataFim}` : `http://127.0.0.1:5000/salarios/total-liquido?nome=${nome}&ano=${ano}&mes=${mes}&dt_inicio=${dataInicio}&dt_fim=${dataFim}`

    try {
        // Fazendo fetch simultâneo
        const [
            resSalarios,
        ] = await Promise.all([
            fetch(url_salarios, { cache: "no-store" }),
        ]);

        // Convertendo para JSON
        const [salarios,] = await Promise.all([
            resSalarios.json(),
        ]);

        return (
            <div className="p-8 flex flex-col gap-4">
                <h1 className="text-xl font-bold text-(--chart-3)">Relatórios</h1>
                <div className="container mx-auto gap-8 ">
                    <DataTable columns={columns} data={data} />
                    

                </div>
                <div className="w-full md:container md:mx-auto md:gap-8 md:w-1/2">
                    <ChartLineDefault
                        data={salarios}
                        title="Relatório Salário dos Deputados"
                        description="Busque pelos deputados e períodos desejados"
                    />
                </div>


            </div>
        )
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return <p>Erro ao carregar os dados. Verifique o backend.</p>;
    }
}