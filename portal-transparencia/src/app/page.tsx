// app/page.tsx (Server Component)
import { ChartBarHorizontal } from "@/components/chart-bar-horizontal";
import { ChartLineDefault } from "@/components/default-line-chart";

export const dynamic = "force-dynamic"; // força SSR

export default async function Home() {
  const url_indenizacoes = process.env.URL_INDENIZACOES || "http://127.0.0.1:5000/indenizacoes/valor-total"
  const url_diarias = process.env.URL_DIARIAS || "http://127.0.0.1:5000/diarias/valor-total"
  const url_salarios = process.env.URL_SALARIOS || "http://127.0.0.1:5000/salarios/total-liquido"
  const url_indenizacoes_tempo = process.env.URL_INDENIZACOES_TEMPO || "http://127.0.0.1:5000/indenizacoes"

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
    <div className="flex flex-col gap-4 justify-center sm:flex-row sm:flex-wrap">
      
     <div className="w-auto">
        {
          indenizacoes.length !== 0 &&
          <ChartBarHorizontal 
          data={indenizacoes.slice(0, 24)} 
          title="Top 10 Deputados x Valor de Indenizações" 
          descripton="Valor total gasto pelos deputados em indenizações."
          />
        }
      </div> 
      <div className="w-auto">
        {
          salarios.length !== 0 &&
          <ChartBarHorizontal 
          data={salarios.slice(0, 24)} 
          title="Top 10 Salários x Deputado" 
          descripton="Valor líquido do salário dos deputados."
          />
        }
      </div>
      <div className="w-auto">
        {
          diarias.length !== 0 &&
          <ChartBarHorizontal 
          data={diarias.slice(0, 10)} 
          title="Valor Total de Diárias x Deputado" 
          descripton="Valor total gasto em diárias por deputado."
          />
        }
      </div>
      <div className="w-auto">
        {
          indenizacoes_tempo.length !== 0 &&
          <ChartLineDefault 
          data={indenizacoes_tempo} 
          title="Total Indenizações x Tempo" 
          description="Valor total por mês."
          />
        }
      </div>
    </div>
  );
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return <p>Erro ao carregar os dados. Verifique o backend.</p>;
  }
}
