import BlogCategoria from "@/components/BlogCategoria";

export async function generateStaticParams() {
  const res = await fetch(
    "https://elasnopoder.org/wp/wp-json/wp/v2/categories"
  );

  const categories = await res.json();

  return categories.map((category: any) => ({
    slug: category.slug,
  }));
}

const clean = (text: string) =>
  text?.replace(/<[^>]+>/g, "") || "";

  export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

  const res = await fetch(
    `https://elasnopoder.org/wp/wp-json/wp/v2/categories?slug=${slug}`,
    { next: { revalidate: 60 } }
  );

  const data = await res.json();
  const category = data[0];

  if (!category) {
    return {
      title: "Categoria",
    };
  }

  return {
    title: `Elas No Poder - Blog |  ${clean(category.name)}`,
    description: clean(category.description),
    openGraph: {
      title: clean(category.name),
      description: clean(category.description),
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogCategoria slug={slug} />;
}
