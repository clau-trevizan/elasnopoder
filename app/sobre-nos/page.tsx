import SobreNos from "@/components/SobreNos";

export async function generateMetadata() {
  const res = await fetch(
    "https://elasnopoder.org/wp/wp-json/wp/v2/pages?slug=sobre-nos&_embed",
    { next: { revalidate: 60 } }
  );

  const data = await res.json();
  const page = data[0];

  if (!page) {
    return {
      title: "Sobre Nós",
    };
  }

  const image = page._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  return {
    title: "Elas no Poder - "+ page.title.rendered,
    description: page.excerpt.rendered.replace(/<[^>]+>/g, ""),
    images: image ? [image] : [],
  };
}

export default function Page() {
 return <SobreNos />;
}
