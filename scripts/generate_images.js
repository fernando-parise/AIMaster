// This script uses the ImageGetter tool to generate high-quality images 
// for instructors and course covers based on the processed_courses.json data.

// Import necessary modules
const fs = require('fs');
const path = require('path');

// Define paths
const coursesJsonPath = path.join(__dirname, '../public/data/processed_courses.json');
const instructorsImgDir = path.join(__dirname, '../public/images/instructors');
const coursesImgDir = path.join(__dirname, '../public/images/courses');

// Ensure the image directories exist
if (!fs.existsSync(instructorsImgDir)) {
  fs.mkdirSync(instructorsImgDir, { recursive: true });
}

if (!fs.existsSync(coursesImgDir)) {
  fs.mkdirSync(coursesImgDir, { recursive: true });
}

// Generate instructor images
async function generateInstructorImages(courses) {
  console.log("Generating instructor images...");
  
  // Create a Set to track unique instructors to avoid duplicates
  const processedInstructors = new Set();
  
  for (const course of courses) {
    const instructor = course.instructor;
    
    // Skip if we've already processed this instructor
    if (processedInstructors.has(instructor.name)) {
      continue;
    }
    
    processedInstructors.add(instructor.name);
    
    // Extract instructor ID from the avatar path or use a counter
    const instructorIdMatch = instructor.avatar.match(/instructor_(\d+)\.jpg/);
    const instructorId = instructorIdMatch ? instructorIdMatch[1] : processedInstructors.size;
    
    // Create a descriptive prompt based on instructor info
    let profession = "";
    if (instructor.bio.includes("AI")) profession = "AI expert";
    else if (instructor.bio.includes("互联网")) profession = "tech professional";
    else if (instructor.bio.includes("摄影")) profession = "photographer";
    else if (instructor.bio.includes("营销")) profession = "marketing professional";
    else profession = "professional educator";
    
    const imagePath = path.join(instructorsImgDir, `instructor_${instructorId}.jpg`);
    const absolutePath = path.resolve(imagePath);
    
    // Create instructor image description based on name and bio
    const gender = instructor.name.includes("李") || instructor.name.includes("王") || 
                  instructor.name.includes("张") || instructor.name.includes("陈") ? 
                  "Chinese" : "Asian";
    
    const searchTerm = `professional headshot portrait of a ${gender} ${profession}, business attire, neutral background, high quality, studio lighting`;
    
    // Use the ImageGetter tool to generate and save the image
    const relativePath = await ImageGetter.get(searchTerm, absolutePath, "create");
    console.log(`Generated instructor image: ${relativePath}`);
  }
  
  console.log("All instructor images generated!");
}

// Generate course cover images
async function generateCourseImages(courses) {
  console.log("Generating course cover images...");
  
  for (const course of courses) {
    // Extract course ID from the cover image path
    const courseIdMatch = course.cover_image.match(/course_(\d+)\.jpg/);
    const courseId = courseIdMatch ? courseIdMatch[1] : course.id;
    
    const imagePath = path.join(coursesImgDir, `course_${courseId}.jpg`);
    const absolutePath = path.resolve(imagePath);
    
    // Create a descriptive prompt based on the course content
    let searchTerm = "";
    
    // Map course topics to appropriate image descriptions
    if (course.title.includes("AI")) {
      searchTerm = `professional image of AI technology, futuristic, digital art, related to ${course.title}, high quality`;
    } else if (course.title.includes("摄影")) {
      searchTerm = `professional photography equipment, camera, artistic photography scene, related to ${course.title}, high quality`;
    } else if (course.title.includes("设计")) {
      searchTerm = `graphic design workspace, creative design elements, design tools, related to ${course.title}, high quality`;
    } else if (course.title.includes("营销")) {
      searchTerm = `marketing strategy visualization, digital marketing concept, business growth charts, related to ${course.title}, high quality`;
    } else if (course.title.includes("数据")) {
      searchTerm = `data visualization, analytics dashboard, data science concept art, related to ${course.title}, high quality`;
    } else {
      searchTerm = `professional education concept for ${course.title}, online learning visualization, high quality course banner`;
    }
    
    // Use the ImageGetter tool to generate and save the image
    const relativePath = await ImageGetter.get(searchTerm, absolutePath, "create");
    console.log(`Generated course image: ${relativePath}`);
  }
  
  console.log("All course images generated!");
}

// Main execution function
async function main() {
  try {
    // Read the courses data
    const rawData = fs.readFileSync(coursesJsonPath, 'utf8');
    const courses = JSON.parse(rawData);
    
    console.log(`Found ${courses.length} courses in the JSON file.`);
    
    // Generate all the required images
    await generateInstructorImages(courses);
    await generateCourseImages(courses);
    
    console.log("Image generation complete!");
    
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the script
main();