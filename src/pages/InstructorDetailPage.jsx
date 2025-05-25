import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CourseContext } from '../context/CourseContext';

const InstructorDetailPage = () => {
  const { id } = useParams();
  const { getInstructorById, filterCourses, loading } = useContext(CourseContext);
  const [instructor, setInstructor] = useState(null);
  const [instructorCourses, setInstructorCourses] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  
  // Mock additional instructor details that might not be in the original data
  const instructorAdditionalInfo = {
    achievements: [
      "行业10年从业经验",
      "畅销书作家",
      "曾服务50+知名企业",
      "Ted演讲嘉宾"
    ],
    background: "拥有丰富的实战与教学经验，专注于将复杂概念简化为易于理解的内容。曾在多家知名企业担任顾问，深入了解行业需求和发展趋势。",
    education: "北京大学计算机科学硕士",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      website: "https://example.com"
    }
  };

  useEffect(() => {
    if (id) {
      const instructorData = getInstructorById(parseInt(id));
      if (instructorData) {
        setInstructor(instructorData);
        
        // Get courses taught by this instructor
        const courses = filterCourses({ instructorId: id });
        setInstructorCourses(courses);
      }
    }

    // Animation effect for content
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [id, getInstructorById, filterCourses]);

  if (loading || !instructor) {
    return (
      <div className="container mx-auto px-4 py-24 min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-2xl">Loading instructor details...</div>
      </div>
    );
  }

  return (
    <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section with Instructor Photo */}
      <div className="bg-gradient-to-b from-gray-900 to-black pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto">
            <div className="md:w-1/3 mb-8 md:mb-0">
              <div className="w-64 h-64 mx-auto overflow-hidden rounded-full border-4 border-yellow-500">
                <img 
                  src={instructor.avatar} 
                  alt={instructor.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:w-2/3 text-center md:text-left md:pl-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{instructor.name}</h1>
              <div className="mb-6 flex flex-wrap gap-2 justify-center md:justify-start">
                {instructorCourses.slice(0, 3).map(course => 
                  course.skill_tags && course.skill_tags.slice(0, 1).map((tag, index) => (
                    <span key={index} className="text-sm bg-yellow-800 bg-opacity-40 text-yellow-300 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))
                )}
              </div>
              <p className="text-xl text-gray-300 mb-6">{instructor.bio}</p>
              
              {/* Social Links */}
              <div className="flex space-x-4 justify-center md:justify-start">
                <a href={instructorAdditionalInfo.social.twitter} className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href={instructorAdditionalInfo.social.linkedin} className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                  </svg>
                </a>
                <a href={instructorAdditionalInfo.social.website} className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructor Background & Achievements */}
      <div className="bg-black py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Background */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">专业背景</h2>
              <p className="text-gray-300 mb-6">{instructorAdditionalInfo.background}</p>
              
              <h3 className="text-xl font-bold mb-3">教育背景</h3>
              <p className="text-gray-300 mb-6">{instructorAdditionalInfo.education}</p>
              
              <h3 className="text-xl font-bold mb-3">教学理念</h3>
              <p className="text-gray-300">
                我相信学习是一个实践的过程。我的课程注重理论与实战相结合，帮助学员快速掌握实用技能，并能够立即应用于实际工作中。
              </p>
            </div>
            
            {/* Achievements */}
            <div>
              <h2 className="text-2xl font-bold mb-4">成就与专长</h2>
              <ul className="space-y-4">
                {instructorAdditionalInfo.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-400 mr-2">✓</span>
                    <span className="text-gray-300">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Instructor Courses */}
      <div className="bg-gradient-to-b from-black to-gray-900 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {instructor.name}的课程 
            <span className="text-yellow-400 ml-2">({instructorCourses.length})</span>
          </h2>

          {instructorCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {instructorCourses.map(course => (
                <Link 
                  to={`/course/${course.id}`} 
                  key={course.id}
                  className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-xl hover:shadow-yellow-900/20 transition-all transform hover:-translate-y-1"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={course.cover_image} 
                      alt={course.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 line-clamp-1">{course.title}</h3>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {course.skill_tags && course.skill_tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <p className="text-gray-400 mb-4 text-sm line-clamp-2">{course.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-yellow-400">
                        {course.chapters?.length || 0} 章节
                      </span>
                      <span className="text-gray-400 text-sm">查看课程 →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">该讲师暂无课程</p>
            </div>
          )}
        </div>
      </div>

      {/* Back to All Instructors */}
      <div className="bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center">
          <Link 
            to="/instructors"
            className="inline-flex items-center text-yellow-400 hover:text-yellow-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            返回全部讲师
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstructorDetailPage;