"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { useWordPressBlog, useWordPressCategories, WordPressCategory, WordPressBlogPost } from "@/hooks/useWordPressBlog";
import { useWordPressAuthors } from "@/hooks/useWordPressAuthor";
import Link from "next/link";
const timeIcon = "/assets/time.svg";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import Image from "next/image";
import { useRef } from "react";



type BlogProps = {
  initialPosts?: any;
  initialCategories?: any;
};

const Blog = ({ initialPosts, initialCategories }: BlogProps) => {
const containerRef = useRef(null);
  const { data: posts } = useWordPressBlog();
 const { data: categories } = useWordPressCategories();

 const finalPosts = posts || initialPosts;
 const finalCategories = categories || initialCategories;

 const [loaded, setLoaded] = useState(false);

 useEffect(() => {
   if (finalPosts && finalCategories) {
     const timer = setTimeout(() => {
       setLoaded(true);
     }, 200); // 👈 pequeno delay resolve melhor

     return () => clearTimeout(timer);
   }
 }, [finalPosts, finalCategories]);


  const { language, buildLink } = useLanguage();


  // Collect all author IDs from posts
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

  const getCategory = (post: any) => {
    const terms = post?._embedded?.["wp:term"];
    if (terms && terms[0] && terms[0].length > 0) {
      const postCategory = terms[0][0];
      // Find matching category from full categories list to get ACF fields
      const fullCategory = categories?.find(c => c.id === postCategory.id);
      if (fullCategory) return fullCategory;
      // Return embedded category with normalized structure
      return {
        id: postCategory.id || postCategory.term_id,
        name: postCategory.name,
        slug: postCategory.slug,
        acf: postCategory.acf
      };
    }
    return null;
  };

  // Get category name based on language
  const getCategoryName = (category: WordPressCategory | any, post?: WordPressBlogPost) => {
    // Helper to extract name from value (could be string, number, or object)
    const extractName = (val: any): string => {
      if (!val) return '';
      if (typeof val === 'string') return val;
      if (typeof val === 'number') return ''; // Skip numbers (IDs), fallback to category ACF
      if (typeof val === 'object' && val.name) return val.name;
      return '';
    };

    if (language === "ENG") {
      // First check if post has acf.ingles.categoria
      const engCat = extractName(post?.acf?.ingles?.categoria);
      if (engCat) return engCat;
      // Then check category's translated name
      if (category?.acf?.nome_da_categoria_em_ingles) {
        return category.acf.nome_da_categoria_em_ingles;
      }
    }
    if (language === "ESP") {
      const espCat = extractName(post?.acf?.espanhol?.categoria);
      if (espCat) return espCat;
      if (category?.acf?.nome_da_categoria_em_espanhol) {
        return category.acf.nome_da_categoria_em_espanhol;
      }
    }
    return category?.name || '';
  };

  // Get post title based on language
  const getPostTitle = (post: WordPressBlogPost) => {
    if (language === "ENG" && post.acf?.ingles?.titulo) {
      return post.acf.ingles.titulo;
    }
    if (language === "ESP" && post.acf?.espanhol?.titulo) {
      return post.acf.espanhol.titulo;
    }
    return post.title.rendered;
  };

  // Get post excerpt based on language
  const getPostExcerpt = (post: WordPressBlogPost) => {
    if (language === "ENG" && post.acf?.ingles?.texto) {
      // Create excerpt from text (first 150 chars)
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
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColors = (category: WordPressCategory | any) => {
    const bgColor = category?.acf?.cor || '#B80F66';
    const textColor = category?.acf?.cor_texto || '#FFFFFF';
    return { bgColor, textColor };
  };

  const getReadingTime = (post: any) => {
    if (post.acf?.tempo_de_leitura) {
      return post.acf.tempo_de_leitura;
    }
    // Estimate reading time based on content
    const content = post.content?.rendered || '';
    const text = content.replace(/<[^>]*>/g, '');
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min`;
  };

const isLoading = !posts || !categories;
const noPosts = !finalPosts || finalPosts.length === 0;

  // Split posts for different sections
  const featuredPost = posts?.[0];
  const sidebarPosts = posts?.slice(1, 3) || [];
  const popularPost = posts?.[3];
  const gridPosts = posts?.slice(4, 6) || [];
  const circularPosts = posts?.slice(6, 9) || [];
  const initialBottomPosts = posts?.slice(9, 12) || [];

  // Infinite scroll state
  const [visibleGridSets, setVisibleGridSets] = useState(1);
  const POSTS_PER_LOAD = 9;

  // Get all posts for infinite scroll (starting after the initial layout posts)
  const allExtraPosts = posts?.slice(12) || [];
  const totalGridSets = Math.ceil(allExtraPosts.length / POSTS_PER_LOAD) + 1;

  // Combine initial bottom posts with loaded extra posts
  const getVisibleBottomPosts = () => {
    if (visibleGridSets === 1) return initialBottomPosts;
    const extraPostsToShow = allExtraPosts.slice(0, (visibleGridSets - 1) * POSTS_PER_LOAD);
    return [...initialBottomPosts, ...extraPostsToShow];
  };

  const bottomPosts = getVisibleBottomPosts();

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (visibleGridSets >= totalGridSets) return;

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight - 500) {
      setVisibleGridSets(prev => Math.min(prev + 1, totalGridSets));
    }
  }, [visibleGridSets, totalGridSets]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);


  if (!finalPosts || !finalCategories) {
    return (


        <div className="min-h-screen bg-white blog-page">
            <Header />

            {/* SKELETON (fica por baixo) */}
      <div>
            <main className="pt-24 pb-16">
              <div className="container mx-auto px-4">
                {/* Hero Skeleton */}
                <div className="grid grid-cols-12 gap-6 mb-12">
                  <div className="col-span-12 lg:col-span-7">
                    <Skeleton className="w-full h-[350px] rounded-lg" />
                  </div>
                  <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
                    <Skeleton className="w-full h-[110px] rounded-lg" />
                    <Skeleton className="w-full h-[110px] rounded-lg" />
                    <Skeleton className="w-full h-[110px] rounded-lg" />
                  </div>
                </div>

                {/* Popular & Categories Skeleton */}
                <div className="grid grid-cols-12 gap-6 mb-12">
                  <div className="col-span-12 lg:col-span-7">
                    <Skeleton className="h-8 w-40 mb-4" />
                    <Skeleton className="w-full h-[300px] rounded-lg" />
                  </div>
                  <div className="col-span-12 lg:col-span-5">
                    <Skeleton className="h-8 w-40 mb-4" />
                    <div className="flex flex-col gap-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Skeleton key={i} className="w-full h-[80px] rounded-lg" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </main>
            </div>

          <Footer />
        </div>
    );
  }

  if (noPosts) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center py-20">
            <h1 style={{ color: '#481276' }}>Blog</h1>
            <p className="mt-4" style={{ color: '#666' }}>Nenhum post encontrado no momento.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-white blog-page">
        <Header />

        {/* SKELETON (fica por baixo) */}
        {!loaded && (
  <div>
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Hero Skeleton */}
            <div className="grid grid-cols-12 gap-6 mb-12">
              <div className="col-span-12 lg:col-span-7">
                <Skeleton className="w-full h-[350px] rounded-lg" />
              </div>
              <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
                <Skeleton className="w-full h-[110px] rounded-lg" />
                <Skeleton className="w-full h-[110px] rounded-lg" />
                <Skeleton className="w-full h-[110px] rounded-lg" />
              </div>
            </div>

            {/* Popular & Categories Skeleton */}
            <div className="grid grid-cols-12 gap-6 mb-12">
              <div className="col-span-12 lg:col-span-7">
                <Skeleton className="h-8 w-40 mb-4" />
                <Skeleton className="w-full h-[300px] rounded-lg" />
              </div>
              <div className="col-span-12 lg:col-span-5">
                <Skeleton className="h-8 w-40 mb-4" />
                <div className="flex flex-col gap-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="w-full h-[80px] rounded-lg" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
        </div>
        )}

        {/* CONTEÚDO REAL */}
        {loaded && (
    <div className="transition-opacity duration-300 opacity-100" ref={containerRef}>
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 pt-12">
            {/* Hero Section */}
            <div className="grid grid-cols-12 gap-6 mb-12">
              {/* Featured Post */}
              {featuredPost && (
                <div className="col-span-12 lg:col-span-8">
                  <Link href={buildLink(`/blog/${featuredPost.slug}`)} prefetch={false} className="block group h-full">
                    <div className="relative rounded-lg overflow-hidden bg-[#D9D9D9]" style={{ height: '500px' }}>
                      {getFeaturedImage(featuredPost) && (
                        <img
                          src={getFeaturedImage(featuredPost)}
                          alt={getPostTitle(featuredPost)}
                          className="w-full h-full object-cover"
                        />
                      )}
                      {/* Gradient overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      {/* NOVO badge */}
                      <span
                        className="absolute top-4 right-4 px-3 py-1 text-white font-medium rounded blog-tag"
                        style={{ backgroundColor: '#046633' }}
                      >
                        NOVO!
                      </span>
                      {/* Content overlay */}
                      <div className="absolute bottom-4 left-4 right-4">
                        {getCategory(featuredPost) && (() => {
                          const cat = getCategory(featuredPost);
                          const { bgColor, textColor } = getCategoryColors(cat);
                          return (
                            <span
                              className="inline-block px-3 py-1 font-medium rounded mb-3 blog-tag"
                              style={{ backgroundColor: bgColor, color: textColor }}
                            >
                              {getCategoryName(cat, featuredPost)}
                            </span>
                          );
                        })()}
                      <h2
                          className="font-semibold text-white lg:text-[24px] text-[20px]"
                          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
                          dangerouslySetInnerHTML={{ __html: getPostTitle(featuredPost) }}
                        />
                        <p
                          className="mt-2 line-clamp-2 text-white/90"
                          style={{ fontSize: '16px' }}
                          dangerouslySetInnerHTML={{ __html: getPostExcerpt(featuredPost) }}
                        />
                        <div className="mt-3 flex items-center gap-4 text-white/80" style={{ fontSize: '12px' }}>
                          <span>Por: <span>{getAuthorName(featuredPost)}</span></span>
                          <span>{formatDate(featuredPost.date)}</span>
                          <span>{formatTime(featuredPost.date)}</span>
                          <span className="flex items-center gap-1">
                            <img src={timeIcon} alt="tempo de leitura" className="w-[14px] h-[14px]" style={{ filter: 'brightness(0) invert(1)' }} />
                            {getReadingTime(featuredPost)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Sidebar Posts - only 2 posts */}
              <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                {sidebarPosts.slice(0, 2).map((post) => (
                  <Link key={post.id} href={buildLink(`/blog/${post.slug}`)} className="block group blog-post-card">
                    <div className="relative rounded-lg overflow-hidden bg-[#D9D9D9]" style={{ height: 'calc(250px - 12px)' }}>
                      {getFeaturedImage(post) && (
                        <Image
  src={getFeaturedImage(post)}
  alt={getPostTitle(post)}
  fill
  className="w-full h-full object-cover"
  priority
/>
                      )}
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      {getCategory(post) && (() => {
                        const cat = getCategory(post);
                        const { bgColor, textColor } = getCategoryColors(cat);
                        return (
                          <span
                            className="absolute top-3 right-3 px-2 py-1 font-medium rounded blog-tag"
                            style={{ backgroundColor: bgColor, color: textColor }}
                          >
                            {getCategoryName(cat, post)}
                          </span>
                        );
                      })()}
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3
                          className="text-white text-sm font-medium line-clamp-2"
                          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
                          dangerouslySetInnerHTML={{ __html: getPostTitle(post) }}
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Popular & Categories Section */}
            <div className="grid grid-cols-12 gap-6 mb-12">
              {/* Mais Popular */}
              <div className="col-span-12 lg:col-span-8">
                <p className="text-2xl font-semibold mb-4" style={{ color: '#1F1D1D' }}>Mais Popular</p>
                {popularPost && (
                  <Link href={buildLink(`/blog/${popularPost.slug}`)} prefetch={false} className="block group">
                    <div className="relative rounded-lg overflow-hidden bg-[#D9D9D9]" style={{ height: '400px' }}>
                      {getFeaturedImage(popularPost) && (
                        <img
                          src={getFeaturedImage(popularPost)}
                          alt={getPostTitle(popularPost)}
                          className="w-full h-full object-cover"
                        />
                      )}
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      {/* Content overlay */}
                      <div className="absolute bottom-4 left-4 right-4">
                        {getCategory(popularPost) && (() => {
                          const cat = getCategory(popularPost);
                          const { bgColor, textColor } = getCategoryColors(cat);
                          return (
                            <span
                              className="inline-block px-3 py-1 font-medium rounded mb-3 blog-tag"
                              style={{ backgroundColor: bgColor, color: textColor }}
                            >
                              {getCategoryName(cat, popularPost)}
                            </span>
                          );
                        })()}
                        <h3
                          className="text-lg font-semibold text-white"
                          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
                          dangerouslySetInnerHTML={{ __html: getPostTitle(popularPost) }}
                        />
                        <p
                          className="mt-2 text-sm line-clamp-2 text-white/90"
                          dangerouslySetInnerHTML={{ __html: getPostExcerpt(popularPost) }}
                        />
                        <div className="mt-3 flex items-center gap-4 text-white/80" style={{ fontSize: '12px' }}>
                          <span>Por: <span>{getAuthorName(popularPost)}</span></span>
                          <span>{formatDate(popularPost.date)}</span>
                          <span>{formatTime(popularPost.date)}</span>
                          <span className="flex items-center gap-1">
                            <img src={timeIcon} alt="tempo de leitura" className="w-[14px] h-[14px]" style={{ filter: 'brightness(0) invert(1)' }} />
                            {getReadingTime(popularPost)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}

                {/* Grid Posts below Popular */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {gridPosts.map((post) => (
                    <Link key={post.id} href={buildLink(`/blog/${post.slug}`)} className="block group blog-post-card">
                      <div className="relative rounded-lg overflow-hidden bg-[#D9D9D9]" style={{ height: '250px' }}>
                        {getFeaturedImage(post) && (
                          <Image
    src={getFeaturedImage(post)}
    alt={getPostTitle(post)}
    fill
    className="w-full h-full object-cover"
    priority
  />

                        )}
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                        {/* Content overlay */}
                        <div className="absolute bottom-3 left-3 right-3">
                          {getCategory(post) && (() => {
                            const cat = getCategory(post);
                            const { bgColor, textColor } = getCategoryColors(cat);
                            return (
                              <span
                                className="inline-block px-2 py-1 font-medium rounded mb-2 blog-tag"
                                style={{ backgroundColor: bgColor, color: textColor }}
                              >
                                {getCategoryName(cat, post)}
                              </span>
                            );
                          })()}
                          <h4
                            className="text-sm font-semibold line-clamp-2 text-white"
                            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
                            dangerouslySetInnerHTML={{ __html: getPostTitle(post) }}
                          />
                          <div className="mt-2 text-white/80" style={{ fontSize: '12px' }}>
                            <span>Por: <span>{getAuthorName(post)}</span></span>
                            <span className="ml-2">{formatDate(post.date)}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categorias */}
              <div className="col-span-12 lg:col-span-4">
                <div className="lg:sticky lg:top-24">
                  <p className="text-2xl font-semibold mb-4" style={{ color: '#1F1D1D' }}>Categorias</p>
                  <div className="flex flex-col" style={{ gap: '0.75rem' }}>
                    {categories?.filter(c => c.count > 0 && c.slug !== 'sem-categoria' && c.slug !== 'destaque').slice(0, 5).map((category) => {
                      const { bgColor, textColor } = getCategoryColors(category);
                      return (
                        <Link
                          key={category.id}
                          href={buildLink(`/blog/categoria/${category.slug}`)}
                          className="inline-block w-fit"
                        >
                          <span
                            className="px-3 py-1 font-medium rounded blog-tag inline-block"
                            style={{ backgroundColor: bgColor, color: textColor }}
                          >
                            {getCategoryName(category)}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Circular Posts Row */}
            <div className="grid grid-cols-12 gap-6 mb-12">
              {circularPosts.map((post) => (
                <Link key={post.id} href={buildLink(`/blog/${post.slug}`)} className="block group col-span-12 lg:col-span-4 blog-post-card">
                  <div className="flex items-start gap-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-[#D9D9D9] flex-shrink-0">
                      {getFeaturedImage(post) && (
                        <Image
  src={getFeaturedImage(post)}
  alt={getPostTitle(post)}
  fill
  className="w-full h-full object-cover"
  priority
/>
                      )}
                    </div>
                    <div className="flex-1 pt-2">
                      {getCategory(post) && (() => {
                        const cat = getCategory(post);
                        const { bgColor, textColor } = getCategoryColors(cat);
                        return (
                          <span className="inline-block px-2 py-1 font-medium rounded mb-2 blog-tag" style={{ backgroundColor: bgColor, color: textColor }}>
                            {getCategoryName(cat, post)}
                          </span>
                        );
                      })()}
                      <h4 className="text-sm font-medium line-clamp-2" style={{ color: '#1F1D1D' }} dangerouslySetInnerHTML={{ __html: getPostTitle(post) }} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Bottom Posts Grid */}
            <div className="grid grid-cols-12 gap-6">
              {bottomPosts.map((post) => (
                <Link key={post.id} href={buildLink(`/blog/${post.slug}`)} className="block group col-span-12 lg:col-span-4 blog-post-card">
                  <div className="relative rounded-lg overflow-hidden bg-[#D9D9D9]" style={{ height: '250px' }}>
                    {getFeaturedImage(post) && (
                      <Image
src={getFeaturedImage(post)}
alt={getPostTitle(post)}
fill
className="w-full h-full object-cover"
priority
/>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      {getCategory(post) && (() => {
                        const cat = getCategory(post);
                        const { bgColor, textColor } = getCategoryColors(cat);
                        return (
                          <span className="inline-block px-2 py-1 font-medium rounded mb-2 blog-tag" style={{ backgroundColor: bgColor, color: textColor }}>
                            {getCategoryName(cat, post)}
                          </span>
                        );
                      })()}
                      <h4 className="text-sm font-semibold line-clamp-2 text-white" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }} dangerouslySetInnerHTML={{ __html: getPostTitle(post) }} />
                      <div className="mt-2 text-white/80" style={{ fontSize: '12px' }}>
                        <span>Por: <span>{getAuthorName(post)}</span></span>
                        <span className="ml-2">{formatDate(post.date)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Blog;
