// This file contains utilities for fetching course data from the API

// Helper function to simulate API delay (for development purposes)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch all courses
 * @returns {Promise<Array>} Array of course objects
 */
export const fetchCourses = async () => {
  try {
    // In a real application, this would be an API call to your backend
    // For now, we'll fetch from the local JSON file
    const response = await fetch('/data/processed_courses.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const courses = await response.json();
    
    // Simulate API delay
    await delay(800);
    
    return courses;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw new Error('Failed to fetch courses. Please try again later.');
  }
};

/**
 * Fetch a specific course by ID
 * @param {number|string} id - Course ID
 * @returns {Promise<Object>} Course object
 */
export const fetchCourseById = async (id) => {
  try {
    // In a real application, this would be a specific API endpoint
    // For now, we'll fetch all courses and filter
    const allCourses = await fetchCourses();
    const course = allCourses.find(c => c.id === parseInt(id));
    
    if (!course) {
      throw new Error(`Course with ID ${id} not found`);
    }
    
    // Simulate API delay
    await delay(300);
    
    return course;
  } catch (error) {
    console.error(`Error fetching course ${id}:`, error);
    throw new Error('Failed to fetch course. Please try again later.');
  }
};

/**
 * Extract unique instructors from course data
 * @returns {Promise<Array>} Array of instructor objects
 */
export const fetchInstructors = async () => {
  try {
    const courses = await fetchCourses();
    
    // Extract instructors and remove duplicates
    const instructorMap = new Map();
    let instructorId = 1;
    
    courses.forEach(course => {
      const instructor = { ...course.instructor };
      const instructorName = instructor.name;
      
      // If this instructor doesn't exist yet, add them
      if (!instructorMap.has(instructorName)) {
        // Assign a consistent ID
        instructor.id = instructorId++;
        // Track courses taught by this instructor
        instructor.courseIds = [course.id];
        instructorMap.set(instructorName, instructor);
      } else {
        // Add this course to the instructor's course list
        const existingInstructor = instructorMap.get(instructorName);
        if (!existingInstructor.courseIds.includes(course.id)) {
          existingInstructor.courseIds.push(course.id);
        }
      }
      
      // Ensure the course references the instructor by ID
      course.instructor.id = instructorMap.get(instructorName).id;
    });
    
    return Array.from(instructorMap.values());
  } catch (error) {
    console.error('Error fetching instructors:', error);
    throw new Error('Failed to fetch instructors. Please try again later.');
  }
};

/**
 * Get popular categories from courses
 * @param {number} limit - Maximum number of categories to return
 * @returns {Promise<Array>} Array of category objects with name and count
 */
export const getPopularCategories = async (limit = 6) => {
  try {
    const courses = await fetchCourses();
    
    // Count occurrences of each category/tag
    const categoryCountMap = {};
    
    courses.forEach(course => {
      if (course.skill_tags) {
        course.skill_tags.forEach(tag => {
          if (!categoryCountMap[tag]) {
            categoryCountMap[tag] = 0;
          }
          categoryCountMap[tag] += 1;
        });
      }
    });
    
    // Convert to array and sort
    const categories = Object.keys(categoryCountMap).map(name => ({
      name,
      count: categoryCountMap[name]
    }));
    
    categories.sort((a, b) => b.count - a.count);
    
    return categories.slice(0, limit);
  } catch (error) {
    console.error('Error getting categories:', error);
    throw new Error('Failed to fetch categories. Please try again later.');
  }
};