"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { useWordPressBlogPost } from "@/hooks/useWordPressBlogPost";
import { useWordPressCategories, WordPressCategory, WordPressBlogPost as BlogPostType } from "@/hooks/useWordPressBlog";
import { useWordPressAuthor } from "@/hooks/useWordPressAuthor";
import { useBlogRatings } from "@/hooks/useBlogRatings";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
const timeIcon = "/assets/time.svg";
const shareWhatsapp = "/assets/share-whatsapp.svg";
const shareFacebook = "/assets/share-facebook.svg";
const shareX = "/assets/share-x.svg";
const shareLinkedin = "/assets/share-linkedin.svg";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const BlogPost = ({ slug }: { slug: string }) => {
  const { data: post, isLoading: postLoading, error } = useWordPressBlogPost(slug);
  const { data: categories, isLoading: categoriesLoading } = useWordPressCategories();
  const { data: author } = useWordPressAuthor(post?.author);
  const { ratings, addRating } = useBlogRatings(slug);
  const { language, buildLink } = useLanguage();

  // Rating state
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasUserRated, setHasUserRated] = useState(false);

  // Helper to extract name from value (could be string, number, or object)
  const extractName = (val: any): string => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'number') return ''; // Skip numbers (IDs), fallback to category ACF
    if (typeof val === 'object' && val.name) return val.name;
    return '';
  };

  // Get category name based on language
  const getCategoryName = (cat: WordPressCategory | any) => {
    if (language === "ENG") {
      if (cat?.acf?.nome_da_categoria_em_ingles) return cat.acf.nome_da_categoria_em_ingles;
    }
    if (language === "ESP") {
      if (cat?.acf?.nome_da_categoria_em_espanhol) return cat.acf.nome_da_categoria_em_espanhol;
    }
    return cat?.name || '';
  };

  // Get "Categorias" label based on language
  const getCategoriesLabel = () => {
    return "Categorias";
  };

  // Get post title based on language
  const getPostTitle = () => {
    if (language === "ENG" && post?.acf?.ingles?.titulo) return post.acf.ingles.titulo;
    if (language === "ESP" && post?.acf?.espanhol?.titulo) return post.acf.espanhol.titulo;
    return post?.title?.rendered || '';
  };

  // Get post content based on language
  const getPostContent = () => {
    if (language === "ENG" && post?.acf?.ingles?.texto) return post.acf.ingles.texto;
    if (language === "ESP" && post?.acf?.espanhol?.texto) return post.acf.espanhol.texto;
    return post?.content?.rendered || '';
  };

  // Get post excerpt based on language
  const getPostExcerpt = () => {
    if (language === "ENG" && post?.acf?.ingles?.texto) {
      const text = post.acf.ingles.texto.replace(/<[^>]*>/g, '');
      return text.length > 150 ? `<p>${text.substring(0, 150)}...</p>` : `<p>${text}</p>`;
    }
    if (language === "ESP" && post?.acf?.espanhol?.texto) {
      const text = post.acf.espanhol.texto.replace(/<[^>]*>/g, '');
      return text.length > 150 ? `<p>${text.substring(0, 150)}...</p>` : `<p>${text}</p>`;
    }
    return post?.excerpt?.rendered || '';
  };

  // Check if user has already rated this post
  useEffect(() => {
    if (slug) {
      const ratedPosts = JSON.parse(localStorage.getItem('blog_rated_posts') || '[]');
      setHasUserRated(ratedPosts.includes(slug));
    }
  }, [slug]);

  const getAuthorName = () => {
    if (author) {
      const firstName = author.first_name || '';
      const lastName = author.last_name || '';
      return `${firstName} ${lastName}`.trim() || author.name;
    }
    return '';
  };

  const getAuthorDescription = () => {
    return author?.acf?.breve_descricao || '';
  };

  const getAuthorPhoto = () => {
    return author?.acf?.foto || '';
  };

  const getFeaturedImage = () => {
    return post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
  };

  const getCategory = () => {
    const terms = post?._embedded?.["wp:term"];
    if (terms && terms[0] && terms[0].length > 0) {
      const postCategory = terms[0][0];
      const fullCategory = categories?.find(c => c.id === postCategory.id);
      return fullCategory || postCategory;
    }
    return null;
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

  const getReadingTime = () => {
    if (post?.acf?.tempo_de_leitura) {
      return post.acf.tempo_de_leitura;
    }
    const content = post?.content?.rendered || '';
    const text = content.replace(/<[^>]*>/g, '');
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes}min`;
  };

  const getShareUrl = () => {
    return typeof window !== 'undefined' ? window.location.href : '';
  };

  const shareOnWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(post?.title?.rendered + ' ' + getShareUrl())}`;
    window.open(url, '_blank');
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`;
    window.open(url, '_blank');
  };

  const shareOnX = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(getShareUrl())}&text=${encodeURIComponent(post?.title?.rendered || '')}`;
    window.open(url, '_blank');
  };

  const shareOnLinkedIn = () => {
    const postTitle = post?.title?.rendered?.replace(/<[^>]*>/g, '') || '';
    const postSummary = post?.excerpt?.rendered?.replace(/<[^>]*>/g, '').substring(0, 256) || '';
    const url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(getShareUrl())}&title=${encodeURIComponent(postTitle)}&summary=${encodeURIComponent(postSummary)}&source=${encodeURIComponent('Elas No Poder')}`;
    window.open(url, '_blank');
  };

  const handleSubmitRating = async () => {
    if (hasUserRated) {
      toast.error("Você já avaliou este post");
      return;
    }
    if (userRating === 0) {
      toast.error("Selecione uma nota antes de enviar");
      return;
    }
    setIsSubmitting(true);
    try {
      await addRating.mutateAsync(userRating);
      // Save to localStorage that user has rated this post
      const ratedPosts = JSON.parse(localStorage.getItem('blog_rated_posts') || '[]');
      ratedPosts.push(slug);
      localStorage.setItem('blog_rated_posts', JSON.stringify(ratedPosts));
      setHasUserRated(true);
      toast.success("Avaliação enviada com sucesso!");
      setUserRating(0);
    } catch (error) {
      toast.error("Erro ao enviar avaliação");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = postLoading || categoriesLoading;
  const category = getCategory();

  // Get 5 random categories
  const getRandomCategories = () => {
    if (!categories) return [];
    const filteredCategories = categories.filter(c => c.count > 0 && c.slug !== 'sem-categoria' && c.slug !== 'destaque');
    const shuffled = [...filteredCategories].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 pt-12">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-8">
                <Skeleton className="h-6 w-64 mb-8" />
                <Skeleton className="w-full h-[400px] rounded-lg mb-6" />
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
              <div className="col-span-12 lg:col-span-4">
                <Skeleton className="h-8 w-32 mb-4" />
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="w-full h-[100px] rounded-lg" />
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

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center py-20">
            <h1 style={{ color: '#481276' }}>Post não encontrado</h1>
            <p className="mt-4" style={{ color: '#666' }}>O post que você está procurando não existe ou foi removido.</p>
            <Link href="/blog" className="inline-block mt-6 px-6 py-3 bg-primary text-white rounded-lg">
              Voltar para o Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const randomCategories = getRandomCategories();

  return (
    <div className="min-h-screen bg-white blog-post-page">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 pt-12">
          <div className="grid grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="col-span-12 lg:col-span-8">
              {/* Breadcrumb */}
              <nav className="mb-4 blog-post-breadcrumb">
                <p className="flex items-center gap-2" style={{ color: '#4B4B53' }}>
                  <Link href={buildLink("/")} className="hover:underline">Home</Link>
                  <span>&gt;</span>
                  {category && (
                    <>
                      <Link href={buildLink(`/blog/categoria/${category.slug}`)} className="hover:underline">
                        {getCategoryName(category)}
                      </Link>
                      <span>&gt;</span>
                    </>
                  )}
                  <span
                    className="line-clamp-1"
                    dangerouslySetInnerHTML={{ __html: getPostTitle() }}
                  />
                </p>
              </nav>

              {/* Featured Image with overlaid content */}
              <div className="relative rounded-lg overflow-hidden bg-[#D9D9D9] mb-6 blog-post-featured-image">
                {getFeaturedImage() && (
                  <img
                    src={getFeaturedImage()}
                    alt={post.title.rendered}
                    className="w-full h-full object-cover"
                  />
                )}
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Overlaid content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  {/* Category Tag */}
                  {category && (() => {
                    const { bgColor, textColor } = getCategoryColors(category);
                    return (
                      <span
                        className="self-start px-3 py-1 font-medium rounded blog-tag mb-3"
                        style={{ backgroundColor: bgColor, color: textColor }}
                      >
                        {getCategoryName(category)}
                      </span>
                    );
                  })()}

                  {/* Title */}
                  <h5
                    className="font-bold mb-2 text-white blog-post-title"
                    dangerouslySetInnerHTML={{ __html: getPostTitle() }}
                  />

                  {/* Excerpt */}
                  <p
                    className="mb-2 line-clamp-2 text-white/90 blog-post-excerpt"
                    dangerouslySetInnerHTML={{ __html: getPostExcerpt() }}
                  />

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-3 text-white/80 blog-post-meta">
                    <span className="blog-post-author-text">Por: <Link href="#" className="underline text-white">{getAuthorName()}</Link></span>
                    <span>{formatDate(post.date)}</span>
                    <span>{formatTime(post.date)}</span>
                    <span className="flex items-center gap-1">
                      <img src={timeIcon} alt="tempo de leitura" className="w-3 h-3" style={{ filter: 'brightness(0) invert(1)' }} />
                      {getReadingTime()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Share + Post Content */}
              <div className="flex gap-6">
                {/* Social Icons - Fixed on left */}
                <div className="hidden lg:flex flex-col gap-3 sticky top-24 self-start">
                  <button
                    onClick={shareOnWhatsApp}
                    className="w-12 h-12 flex items-center justify-center hover:opacity-80 transition-opacity"
                  >
                    <img src={shareWhatsapp} alt="WhatsApp" className="w-12 h-12" />
                  </button>
                  <button
                    onClick={shareOnFacebook}
                    className="w-12 h-12 flex items-center justify-center hover:opacity-80 transition-opacity"
                  >
                    <img src={shareFacebook} alt="Facebook" className="w-12 h-12" />
                  </button>
                  <button
                    onClick={shareOnX}
                    className="w-12 h-12 flex items-center justify-center hover:opacity-80 transition-opacity"
                  >
                    <img src={shareX} alt="X" className="w-12 h-12" />
                  </button>
                  <button
                    onClick={shareOnLinkedIn}
                    className="w-12 h-12 flex items-center justify-center hover:opacity-80 transition-opacity"
                  >
                    <img src={shareLinkedin} alt="LinkedIn" className="w-12 h-12" />
                  </button>
                </div>

                {/* Post Content */}
                <div className="flex-1">
                  {/* Mobile Social Share */}
                  <div className="flex lg:hidden gap-3 mb-6">
                    <button
                      onClick={shareOnWhatsApp}
                      className="w-10 h-10 flex items-center justify-center"
                    >
                      <img src={shareWhatsapp} alt="WhatsApp" className="w-10 h-10" />
                    </button>
                    <button
                      onClick={shareOnFacebook}
                      className="w-10 h-10 flex items-center justify-center"
                    >
                      <img src={shareFacebook} alt="Facebook" className="w-10 h-10" />
                    </button>
                    <button
                      onClick={shareOnX}
                      className="w-10 h-10 flex items-center justify-center"
                    >
                      <img src={shareX} alt="X" className="w-10 h-10" />
                    </button>
                    <button
                      onClick={shareOnLinkedIn}
                      className="w-10 h-10 flex items-center justify-center"
                    >
                      <img src={shareLinkedin} alt="LinkedIn" className="w-10 h-10" />
                    </button>
                  </div>

                  {/* Post Content */}
                  <div
                    className="prose prose-lg max-w-none blog-post-content"
                    style={{ color: '#1F1D1D' }}
                    dangerouslySetInnerHTML={{ __html: getPostContent() }}
                  />

                  {/* Dotted Separator */}
                  <div className="border-t-2 border-dotted border-gray-300 my-8" />

                  {/* Author Section */}
                  <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="bg-[#D9D9D9] overflow-hidden flex-shrink-0"
                        style={{ width: '72px', height: '72px', borderRadius: '8px' }}
                      >
                        {getAuthorPhoto() && (
                          <img
                            src={getAuthorPhoto()}
                            alt={getAuthorName()}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold" style={{ color: '#1F1D1D' }}>
                          {getAuthorName()}
                        </p>
                      </div>
                    </div>
                    {getAuthorDescription() && (
                      <p style={{ color: '#1F1D1D', fontSize: '20px' }}>
                        {getAuthorDescription()}
                      </p>
                    )}
                  </div>

                  {/* Dotted Separator */}
                  <div className="border-t-2 border-dotted border-gray-300 my-8" />

                  {/* Ratings Section */}
                  <div className="mb-8">
                    <h2 className="font-semibold mb-6 blog-ratings-title">Avalie este artigo</h2>

                    <div className="grid grid-cols-7 gap-8 mb-6 blog-ratings-container">
                      {/* Average Rating - 3 columns */}
                      <div className="col-span-3">
                        <p className="font-bold blog-ratings-average">{ratings.average}</p>
                        <div className="flex gap-1 my-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className="w-12 h-12"
                              fill={star <= Math.round(ratings.average) ? '#B80F66' : '#D9D9D9'}
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="blog-ratings-count">{ratings.total} avaliações</p>
                      </div>

                      {/* Rating Distribution - 4 columns */}
                      <div className="col-span-4">
                        {[5, 4, 3, 2, 1].map((star) => (
                          <div key={star} className="flex items-center gap-2 mb-1">
                            <div className="flex-1 h-2 bg-[#D9D9D9] rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: ratings.total > 0 ? `${(ratings.distribution[star as keyof typeof ratings.distribution] / ratings.total) * 100}%` : '0%',
                                  backgroundColor: '#B80F66'
                                }}
                              />
                            </div>
                            <span className="text-xs" style={{ color: '#666', minWidth: '40px' }}>
                              ★ {star} ({ratings.distribution[star as keyof typeof ratings.distribution]})
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Leave Rating */}
                    {!hasUserRated ? (
                      <div>
                        <p className="font-semibold mb-3" style={{ color: '#1F1D1D' }}>Deixe sua avaliação</p>
                        <div className="flex gap-2 mb-4">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setUserRating(star)}
                              onMouseEnter={() => setHoveredRating(star)}
                              onMouseLeave={() => setHoveredRating(0)}
                              className="transition-colors"
                            >
                              <svg
                                className="w-8 h-8"
                                fill={star <= (hoveredRating || userRating) ? '#B80F66' : '#D9D9D9'}
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={handleSubmitRating}
                          disabled={isSubmitting || userRating === 0}
                          className="px-6 py-2 border rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed blog-rating-button"
                        >
                          {isSubmitting ? 'Enviando...' : 'Postar Avaliação'}
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm" style={{ color: '#666' }}>Você já avaliou este post. Obrigado!</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Categories */}
            <div className="col-span-12 lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <p className="text-xl font-semibold mb-4" style={{ color: '#1F1D1D' }}>{getCategoriesLabel()}</p>
                <div className="flex flex-col" style={{ gap: '0.75rem' }}>
                  {randomCategories.map((cat) => {
                    const { bgColor, textColor } = getCategoryColors(cat);
                    return (
                      <Link
                        key={cat.id}
                        href={buildLink(`/blog/categoria/${cat.slug}`)}
                        className="inline-block w-fit"
                      >
                        <span
                          className="px-3 py-1 font-medium rounded blog-tag inline-block"
                          style={{ backgroundColor: bgColor, color: textColor }}
                        >
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

export default BlogPost;
