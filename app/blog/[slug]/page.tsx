import BlogPost from "@/components/BlogPost";

export async function generateStaticParams() {
  const res = await fetch(
    "https://elasnopoder.org/wp/wp-json/wp/v2/posts"
  );

  const posts = await res.json();

  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const res = await fetch(
    `https://elasnopoder.org/wp/wp-json/wp/v2/posts?slug=${slug}&_embed`,
    { next: { revalidate: 60 } }
  );

  const data = await res.json();
  const post = data[0];

  if (!post) {
    return {
      title: "Post não encontrado",
    };
  }

  const image =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;


  return {
    title: "Elas no Poder - "+ post.title.rendered,
    description: post.excerpt.rendered.replace(/<[^>]+>/g, ""),
    openGraph: {
      title: post.title.rendered,
      description: post.excerpt.rendered,
      images: image ? [image] : [],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

return <BlogPost slug={slug} />;
}
