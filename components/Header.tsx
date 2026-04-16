"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { NavLink } from "@/components/NavLink";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";

const logo = "/assets/logo_escuro.svg";
import { useTranslations } from "@/hooks/useLanguage";

const Header = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setSearchParams = (params: Record<string, string>) => {
const current = new URLSearchParams(searchParams?.toString() || "");

  // limpa tudo
  if (Object.keys(params).length === 0) {
    router.replace(window.location.pathname); // 👈 remove query completamente
    return;
  }

  // adiciona novos params
  Object.entries(params).forEach(([key, value]) => {
    current.set(key, value);
  });

  const query = current.toString();

  router.replace(query ? `?${query}` : "");
};
  const [language, setLanguage] = useState("PT-BR");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations();

  useEffect(() => {
  const lang = searchParams?.get("lang");
    if (lang === "ENG" || lang === "ESP") {
      setLanguage(lang);
    } else {
      setLanguage("PT-BR");
    }
  }, [searchParams]);

  const handleLanguageChange = (lang: string) => {
    if (lang === "ENG" || lang === "ESP") {
      setSearchParams({ lang });
      setLanguage(lang);
    } else {
      setSearchParams({});
      setLanguage("PT-BR"); // 👈 força corretamente
    }
  };

  return (
    <header className="fixed top-0 w-full bg-white z-50 border-b border-border h-20">
    <div className="container mx-auto px-6 h-full">
    <div className="flex items-center justify-between h-full">
    <Link href="/" className="flex items-center">
    <img src={logo} alt="Elas No Poder" className="h-8" />
    </Link>

    <nav className="hidden lg:flex items-center gap-8 flex-1 ml-12">
    <div className="flex items-center bg-[#b80f63] rounded-full px-3 py-1.5 gap-2">
    {[
      { code: "ESP", label: "ES" },
      { code: "PT-BR", label: "PT" },
      { code: "ENG", label: "EN" }
    ].map((lang) => (
      <button
      key={lang.code}
      onClick={() => handleLanguageChange(lang.code)}
      className={`text-white text-[14px] font-medium transition-opacity ${
        language === lang.code ? 'opacity-100' : 'opacity-50 hover:opacity-100'
      }`}
      >
      {lang.label}
      </button>
    ))}
    </div>

    <NavLink
    href="/"
    className="text-[1.125rem] font-light hover:text-[#B80F66] transition-colors"
    activeClassName="text-[#B80F66] font-bold"
    >
    {t.menu.home}
    </NavLink>
    <NavLink
    href="/sobre-nos"
    className="text-[1.125rem] font-light hover:text-[#B80F66] transition-colors"
    activeClassName="text-[#B80F66] font-bold"
    >
    {t.menu.about}
    </NavLink>
    <NavLink
    href="/projetos"
    className="text-[1.125rem] font-light hover:text-[#B80F66] transition-colors"
    activeClassName="text-[#B80F66] font-bold"
    >
    {t.menu.projects}
    </NavLink>
    <NavLink
    href="/blog"
    className="text-[1.125rem] font-light hover:text-[#B80F66] transition-colors"
    activeClassName="text-[#B80F66] font-bold"
    >
    {t.menu.blog}
    </NavLink>
    </nav>

    <Button
    asChild
    className="ml-auto hidden lg:block"
    >
    <a href="https://grifa.me/instituicao/elasnopoderbr" target="_blank" rel="noopener noreferrer">
    {t.donation}
    </a>
    </Button>

    {/* Mobile Menu */}
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
    <SheetTrigger className="lg:hidden ml-auto">
    <Menu className="h-6 w-6" />
    </SheetTrigger>
    <SheetContent side="right" className="w-[300px] sm:w-[400px]">
    <nav className="flex flex-col gap-6 mt-8">
    <div className="flex items-center bg-[#b80f63] rounded-full px-3 py-1.5 gap-2" style={{ width: 'fit-content' }}>
    {[
      { code: "ESP", label: "ES" },
      { code: "PT-BR", label: "PT" },
      { code: "ENG", label: "EN" }
    ].map((lang) => (
      <button
      key={lang.code}
      onClick={() => {
        handleLanguageChange(lang.code);
        setIsMobileMenuOpen(false);
      }}
      className={`text-white text-[14px] font-medium transition-opacity ${
        language === lang.code ? 'opacity-100' : 'opacity-50 hover:opacity-100'
      }`}
      >
      {lang.label}
      </button>
    ))}
    </div>

    <NavLink
    href="/"
    className="text-[1.125rem] font-light hover:text-[#B80F66] transition-colors"
    activeClassName="text-[#B80F66] font-bold">
    <span onClick={() => setIsMobileMenuOpen(false)}>
      {t.menu.home}
    </span>
    </NavLink>
    <NavLink
    href="/sobre-nos"
    className="text-[1.125rem] font-light hover:text-[#B80F66] transition-colors"
    activeClassName="text-[#B80F66] font-bold">
    <span onClick={() => setIsMobileMenuOpen(false)}>
    {t.menu.about}
  </span>
    </NavLink>
    <NavLink
    href="/projetos"
    className="text-[1.125rem] font-light hover:text-[#B80F66] transition-colors"
    activeClassName="text-[#B80F66] font-bold" >
    <span onClick={() => setIsMobileMenuOpen(false)}>
    {t.menu.projects}
  </span>
    </NavLink>
    <NavLink
    href="/blog"
    className="text-[1.125rem] font-light hover:text-[#B80F66] transition-colors"
    activeClassName="text-[#B80F66] font-bold">
    <span onClick={() => setIsMobileMenuOpen(false)}>
    {t.menu.blog}
  </span>
    </NavLink>

    <Button
    asChild
    className="mt-4"
    >
    <a href="https://grifa.me/instituicao/elasnopoderbr" target="_blank" rel="noopener noreferrer">
    {t.donation}
    </a>
    </Button>
    </nav>
    </SheetContent>
    </Sheet>
    </div>
    </div>
    </header>
  );
};

export default Header;
