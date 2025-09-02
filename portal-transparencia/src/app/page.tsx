// app/page.tsx (Server Component)
import { ChartBarHorizontal } from "@/components/chart-bar-horizontal";


export default async function Home() {

  const res_indenizacoes = await fetch("http://127.0.0.1:5000/indenizacoes/valor-total", {
    cache: "no-store", // evita cache e garante dados atualizados
  });
  const res_salarios = await fetch("http://127.0.0.1:5000/salarios/total-liquido", {
    cache: "no-store", // evita cache e garante dados atualizados
  });
  const res_diarias = await fetch("http://127.0.0.1:5000/diarias/valor-total", {
  cache: "no-store", // evita cache e garante dados atualizados
  });

  let indenizacoes = []
  let salarios = []
  let diarias = []

  if(res_indenizacoes.status === 200) {
    indenizacoes = await res_indenizacoes.json();
  }
  if(res_salarios.status === 200) {
    salarios = await res_salarios.json();
  }
  if(res_diarias.status === 200) {
    diarias = await res_diarias.json();
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
      
     <div className="w-[800px]">
        {
          indenizacoes.length !== 0 &&
          <ChartBarHorizontal 
          data={indenizacoes.slice(0, 10)} 
          title="Top 10 Deputados x Valor de Indenizações" 
          descripton="Valor total gasto pelos deputados em indenizações."
          />
        }
      </div> 
      <div className="w-[800px]">
        {
          salarios.length !== 0 &&
          <ChartBarHorizontal 
          data={salarios.slice(0, 10)} 
          title="Top 10 Salários x Deputado" 
          descripton="Valor líquido do salário dos deputados."
          />
        }
      </div>
      <div className="w-[800px]">
        {
          diarias.length !== 0 &&
          <ChartBarHorizontal 
          data={diarias.slice(0, 10)} 
          title="Valor Total de Diárias x Deputado" 
          descripton="Valor total gasto em diárias por deputado."
          />
        }
      </div>
            <div className="w-[800px]">
        {
          diarias.length !== 0 &&
          <ChartBarHorizontal 
          data={diarias.slice(0, 10)} 
          title="Valor Total de Diárias x Deputado" 
          descripton="Valor total gasto em diárias por deputado."
          />
        }
      </div>
    </div>
  );
}
