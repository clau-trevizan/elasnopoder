"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
const logoFooter = "/assets/logo_preto.svg";
const whatsappIcon = "/assets/whatsapp.svg";
const facebookIcon = "/assets/facebook.svg";
const xIcon = "/assets/x.svg";
const linkedinIcon = "/assets/linkedin.svg";
const instagramIcon = "/assets/instagram.svg";
const threadsIcon = "/assets/threads.svg";
import { useTranslations } from "@/hooks/useLanguage";
import { useWordPressPage } from "@/hooks/useWordPressPage";

const Footer = () => {
  const t = useTranslations();
  const searchParams = useSearchParams();
    const lang = searchParams?.get("lang");

  const { data: pageData } = useWordPressPage();

  const buildLink = (path: string): string => {
    if (lang === "ENG" || lang === "ESP") {
      return `${path}?lang=${lang}`;
    }
    return path;
  };

  // Get footer links from ACF
  const codigoDeEticaUrl = pageData?.acf?.codigo_de_etica || '';
  const estatutoUrl = pageData?.acf?.estatuto || '';
  const relatorioFinanceiroUrl = pageData?.acf?.relatorio_financeiro || 'https://drive.google.com/drive/folders/17xpaMt3VmgxHjK_8eWxVl1PdslLX--PN?usp=sharing';

  return (
    <footer className="bg-[#1F1D1D] text-white py-8 rounded-t-[40px]">
      <div className="container mx-auto px-6">
        {/* Desktop layout: 12 columns grid */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8">
          {/* Logo + Social media: 4 columns */}
          <div className="lg:col-span-4 space-y-6">
            <img src={logoFooter} alt="Elas no Poder" className="h-20" />
            <div className="space-y-4">
              <p className="text-white text-[16px] font-normal">
                {t.footer.followUs}
              </p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/elasnopoderbr/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform">
                  <img src={instagramIcon} alt="Instagram" className="w-5 h-5" />
                </a>
                <a href="https://www.facebook.com/elasnopoderbr/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform">
                  <img src={facebookIcon} alt="Facebook" className="w-5 h-5" />
                </a>
                <a href="https://x.com/elasnopoderbr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform">
                  <img src={xIcon} alt="X" className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/company/elasnopoderbr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform">
                  <img src={linkedinIcon} alt="LinkedIn" className="w-5 h-5" />
                </a>
                <a href="https://www.threads.com/@elasnopoderbr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform">
                  <img src={threadsIcon} alt="Threads" className="w-8 h-8" />
                </a>
              </div>
            </div>
          </div>

          {/* Links: 8 columns */}
          <div className="lg:col-span-8 grid grid-cols-3 gap-8">
            <div className="footer-materiais">
              <h3 className="font-bold mb-4 text-base">{t.footer.materials}</h3>
              <ul className="space-y-2">
                <li><a href="https://drive.google.com/drive/u/1/folders/1jdkKfXseJNfG60qGxZajqLTm74cf-FHh" target="_blank" rel="noopener noreferrer" className="text-white text-[16px] hover:text-primary transition-colors">{t.footer.mediaKit}</a></li>
                <li><a href={relatorioFinanceiroUrl} target="_blank" rel="noopener noreferrer" className="text-white text-[16px] hover:text-primary transition-colors">{t.footer.financialReport}</a></li>
                {codigoDeEticaUrl && (
                  <li><a href={codigoDeEticaUrl} target="_blank" rel="noopener noreferrer" className="text-white text-[16px] hover:text-primary transition-colors">Código de Ética</a></li>
                )}
                {estatutoUrl && (
                  <li><a href={estatutoUrl} target="_blank" rel="noopener noreferrer" className="text-white text-[16px] hover:text-primary transition-colors">Estatuto</a></li>
                )}
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-base">{t.footer.site}</h3>
              <ul className="space-y-2">
                <li><Link href={buildLink("/")} className="text-white text-[16px] hover:text-primary transition-colors">{t.menu.home}</Link></li>
                <li><Link href={buildLink("/sobre-nos")} className="text-white text-[16px] hover:text-primary transition-colors">{t.footer.aboutUs}</Link></li>
                <li><Link href={buildLink("/projetos")} className="text-white text-[16px] hover:text-primary transition-colors">{t.footer.projects}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-base opacity-0">Links</h4>
              <ul className="space-y-2">
                <li><Link href={buildLink("/blog")} className="text-white text-[16px] hover:text-primary transition-colors">{t.footer.blog}</Link></li>
                <li><a href="https://grifa.me/instituicao/elasnopoderbr" target="_blank" rel="noopener noreferrer" className="text-white text-[16px] hover:text-primary transition-colors">{t.footer.donate}</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile/tablet layout */}
        <div className="lg:hidden grid md:grid-cols-4 gap-12 footer-grid">
          <div className="space-y-4 footer-logo-section">
            <img src={logoFooter} alt="Elas no Poder" className="h-20" />
          </div>

          <div className="space-y-4 footer-social-section">
            <p className="text-white text-[16px] font-normal">
              {t.footer.followUs}
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/elasnopoderbr/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform">
                <img src={instagramIcon} alt="Instagram" className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/elasnopoderbr/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform">
                <img src={facebookIcon} alt="Facebook" className="w-5 h-5" />
              </a>
              <a href="https://x.com/elasnopoderbr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform">
                <img src={xIcon} alt="X" className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/elasnopoderbr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform">
                <img src={linkedinIcon} alt="LinkedIn" className="w-5 h-5" />
              </a>
              <a href="https://www.threads.com/@elasnopoderbr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform">
                <img src={threadsIcon} alt="Threads" className="w-8 h-8" />
              </a>
            </div>
          </div>

          <div className="footer-materiais">
            <h3 className="font-bold mb-4 text-base">{t.footer.materials}</h3>
            <ul className="space-y-2">
              <li><a href="https://drive.google.com/drive/u/1/folders/1jdkKfXseJNfG60qGxZajqLTm74cf-FHh" target="_blank" rel="noopener noreferrer" className="text-white text-[16px] hover:text-primary transition-colors">{t.footer.mediaKit}</a></li>
              <li><a href={relatorioFinanceiroUrl} target="_blank" rel="noopener noreferrer" className="text-white text-[16px] hover:text-primary transition-colors">{t.footer.financialReport}</a></li>
              {codigoDeEticaUrl && (
                <li><a href={codigoDeEticaUrl} target="_blank" rel="noopener noreferrer" className="text-white text-[16px] hover:text-primary transition-colors">Código de Ética</a></li>
              )}
              {estatutoUrl && (
                <li><a href={estatutoUrl} target="_blank" rel="noopener noreferrer" className="text-white text-[16px] hover:text-primary transition-colors">Estatuto</a></li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-base">{t.footer.site}</h3>
            <ul className="space-y-2">
              <li><Link href={buildLink("/")} className="text-white text-[16px] hover:text-primary transition-colors">{t.menu.home}</Link></li>
              <li><Link href={buildLink("/sobre-nos")} className="text-white text-[16px] hover:text-primary transition-colors">{t.footer.aboutUs}</Link></li>
              <li><Link href={buildLink("/projetos")} className="text-white text-[16px] hover:text-primary transition-colors">{t.footer.projects}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-base opacity-0">Links</h4>
            <ul className="space-y-2">
              <li><Link href={buildLink("/blog")} className="text-white text-[16px] hover:text-primary transition-colors">{t.footer.blog}</Link></li>
              <li><a href="https://grifa.me/instituicao/elasnopoderbr" target="_blank" rel="noopener noreferrer" className="text-white text-[16px] hover:text-primary transition-colors">{t.footer.donate}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
