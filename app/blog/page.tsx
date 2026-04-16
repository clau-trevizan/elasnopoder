import Blog from "@/components/Blog";

export async function generateMetadata() {
  const res = await fetch(
    "https://elasnopoder.org/wp/wp-json/wp/v2/pages?slug=blog&_embed"
  );

  const data = await res.json();
  const page = data[0];

  if (!page) {
    return {
      title: "Blog",
    };
  }

  const image = page._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return {
    title: "Elas no Poder - " + page.title.rendered,
    description: page.excerpt.rendered.replace(/<[^>]+>/g, ""),
    openGraph: {
      title: page.title.rendered,
      description: page.excerpt.rendered,
      images: image ? [image] : [],
    },
  };
}

export default function Page() {
  return <Blog />;
}
