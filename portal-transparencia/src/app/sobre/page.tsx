import Image from "next/image";

export default async function About() {
    return (
        <section className="p-8 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Documentação</h1>
            <span className="font-light">Uma dashboard com informativos dos dados abertos do governo de Rondônia (RO).</span>

            <h2 className="text-xl font-bold">Schemas</h2>
            <span className="font-light">Abaixo esta descrito os schemas do banco de dados no seguinte formato:<br />
            nome da coluna (tipo do dado): uma descrição sobre a coluna.</span>
            <hr />
            <div>
                <span ><b>SERVIDORES:</b> Tabela que contém o registro de todos os servidores públicos de Rondônia.</span>
                <div className="flex flex-col sm:flex-row gap-8 mt-4 ">
                    <div className="bg-[var(--sidebar-ring)]/50 rounded-md p-4 text-base/8 sm:w-2/3 md:w-1/2 text-sm md:text-md lg:text-lg">
                        <p><b>id (INTEIRO):</b> Indentificador único do servidor no banco de dados.</p>
                        <p><b>nome (TEXTO):</b> Nome do servidor público.</p>
                        <p><b>dsccargo (TEXTO):</b> Cargo do servidor público.</p>
                        <p><b>dsclotacao (TEXTO):</b> Lotação do servidor público.</p>
                    </div>
                    <Image
                        src="/diagrama_servidores.png"
                        width={500}
                        height={500}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        alt="Diagrama da tabela servidores"
                        className="rounded-md"
                    />
                </div>

            </div>
            <hr />




            <span><b>REMUNERAÇÕES:</b> Tabela que contém informações sobre os salários dos servidores.</span>
            <div className="flex flex-col sm:flex-row gap-8 mt-4">
                <div className="bg-[var(--sidebar-ring)]/50 rounded-md p-4 text-base/8 sm:w-2/3 md:w-1/2 text-sm md:text-md lg:text-lg">
                    <p><b>codigo (INTEIRO):</b> Serve como identificador único.</p>
                    <p><b>remuneracao (DECIMAL):</b> Remuneração base mensal do servidor.</p>
                    <p><b>total_liquido (DECIMAL):</b> Salário líquido do servidor.</p>
                    <p><b>id_servidor (INTEIRO):</b> Identificador do servidor, serve para relação com a tabela SERVIDORES.</p>
                </div>
                <Image
                    src="/diagrama_remuneracoes.png"
                    width={500}
                    height={500}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt="Diagrama da tabela servidores"
                    className="rounded-md"
                />

            </div>

            <hr />
            <span><b>VERBAS INDENIZATÓRIAS:</b> Tabela com a data e valor pago de indenizações para os servidores.</span>
            <div className="flex flex-col sm:flex-row gap-8 mt-4">
                <div className="bg-[var(--sidebar-ring)]/50 rounded-md p-4 text-base/8 sm:w-2/3 md:w-1/2 text-sm md:text-md lg:text-lg">
                    <p><b>id (INTEIRO):</b> Indentificador único da indenização no banco de dados.</p>
                    <p><b>data (DATA):</b> Data contendo o mês/ano do pagamento da indenização, exemplo... A indenização paga em 02/06/2025 e 28/06/2025 irão constar como 01/06/2025.</p>
                    <p><b>lote (TEXTO):</b> Categoria para o qual o dinheiro foi destinado.</p>
                    <p><b>total_pago (DECIMAL):</b> Total pago em indenizações. Pode conter mais de um registro por servidor por conta do campo "lote".</p>
                    <p><b>id_servidor (INTEIRO):</b> Identificador do servidor, serve para relação com a tabela SERVIDORES.</p>
                </div>
                <Image
                    src="/diagrama_verbas.png"
                    width={500}
                    height={500}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt="Diagrama da tabela servidores"
                    className="rounded-md"
                />

            </div>

            <hr />

            <span><b>DETALHES DAS INDENIZAÇÕES:</b> Tabela com mais detalhes sobre os valores pagos em indenizações.</span>
            <div className="flex flex-col sm:flex-row gap-8 mt-4">
                <div className="bg-[var(--sidebar-ring)]/50 rounded-md p-4 text-base/8 sm:w-2/3 md:w-1/2 text-sm md:text-md lg:text-lg">
                    <p><b>id (INTEIRO):</b> Indentificador único da informação no banco de dados.</p>
                    <p><b>data (DATA):</b> Data contendo o dia/mês/ano do pagamento da indenização.</p>
                    <p><b>prestador (TEXTO):</b> Razão Social do prestador de serviço.</p>
                    <p><b>classe (TEXTO):</b> Tipo do serviço para o qual o dinheiro foi utilizado.</p>
                    <p><b>valor (DECIMAL):</b> Valor pago na indenização.</p>
                    <p><b>id_verba_indenizatoria (INTEIRO):</b> Identificador da verba indenizatória, serve para relação com a tabela VERBAS INDENIZATÓRIAS.</p>
                </div>
                <Image
                    src="/diagrama_verbas_detalhes.png"
                    width={500}
                    height={500}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt="Diagrama da tabela servidores"
                    className="rounded-md"
                />

            </div>

            <hr />

            <span><b>DIÁRIAS DEPUTADOS:</b> Tabela que contabiliza a quantidade de diárias dos servidores em viagens, contendo todos os detalhes das mesmas.</span>
            <div className="flex flex-col sm:flex-row gap-8 mt-4">
                <div className="bg-[var(--sidebar-ring)]/50 rounded-md p-4 text-base/8 sm:w-2/3 md:w-1/2 text-sm md:text-md lg:text-lg">
                    <p><b>id (INTEIRO):</b> Indentificador único da diária no banco de dados.</p>
                    <p><b>destino (TEXTO):</b> Destino da viagem.</p>
                    <p><b>finalidade (TEXTO):</b> Motivo da viagem.</p>
                    <p><b>data_saida (DATA):</b> Data de saída.</p>
                    <p><b>meio_transporte (TEXTO):</b> Meio de transporte da viagem.</p>
                    <p><b>numero_diarias (INTEIRO):</b> Quantidade de diárias.</p>
                    <p><b>valor_unitario (DECIMAL):</b> Valor por diária.</p>
                    <p><b>valor_total (DECIMAL):</b> Valor total das diárias pagas.</p>
                    <p><b>ordem_bancaria (TEXTO):</b> Ordem bancária.</p>
                    <p><b>empenho (TEXTO):</b> Empenho.</p>
                    <p><b>id_servidor (INTEIRO):</b> Identificador do servidor, serve para relação com a tabela SERVIDORES.</p>
                </div>
                <Image
                    src="/diagrama_diarias.png"
                    width={500}
                    height={500}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt="Diagrama da tabela servidores"
                    className="rounded-md"
                />

            </div>

            <hr />
        </section>
    )
}