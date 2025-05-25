import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCourses } from '../hooks/useCourses';

const CoursePage = () => {
  const { id } = useParams();
  const { course, loading, error } = useCourses({ courseId: id });
  const [activeSection, setActiveSection] = useState('overview');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black px-4">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Falha ao carregar o curso</h2>
          <p className="text-gray-400 mb-6">{error || 'Não foi possível encontrar o curso, verifique se o link está correto.'}</p>
          <Link 
            to="/courses"
            className="bg-white text-black px-6 py-2 rounded font-medium hover:bg-gray-200 transition-colors"
          >
            Voltar para a lista de cursos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen pt-24">
      {/* Hero */}
      <section className="relative">
        {/* Background image with gradient overlay */}
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${course.cover_image})`,
              filter: 'brightness(0.3) blur(3px)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-6 relative z-10 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white text-black mr-3">
                  {course.level}
                </span>
                <div className="flex space-x-3">
                  {course.skill_tags.map((tag, idx) => (
                    <span key={idx} className="text-sm text-gray-300">#{tag}</span>
                  ))}
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {course.title}
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                {course.description}
              </p>
              
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-8">
                <div className="flex items-center">
                  <img 
                    src={course.instructor.avatar} 
                    alt={course.instructor.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <span className="text-sm text-gray-400">Instrutor</span>
                    <h3 className="font-medium">{course.instructor.name}</h3>
                  </div>
                </div>
                
                <div>
                  <span className="text-sm text-gray-400">Capítulos do curso</span>
                  <h3 className="font-medium">{course.chapters.length} 章节</h3>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="bg-white text-black px-6 py-3 font-medium rounded flex items-center hover:bg-gray-200 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Assistir ao trailer do curso
                </button>
                <Link 
                  to="/subscription"
                  className="border border-white px-6 py-3 font-medium rounded hover:bg-white hover:text-black transition-colors"
                >
                  Assinar curso
                </Link>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl border border-gray-800">
                <img 
                  src={course.cover_image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <button 
                    onClick={() => setIsVideoModalOpen(true)}
                    className="h-16 w-16 rounded-full bg-white bg-opacity-90 flex items-center justify-center hover:bg-opacity-100 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="container mx-auto px-4 md:px-6 py-16">
        {/* Navigation */}
        <div className="border-b border-gray-800 mb-10">
          <div className="flex overflow-x-auto space-x-8">
            <button 
              className={`pb-4 px-1 font-medium text-lg whitespace-nowrap ${activeSection === 'overview' ? 'border-b-2 border-white text-white' : 'text-gray-400'}`}
              onClick={() => setActiveSection('overview')}
            >
              Visão geral do curso
            </button>
            <button 
              className={`pb-4 px-1 font-medium text-lg whitespace-nowrap ${activeSection === 'content' ? 'border-b-2 border-white text-white' : 'text-gray-400'}`}
              onClick={() => setActiveSection('content')}
            >
              Conteúdo do curso
            </button>
            <button 
              className={`pb-4 px-1 font-medium text-lg whitespace-nowrap ${activeSection === 'instructor' ? 'border-b-2 border-white text-white' : 'text-gray-400'}`}
              onClick={() => setActiveSection('instructor')}
            >
              Instrutor介绍
            </button>
            <button 
              className={`pb-4 px-1 font-medium text-lg whitespace-nowrap ${activeSection === 'reviews' ? 'border-b-2 border-white text-white' : 'text-gray-400'}`}
              onClick={() => setActiveSection('reviews')}
            >
              Avaliações dos alunos
            </button>
          </div>
        </div>

        {/* Content sections */}
        {activeSection === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Visão geral do curso</h2>
              <div className="prose prose-lg prose-invert max-w-none">
                <p>{course.description}</p>
                <h3>O que você vai aprender</h3>
                <ul className="space-y-2">
                  {course.chapters.map((chapter, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 flex-shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{chapter}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="bg-zinc-900 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-6">Detalhes do curso</h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-center pb-4 border-b border-gray-800">
                  <span className="text-gray-400">Duração do curso</span>
                  <span>约 6 小时</span>
                </li>
                <li className="flex justify-between items-center pb-4 border-b border-gray-800">
                  <span className="text-gray-400">Nível de dificuldade</span>
                  <span>{course.level}</span>
                </li>
                <li className="flex justify-between items-center pb-4 border-b border-gray-800">
                  <span className="text-gray-400">Número de capítulos</span>
                  <span>{course.chapters.length} 章节</span>
                </li>
                <li className="flex justify-between items-center pb-4 border-b border-gray-800">
                  <span className="text-gray-400">Idioma</span>
                  <span>中文</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-400">Preço</span>
                  <div>
                    {course.pricing?.discount_percent > 0 ? (
                      <div className="text-right">
                        <span className="text-gray-400 line-through mr-2">¥{course.pricing.original}</span>
                        <span className="font-bold">¥{course.pricing.current}</span>
                      </div>
                    ) : (
                      <span className="font-bold">¥{course.pricing?.original || "会员订阅"}</span>
                    )}
                  </div>
                </li>
              </ul>
              <div className="mt-8">
                <Link 
                  to="/subscription"
                  className="block bg-white text-black text-center py-3 font-medium rounded hover:bg-gray-200 transition-colors"
                >
                  Assine para desbloquear
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'content' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Conteúdo do curso</h2>
            <div className="space-y-4">
              {course.chapters.map((chapter, idx) => (
                <div key={idx} className="bg-zinc-900 rounded-lg overflow-hidden">
                  <button className="w-full flex items-center justify-between p-5 text-left">
                    <div className="flex items-center">
                      <span className="bg-zinc-800 text-white flex items-center justify-center h-8 w-8 rounded-full mr-4 flex-shrink-0">
                        {idx + 1}
                      </span>
                      <h3 className="font-medium">{chapter}</h3>
                    </div>
                    <span className="text-sm text-gray-400">Prévia indisponível</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'instructor' && (
          <div>
            <h2 className="text-2xl font-bold mb-8">Instrutor介绍</h2>
            <div className="flex flex-col md:flex-row items-start gap-8">
              <img 
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-24 h-24 md:w-40 md:h-40 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-2xl font-bold mb-2">{course.instructor.name}</h3>
                <p className="text-gray-400 mb-4">{course.instructor.bio}</p>
                <div className="prose prose-invert max-w-none">
                  <p>Como especialista na área，{course.instructor.name}老师拥有多年的实战经验和教学经验，帮助众多学员成功掌握相关技能，并在实际工作中取得了显著的成果。</p>
                  <p>他/她的授课风格通俗易懂，结合实际案例，让学员能够快速理解并应用所学知识。</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'reviews' && (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start mb-8">
              <h2 className="text-2xl font-bold">Avaliações dos alunos</h2>
              <div className="flex items-center mt-4 md:mt-0">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-lg font-medium">4.8 / 5.0</span>
                <span className="ml-2 text-gray-400">({course.testimonials?.length || 0} 条评价)</span>
              </div>
            </div>
            
            {course.testimonials && course.testimonials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {course.testimonials.map((testimonial, idx) => (
                  <div key={idx} className="bg-zinc-900 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="h-10 w-10 rounded-full object-cover mr-3"
                      />
                      <div>
                        <h4 className="font-medium">{testimonial.name}</h4>
                        <p className="text-sm text-gray-400">{testimonial.job}</p>
                      </div>
                      <div className="ml-auto flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-300">{testimonial.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-zinc-900 rounded-lg">
                <p className="text-gray-400">Sem avaliações</p>
              </div>
            )}
          </div>
        )}
      </section>
      
      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="relative w-full max-w-4xl mx-4">
            <button 
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            
            <div className="aspect-video bg-black">
              {course.trailer_video ? (
                <video
                  className="w-full h-full"
                  controls
                  autoPlay
                >
                  <source src={course.trailer_video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-gray-400">Trailer indisponível</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursePage;