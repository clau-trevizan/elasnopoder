"use client";
import { useWordPressSobreNos } from "@/hooks/useWordPressSobreNos";

const BotaoSection = () => {
  const { data } = useWordPressSobreNos();

  const texto = data?.acf?.secao_3?.texto_botao || "";
  const link = data?.acf?.secao_3?.link_botao || "";

  return (
    <section className="py-16 md:py-24 relative overflow-hidden missao-section">
    <div className="container mx-auto px-4 relative z-10">
    {/* Title - 12 columns centered */}
    <div className="grid grid-cols-12">
    <div className="col-span-12 text-center" style={{justifyContent: 'center', display: 'flex', flexWrap: 'wrap'}}>
    <a href={link} target="_blank" rel="noopener noreferrer" className="items-center justify-center gap-2 whitespace-nowrap text-base font-normal ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary-hover rounded-lg px-[25px] py-[13px] mx-auto hidden lg:block">{texto}</a>
    </div>
    </div>
    </div>
    </section>
  );
};

export default BotaoSection;
