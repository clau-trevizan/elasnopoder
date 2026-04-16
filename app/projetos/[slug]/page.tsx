import ProjetoDetalhe from "@/components/ProjetoDetalhe";

export async function generateStaticParams() {
  const res = await fetch(
    "https://elasnopoder.org/wp/wp-json/wp/v2/projetos?per_page=100"
  );

  const projetos = await res.json();

  return projetos.map((projeto: any) => ({
    slug: projeto.slug,
  }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const res = await fetch(
    `https://elasnopoder.org/wp/wp-json/wp/v2/projetos?slug=${slug}&_embed`,
    { next: { revalidate: 60 } }
  );

  const data = await res.json();
  const projeto = data[0];

  if (!projeto) {
    return {
      title: "Projeto não encontrado",
    };
  }

  const image =
    projeto._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return {
    title: "Elas no Poder - "+ projeto.title.rendered,
    description: projeto.excerpt.rendered.replace(/<[^>]+>/g, ""),
    openGraph: {
      title: projeto.title.rendered,
      description: projeto.excerpt.rendered,
      images: image ? [image] : [],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return <ProjetoDetalhe slug={slug} />;
}
