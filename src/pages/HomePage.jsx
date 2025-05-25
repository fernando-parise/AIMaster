import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCourses } from '../hooks/useCourses';

const HomePage = () => {
  const { courses, loading, error } = useCourses();
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [popularCategories, setPopularCategories] = useState([]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // Extract featured courses and popular categories
  useEffect(() => {
    if (courses && courses.length > 0) {
      // Get featured courses (first 6 courses)
      setFeaturedCourses(courses.slice(0, 6));

      // Extract unique categories and count courses per category
      const categoriesMap = {};
      courses.forEach(course => {
        course.skill_tags.forEach(tag => {
          if (!categoriesMap[tag]) categoriesMap[tag] = 0;
          categoriesMap[tag] += 1;
        });
      });

      // Sort categories by count and take top 6
      const sortedCategories = Object.entries(categoriesMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([name, count]) => ({ name, count }));
      
      setPopularCategories(sortedCategories);
    }
  }, [courses]);

  // Hero slider automation
  useEffect(() => {
    if (featuredCourses.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentHeroIndex(prev => (prev + 1) % featuredCourses.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [featuredCourses]);

  // Handle loading and error states
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-2">加载失败</h2>
          <p className="text-gray-400">无法加载课程数据，请稍后重试。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      {featuredCourses.length > 0 && (
        <section className="relative h-screen">
          {/* Background image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{ 
              backgroundImage: `url(${featuredCourses[currentHeroIndex].cover_image})`,
              opacity: 0.5
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
          </div>

          {/* Hero content */}
          <div className="relative h-full container mx-auto px-4 md:px-6 flex flex-col justify-center">
            <div className="max-w-3xl space-y-6">
              <div className="flex items-center">
                <img 
                  src={featuredCourses[currentHeroIndex].instructor.avatar} 
                  alt={featuredCourses[currentHeroIndex].instructor.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <span className="text-sm uppercase tracking-widest text-gray-300">由行业顶尖专家讲授</span>
                  <h3 className="text-lg font-medium">{featuredCourses[currentHeroIndex].instructor.name}</h3>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                {featuredCourses[currentHeroIndex].title}
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300">
                {featuredCourses[currentHeroIndex].description}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link 
                  to={`/course/${featuredCourses[currentHeroIndex].id}`}
                  className="bg-white text-black px-8 py-3 text-lg font-medium rounded hover:bg-gray-200 transition-colors"
                >
                  了解详情
                </Link>
                <Link 
                  to="/subscription"
                  className="border border-white px-8 py-3 text-lg font-medium rounded hover:bg-white hover:text-black transition-colors"
                >
                  立即订阅
                </Link>
              </div>
            </div>

            {/* Hero pagination */}
            <div className="absolute bottom-8 left-0 right-0">
              <div className="container mx-auto px-4 md:px-6">
                <div className="flex space-x-2">
                  {featuredCourses.slice(0, 5).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentHeroIndex(idx)}
                      className={`h-1 transition-all ${
                        idx === currentHeroIndex ? "bg-white w-8" : "bg-gray-600 w-4"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Courses */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <header className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">精选课程</h2>
              <p className="text-gray-400 max-w-2xl">由行业专家亲授的高质量课程，帮助你掌握实用技能</p>
            </div>
            <Link 
              to="/courses"
              className="hidden md:flex items-center text-sm font-medium"
            >
              查看全部课程
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </header>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredCourses.map((course) => (
              <Link 
                key={course.id}
                to={`/course/${course.id}`}
                className="group"
              >
                <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
                  <img 
                    src={course.cover_image} 
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-black">
                        {course.level}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center mb-2">
                  <img 
                    src={course.instructor.avatar} 
                    alt={course.instructor.name}
                    className="w-8 h-8 rounded-full object-cover mr-2"
                  />
                  <span className="text-sm text-gray-400">{course.instructor.name}</span>
                </div>

                <h3 className="text-xl font-bold mb-1 group-hover:text-gray-300 transition-colors">
                  {course.title}
                </h3>

                <p className="text-gray-400 line-clamp-2 text-sm mb-3">
                  {course.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {course.skill_tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="text-xs text-gray-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  {course.pricing && (
                    <div className="text-right">
                      {course.pricing.discount_percent > 0 ? (
                        <>
                          <span className="text-gray-400 line-through text-sm mr-2">
                            ¥{course.pricing.original}
                          </span>
                          <span className="font-bold">
                            ¥{course.pricing.current}
                          </span>
                        </>
                      ) : (
                        <span className="font-bold">¥{course.pricing.original}</span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link 
              to="/courses"
              className="md:hidden bg-transparent border border-white px-6 py-2 rounded text-sm font-medium hover:bg-white hover:text-black transition-colors"
            >
              查看全部课程
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4 md:px-6">
          <header className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">按类别浏览</h2>
            <p className="text-gray-400">探索各个领域的精选课程，找到适合你的学习路径</p>
          </header>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {popularCategories.map((category, idx) => (
              <Link
                key={idx}
                to={`/courses?category=${encodeURIComponent(category.name)}`}
                className="bg-zinc-800 hover:bg-zinc-700 transition-colors rounded-lg p-6 text-center"
              >
                <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                <p className="text-gray-400 text-sm">{category.count} 门课程</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">开始你的学习之旅</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              订阅我们的平台，解锁所有高质量课程，随时随地学习，提升你的技能
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/subscription"
                className="bg-white text-black px-8 py-3 text-lg font-medium rounded hover:bg-gray-200 transition-colors"
              >
                立即订阅
              </Link>
              <Link
                to="/courses"
                className="border border-white px-8 py-3 text-lg font-medium rounded hover:bg-white hover:text-black transition-colors"
              >
                浏览课程
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;