import React, { createContext, useState, useEffect } from 'react';
import { fetchCourses, fetchCourseById, fetchInstructors } from '../utils/api';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch all courses on component mount
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const coursesData = await fetchCourses();
        setCourses(coursesData);
        
        // Also fetch instructors data
        const instructorsData = await fetchInstructors();
        setInstructors(instructorsData);
        
        setLoading(false);
      } catch (err) {
        console.error('Error loading courses:', err);
        setError('Failed to load courses. Please try again later.');
        setLoading(false);
      }
    };
    
    loadCourses();
  }, []);
  
  // Get course by ID
  const getCourseById = async (id) => {
    // First check if we already have this course in state
    const existingCourse = courses.find(course => course.id === parseInt(id));
    if (existingCourse) return existingCourse;
    
    // If not, fetch it from API
    try {
      const course = await fetchCourseById(id);
      return course;
    } catch (err) {
      console.error('Error loading course:', err);
      throw new Error('Failed to load course. Please try again later.');
    }
  };
  
  // Filter courses by various criteria
  const filterCourses = ({ 
    search = '', 
    category = '', 
    level = '',
    instructorId = '',
    sortBy = 'popular' // 'popular', 'newest', 'price-low', 'price-high'
  }) => {
    let filtered = [...courses];
    
    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchLower) || 
        course.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by category/tag
    if (category) {
      filtered = filtered.filter(course => 
        course.skill_tags && course.skill_tags.some(tag => tag.toLowerCase() === category.toLowerCase())
      );
    }
    
    // Filter by level
    if (level) {
      filtered = filtered.filter(course => course.level === level);
    }
    
    // Filter by instructor (improved to ensure correct ID matching)
    if (instructorId) {
      const instructorIdInt = parseInt(instructorId);
      filtered = filtered.filter(course => 
        course.instructor && course.instructor.id === instructorIdInt
      );
    }
    
    // Sort results
    switch (sortBy) {
      case 'newest':
        // Assuming each course has a 'createdAt' property
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'price-low':
        filtered.sort((a, b) => 
          (a.pricing?.current || a.pricing?.original || 0) - 
          (b.pricing?.current || b.pricing?.original || 0)
        );
        break;
      case 'price-high':
        filtered.sort((a, b) => 
          (b.pricing?.current || b.pricing?.original || 0) - 
          (a.pricing?.current || a.pricing?.original || 0)
        );
        break;
      case 'popular':
      default:
        // Assuming each course has some 'popularity' measure (e.g., enrollment count)
        // For now, we'll just use the default order from the API
        break;
    }
    
    return filtered;
  };
  
  // Get instructor by ID
  const getInstructorById = (id) => {
    return instructors.find(instructor => instructor.id === parseInt(id));
  };
  
  // Context value
  const value = {
    courses,
    instructors,
    loading,
    error,
    getCourseById,
    filterCourses,
    getInstructorById
  };
  
  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
};