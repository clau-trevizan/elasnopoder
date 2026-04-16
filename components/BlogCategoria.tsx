"use client";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { useWordPressBlogByCategory, useWordPressCategoryBySlug } from "@/hooks/useWordPressBlogByCategory";
import { useWordPressCategories, WordPressCategory, WordPressBlogPost } from "@/hooks/useWordPressBlog";
import { useWordPressAuthors } from "@/hooks/useWordPressAuthor";
import { useLanguage } from "@/hooks/useLanguage";
const timeIcon = "/assets/time.svg";
import { useMemo } from "react";

const BlogCategoria = ({ slug }: { slug: string }) => {
  const { data: category, isLoading: categoryLoading } = useWordPressCategoryBySlug(slug);
  const { data: posts, isLoading: postsLoading } = useWordPressBlogByCategory(slug);
  const { data: categories, isLoading: categoriesLoading } = useWordPressCategories();
  const { language, buildLink } = useLanguage();

  const authorIds = useMemo(() => {
    if (!posts) return [];
    return posts.map(post => post.author).filter((id): id is number => !!id);
  }, [posts]);

  const { data: authors } = useWordPressAuthors(authorIds);

  const getAuthorName = (post: any) => {
    const authorId = post?.author;
    if (authorId && authors?.[authorId]) {
      const author = authors[authorId];
      const firstName = author.first_name || '';
      const lastName = author.last_name || '';
      return `${firstName} ${lastName}`.trim() || author.name;
    }
    return '';
  };

  const getFeaturedImage = (post: any) => {
    return post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
  };

  const getPostCategory = (post: any) => {
    const terms = post?._embedded?.["wp:term"];

    if (!terms || !terms[0]) return null;

    const matched = terms[0].find((cat: any) => cat.slug === slug);

    if (matched) return matched;

    // fallback (se não achar)
    return terms[0][0];
  };

  // Helper to extract name from value (could be string, number, or object)
  const extractName = (val: any): string => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'number') return ''; // Skip numbers (IDs), fallback to category ACF
    if (typeof val === 'object' && val.name) return val.name;
    return '';
  };

  // Get category name based on language
  const getCategoryName = (cat: WordPressCategory | any, post?: WordPressBlogPost) => {
    if (language === "ENG") {
      const engCat = extractName(post?.acf?.ingles?.categoria);
      if (engCat) return engCat;
      // Fallback to category's translated name
      if (cat?.acf?.nome_da_categoria_em_ingles) return cat.acf.nome_da_categoria_em_ingles;
    }
    if (language === "ESP") {
      const espCat = extractName(post?.acf?.espanhol?.categoria);
      if (espCat) return espCat;
      // Fallback to category's translated name
      if (cat?.acf?.nome_da_categoria_em_espanhol) return cat.acf.nome_da_categoria_em_espanhol;
    }
    return cat?.name || '';
  };

  // Get category title
  const getCategoryTitle = () => {
    if (language === "ENG" && category?.acf?.nome_da_categoria_em_ingles) {
      return category.acf.nome_da_categoria_em_ingles;
    }
    if (language === "ESP" && category?.acf?.nome_da_categoria_em_espanhol) {
      return category.acf.nome_da_categoria_em_espanhol;
    }
    return category?.name || '';
  };

  // Get category description
  const getCategoryDescription = () => {
    if (language === "ENG" && category?.acf?.descricao_em_ingles) {
      return category.acf.descricao_em_ingles;
    }
    if (language === "ESP" && category?.acf?.descricao_em_espanhol) {
      return category.acf.descricao_em_espanhol;
    }
    return category?.description || '';
  };

  // Get "matérias" label based on language
  const getPostsLabel = () => {
    return "Matérias";
  };

  // Get "Categorias" label based on language
  const getCategoriesLabel = () => {
    return "Categorias";
  };

  // Get "Home" label based on language
  const getHomeLabel = () => {
    return "Home";
  };

  // Get post title based on language
  const getPostTitle = (post: WordPressBlogPost) => {
    if (language === "ENG" && post.acf?.ingles?.titulo) return post.acf.ingles.titulo;
    if (language === "ESP" && post.acf?.espanhol?.titulo) return post.acf.espanhol.titulo;
    return post.title.rendered;
  };

  // Get post excerpt based on language
  const getPostExcerpt = (post: WordPressBlogPost) => {
    if (language === "ENG" && post.acf?.ingles?.texto) {
      const text = post.acf.ingles.texto.replace(/<[^>]*>/g, '');
      return text.length > 150 ? `<p>${text.substring(0, 150)}...</p>` : `<p>${text}</p>`;
    }
    if (language === "ESP" && post.acf?.espanhol?.texto) {
      const text = post.acf.espanhol.texto.replace(/<[^>]*>/g, '');
      return text.length > 150 ? `<p>${text.substring(0, 150)}...</p>` : `<p>${text}</p>`;
    }
    return post.excerpt.rendered;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const getCategoryColors = (cat: WordPressCategory | any) => {
    const bgColor = cat?.acf?.cor || '#B80F66';
    const textColor = cat?.acf?.cor_texto || '#FFFFFF';
    return { bgColor, textColor };
  };

  const getReadingTime = (post: any) => {
    if (post.acf?.tempo_de_leitura) return post.acf.tempo_de_leitura;
    const content = post.content?.rendered || '';
    const text = content.replace(/<[^>]*>/g, '');
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min`;
  };

  const isLoading = categoryLoading || postsLoading || categoriesLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white blog-page blog-categoria-page">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 pt-12">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-8">
                <Skeleton className="h-4 w-48 mb-6" />
                <div className="flex justify-between items-start mb-8">
                  <div className="flex-1">
                    <Skeleton className="h-8 w-64 mb-4" />
                    <Skeleton className="h-5 w-full max-w-xl" />
                  </div>
                  <div className="text-right ml-8">
                    <Skeleton className="h-8 w-12 ml-auto mb-1" />
                    <Skeleton className="h-4 w-16 ml-auto" />
                  </div>
                </div>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-6 mb-8 pb-8 border-b border-gray-200">
                    <Skeleton className="w-[220px] h-[150px] rounded-lg flex-shrink-0" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-24 mb-3" />
                      <Skeleton className="h-6 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-1" />
                      <Skeleton className="h-4 w-3/4 mb-3" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-span-12 lg:col-span-4">
                <Skeleton className="h-8 w-32 mb-6" />
                <div className="flex flex-col gap-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-10 w-40" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-white blog-page blog-categoria-page">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center py-20">
            <h1 style={{ color: '#481276' }}>Categoria não encontrada</h1>
            <p className="mt-4" style={{ color: '#666' }}>A categoria que você está procurando não existe.</p>
            <Link href={buildLink("/blog")} className="mt-6 inline-block text-primary underline">Voltar para o Blog</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { bgColor: categoryBgColor, textColor: categoryTextColor } = getCategoryColors(category);

  return (
    <div className="min-h-screen bg-white blog-page blog-categoria-page">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 pt-12">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8">
              <nav className="mb-6">
                <p className="flex items-center gap-2 blog-categoria-breadcrumb">
                  <Link href={buildLink("/")} className="hover:underline">{getHomeLabel()}</Link>
                  <span>&gt;</span>
                  <Link href={buildLink("/blog")} className="hover:underline">Blog</Link>
                  <span>&gt;</span>
                  <span>{getCategoryTitle()}</span>
                </p>
              </nav>

              <div className="flex justify-between items-center mb-8">
                <div className="flex-1">
                  <h1 className="mb-3 blog-categoria-title">{getCategoryTitle()}</h1>
                  {getCategoryDescription() && (
                    <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.5' }}>{getCategoryDescription()}</p>
                  )}
                </div>
                <div className="text-center ml-8">
                  <p className="blog-categoria-count-number" style={{ fontWeight: '700', color: '#1F1D1D' }}>{posts?.length || 0}</p>
                  <p className="blog-categoria-count-label">{getPostsLabel()}</p>
                </div>
              </div>

              {posts && posts.length > 0 ? (
                posts.map((post) => {
                  const postCat = getPostCategory(post);
                  const { bgColor, textColor } = postCat ? getCategoryColors(postCat) : { bgColor: categoryBgColor, textColor: categoryTextColor };

                  return (
                    <Link key={post.id} href={buildLink(`/blog/${post.slug}`)} className="flex gap-6 mb-8 pb-8 border-b border-gray-200 group blog-post-card">
                      <div className="w-[220px] h-[150px] rounded-lg overflow-hidden bg-[#D9D9D9] flex-shrink-0">
                        {getFeaturedImage(post) && (
                          <img src={getFeaturedImage(post)} alt={getPostTitle(post)} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1">
                        <span className="inline-block px-3 py-1 rounded mb-3 blog-tag" style={{ backgroundColor: bgColor, color: textColor, fontSize: '12px' }}>
                          {getCategoryName(postCat || category, post)}
                        </span>
                        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors" style={{ color: '#1F1D1D', fontSize: '20px', lineHeight: '1.3' }} dangerouslySetInnerHTML={{ __html: getPostTitle(post) }} />
                        <p className="line-clamp-3 mb-3" style={{ color: '#666', fontSize: '14px', lineHeight: '1.5' }} dangerouslySetInnerHTML={{ __html: getPostExcerpt(post) }} />
                        <div className="flex items-center gap-3 flex-wrap" style={{ fontSize: '12px', color: '#666' }}>
                          <span>Por: <span className="underline">{getAuthorName(post)}</span></span>
                          <span>{formatDate(post.date)}</span>
                          <span>{formatTime(post.date)}</span>
                          <span className="flex items-center gap-1">
                            <img src={timeIcon} alt="tempo de leitura" className="w-[14px] h-[14px]" style={{ opacity: 0.6 }} />
                            {getReadingTime(post)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <p style={{ color: '#666' }}>Nenhum post encontrado nesta categoria.</p>
              )}
            </div>

            <div className="col-span-12 lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <p className="text-2xl font-semibold mb-4" style={{ color: '#1F1D1D' }}>{getCategoriesLabel()}</p>
                <div className="flex flex-col" style={{ gap: '0.75rem' }}>
                  {categories?.filter(c => c.count > 0 && c.slug !== 'sem-categoria' && c.slug !== 'destaque').map((cat) => {
                    const { bgColor, textColor } = getCategoryColors(cat);
                    return (
                      <Link key={cat.id} href={buildLink(`/blog/categoria/${cat.slug}`)} className="inline-block w-fit">
                        <span className="px-3 py-1 font-medium rounded blog-tag inline-block" style={{ backgroundColor: bgColor, color: textColor }}>
                          {getCategoryName(cat)}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogCategoria;
