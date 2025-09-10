// app/page.tsx (Server Component)
import { ChartBarHorizontal } from "@/components/chart-bar-horizontal";
import { ChartLineDefault } from "@/components/default-line-chart";

export const dynamic = "force-dynamic"; // força SSR
const periodoMandato = {
  inicio: "01-2023",
  fim: "12-2026"
}
const anoAtual = new Date().getFullYear()
const filtro_mandato = `?dt_inicio=${periodoMandato.inicio}&dt_fim=${periodoMandato.fim}`
const filtro_salario = "&order_by=salario&group_by=nome"

export default async function Home() {
  const url_indenizacoes = process.env.URL_INDENIZACOES ? process.env.URL_INDENIZACOES + filtro_mandato : `http://127.0.0.1:5000/indenizacoes/valor-total${filtro_mandato}`
  const url_diarias = process.env.URL_DIARIAS ? process.env.URL_DIARIAS + filtro_mandato : `http://127.0.0.1:5000/diarias/valor-total${filtro_mandato}`
  const url_salarios = process.env.URL_SALARIOS ? `${process.env.URL_SALARIOS + filtro_mandato + filtro_salario}` : `http://127.0.0.1:5000/salarios/total-liquido${filtro_mandato}${filtro_salario}`
  const url_indenizacoes_tempo = process.env.URL_INDENIZACOES_TEMPO ? process.env.URL_INDENIZACOES_TEMPO : `http://127.0.0.1:5000/indenizacoes/total-tempo`

  try {
    // Fazendo fetch simultâneo
    const [
      resIndenizacoes,
      resSalarios,
      resDiarias,
      resIndenizacoesTempo,
    ] = await Promise.all([
      fetch(url_indenizacoes, { cache: "no-store" }),
      fetch(url_salarios, { cache: "no-store" }),
      fetch(url_diarias, { cache: "no-store" }),
      fetch(url_indenizacoes_tempo, { cache: "no-store" }),
    ]);

    // Convertendo para JSON
    const [indenizacoes, salarios, diarias, indenizacoes_tempo] = await Promise.all([
      resIndenizacoes.json(),
      resSalarios.json(),
      resDiarias.json(),
      resIndenizacoesTempo.json(),
    ]);

  return (
    <div>
      <h1 className="text-2xl p-8 font-bold text-(--chart-3)">Dashboard</h1>

    <div className="flex flex-col justify-center content-center sm:flex-row sm:flex-wrap sm:w-[80vw] sm:justify-self-center">

      
     <div className="w-auto mt-4 lg:w-1/2">
        {
          indenizacoes.length !== 0 &&
          <ChartBarHorizontal 
          data={indenizacoes.slice(0, 24)} 
          title="Deputados x Valor de Indenizações" 
          descripton="Valor total gasto pelos deputados em indenizações no mandato."
          />
        }
      </div> 
      <div className="w-auto mt-4 lg:w-1/2">
        {
          salarios.length !== 0 &&
          <ChartBarHorizontal 
          data={salarios.slice(0, 24)} 
          title="Salários dos Deputados" 
          descripton={`Somatória valor líquido do salário agrupado por deputados no ano de ${anoAtual}.`}
          />
        }
      </div>
      <div className="w-auto mt-4 lg:w-1/2">
        {
          diarias.length !== 0 &&
          <ChartBarHorizontal 
          data={diarias.slice(0, 10)} 
          title="Valor Total de Diárias x Deputado" 
          descripton="Valor total gasto em diárias por deputado no mandato."
          />
        }
      </div>
      <div className="w-auto mt-4 lg:w-1/2">
        {
          indenizacoes_tempo.length !== 0 &&
          <ChartLineDefault 
          data={indenizacoes_tempo} 
          title="Total Indenizações x Tempo" 
          description="Valor total por mês."
          isDashboard={true}
          />
        }
      </div>
    </div>
    </div>
  );
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return <p>Erro ao carregar os dados. Verifique o backend.</p>;
  }
}
