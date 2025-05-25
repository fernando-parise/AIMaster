import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CourseContext } from '../context/CourseContext';

const InstructorsPage = () => {
  const { instructors, courses, loading } = useContext(CourseContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation effect for content
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Get course count for each instructor
  const getInstructorCourseCount = (instructorId) => {
    if (!instructorId) return 0;
    return courses.filter(course => 
      course.instructor && course.instructor.id === instructorId
    ).length;
  };

  // Get expertise areas based on their courses
  const getInstructorExpertise = (instructorId) => {
    if (!instructorId) return [];
    
    const instructorCourses = courses.filter(course => 
      course.instructor && course.instructor.id === instructorId
    );
    
    const tags = new Set();
    
    instructorCourses.forEach(course => {
      if (course.skill_tags && Array.isArray(course.skill_tags)) {
        course.skill_tags.forEach(tag => tags.add(tag));
      }
    });
    
    return Array.from(tags).slice(0, 3); // Return top 3 expertise areas
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24 min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-2xl">Loading instructors...</div>
      </div>
    );
  }

  return (
    <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}> 
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-900 to-black py-24 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Aprenda com os <span className="text-yellow-400">principais especialistas do setor</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Nossos instrutores são referências em suas áreas, com vasta experiência prática e capacidade de ensino, guiando você ao topo da sua profissão
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-black py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructors.map((instructor) => (
              <Link 
                to={`/instructor/${instructor.id}`} 
                key={instructor.id}
                className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-xl hover:shadow-yellow-900/20 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="h-72 overflow-hidden">
                  <img 
                    src={instructor.avatar} 
                    alt={instructor.name} 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{instructor.name}</h2>
                  
                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {getInstructorExpertise(instructor.id).map((tag, index) => (
                      <span key={index} className="text-xs bg-yellow-800 bg-opacity-40 text-yellow-300 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-gray-400 mb-4 line-clamp-2 h-12">{instructor.bio}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-400">{getInstructorCourseCount(instructor.id)} cursos</span>
                    <span className="text-gray-400 text-sm">Ver detalhes →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Join As Instructor CTA */}
      <div className="bg-gradient-to-r from-yellow-900/20 to-black py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Torne-se um dos nossos instrutores</h2>
          <p className="text-xl text-gray-300 mb-8">
            Se você é especialista no setor e deseja compartilhar seu conhecimento com mais aprendizes, venha fazer parte do nosso time de instrutores
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-3 rounded transition-colors">
            Candidatar-se como instrutor
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorsPage;