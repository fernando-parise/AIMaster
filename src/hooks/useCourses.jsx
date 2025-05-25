import { useState, useContext, useEffect } from 'react';
import { CourseContext } from '../context/CourseContext';

export const useCourses = (options = {}) => {
  const {
    search = '',
    category = '',
    level = '',
    instructorId = '',
    sortBy = 'popular',
    courseId = null
  } = options;

  const context = useContext(CourseContext);
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // If specific course is requested
  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;
      
      try {
        setLoading(true);
        const course = await context.getCourseById(courseId);
        setCourseData(course);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError(err.message || 'Failed to load course data');
        setLoading(false);
      }
    };
    
    fetchCourse();
  }, [courseId, context]);

  // If courses list is requested
  useEffect(() => {
    if (courseId) return; // Skip if specific course is requested
    
    try {
      setLoading(context.loading);
      
      if (!context.loading) {
        const filteredCourses = context.filterCourses({
          search,
          category,
          level,
          instructorId,
          sortBy
        });
        setCourseData(filteredCourses);
      }
      
      if (context.error) {
        setError(context.error);
      }
    } catch (err) {
      console.error('Error filtering courses:', err);
      setError(err.message || 'Failed to filter courses');
      setLoading(false);
    }
  }, [
    context.courses,
    context.loading,
    context.error,
    search,
    category,
    level,
    instructorId,
    sortBy,
    courseId,
    context
  ]);

  return {
    courses: courseId ? null : courseData,
    course: courseId ? courseData : null,
    loading,
    error
  };
};