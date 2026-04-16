"use client";

import { useSearchParams } from "next/navigation";

export type Language = "PT-BR" | "ENG" | "ESP";

export const useLanguage = () => {
  const searchParams = useSearchParams();

  const lang = searchParams?.get("lang");

  const language: Language =
    lang === "ENG"
      ? "ENG"
      : lang === "ESP"
      ? "ESP"
      : "PT-BR";

  const buildLink = (path: string): string => {
    if (language === "PT-BR") return path;
    return `${path}?lang=${language}`;
  };

  return { language, buildLink };
};

// WordPress page IDs for each language
export const getPageId = (page: "home" | "sobre" | "projetos", language: Language): string => {
  const pageIds = {
    home: {
      "PT-BR": "6",
      "ENG": "5473",
      "ESP": "5479"
    },
    sobre: {
      "PT-BR": "3177",
      "ENG": "5477",
      "ESP": "5481"
    },
    projetos: {
      "PT-BR": "5243",
      "ENG": "5485",
      "ESP": "5483"
    }
  };

  return pageIds[page][language];
};

// Translations
export const translations = {
  "PT-BR": {
    menu: {
      home: "Home",
      about: "Sobre nós",
      projects: "Projetos",
      blog: "Blog"
    },
    donation: "Faça uma doação",
    form: {
      selectSubject: "Selecione o assunto *",
      selectPlaceholder: "Selecione o assunto da mensagem",
      name: "Nome e sobrenome *",
      email: "E-mail *",
      whatsapp: "WhatsApp *",
      state: "Estado onde mora *",
      message: "Escreva sua mensagem *",
      submit: "Enviar",
      submitting: "Enviando...",
      options: {
        ombudsman: "Ouvidoria",
        partnership: "Propor uma parceria",
        contact: "Falar conosco"
      }
    },
    footer: {
      followUs: "Siga-nos nas Redes Sociais",
      materials: "Materiais",
      mediaKit: "Media Kit",
      financialReport: "Relatório Financeiro",
      site: "Site",
      aboutUs: "Sobre Nós",
      projects: "Projetos",
      blog: "Blog",
      donate: "Doe para Elas"
    }
  },
  "ENG": {
    menu: {
      home: "Home",
      about: "About us",
      projects: "Projects",
      blog: "Blog"
    },
    donation: "Make a donation",
    form: {
      selectSubject: "Select the subject of your message *",
      selectPlaceholder: "Select the subject of your message",
      name: "First and last name *",
      email: "Email *",
      whatsapp: "WhatsApp *",
      state: "Country *",
      message: "Write your message *",
      submit: "Send",
      submitting: "Sending...",
      options: {
        ombudsman: "Ombudsman",
        partnership: "Propose a partnership",
        contact: "Contact us"
      }
    },
    footer: {
      followUs: "Follow Us on Social Media",
      materials: "Materials",
      mediaKit: "Media Kit",
      financialReport: "Financial Report",
      site: "Site",
      aboutUs: "About Us",
      projects: "Projects",
      blog: "Blog",
      donate: "Donate to Elas"
    }
  },
  "ESP": {
    menu: {
      home: "Inicio",
      about: "Sobre nosotras",
      projects: "Proyectos",
      blog: "Blog"
    },
    donation: "Haz una donación",
    form: {
      selectSubject: "Selecciona el asunto del mensaje *",
      selectPlaceholder: "Selecciona el asunto del mensaje",
      name: "Nombre y apellido *",
      email: "Correo electrónico *",
      whatsapp: "WhatsApp *",
      state: "Estado donde vives *",
      message: "Escribe tu mensaje *",
      submit: "Enviar",
      submitting: "Enviando...",
      options: {
        ombudsman: "Defensoría",
        partnership: "Proponer una alianza",
        contact: "Contactarnos"
      }
    },
    footer: {
      followUs: "Síguenos en las Redes Sociales",
      materials: "Materiales",
      mediaKit: "Media Kit",
      financialReport: "Informe Financiero",
      site: "Sitio web",
      home: "Inicio",
      aboutUs: "Sobre nosotras",
      projects: "Proyectos",
      blog: "Blog",
      donate: "Dona para Elas"
    }
  }
};

export const useTranslations = () => {
  const { language } = useLanguage();
  return translations[language];
};
