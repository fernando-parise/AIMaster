const fs = require('fs');
const path = require('path');
const https = require('https');
const { ImageGetter } = require('metagpt/tools/libs/image_getter');

// Define paths
const instructorsImgDir = path.join(__dirname, '../public/images/instructors');
const coursesImgDir = path.join(__dirname, '../public/images/courses');

// Ensure the image directories exist
if (!fs.existsSync(instructorsImgDir)) {
  fs.mkdirSync(instructorsImgDir, { recursive: true });
}

if (!fs.existsSync(coursesImgDir)) {
  fs.mkdirSync(coursesImgDir, { recursive: true });
}

// Function to get absolute path for image
function getAbsolutePath(dir, filename) {
  return path.resolve(path.join(dir, filename));
}

// Generate instructor images
async function generateInstructorImages() {
  console.log("Generating instructor images...");
  
  const instructorSearchTerms = [
    "professional headshot of an Asian male AI expert in business attire, neutral background",
    "professional headshot of an Asian female tech educator in business attire, neutral background",
    "professional portrait of an Asian male data scientist in business attire, neutral background",
    "professional portrait of an Asian female marketing expert in business attire, neutral background",
    "professional headshot of an Asian male photographer with camera, neutral background"
  ];
  
  for (let id = 1; id <= instructorSearchTerms.length; id++) {
    const imagePath = getAbsolutePath(instructorsImgDir, `instructor_${id}.jpg`);
    const searchTerm = instructorSearchTerms[id - 1];
    
    try {
      console.log(`Generating instructor image ${id}...`);
      const relativePath = await ImageGetter.get(searchTerm, imagePath, "search");
      console.log(`Generated instructor image: ${relativePath}`);
    } catch (error) {
      console.error(`Error generating instructor image ${id}:`, error);
    }
  }
  
  console.log("All instructor images generated!");
}

// Generate course cover images
async function generateCourseImages() {
  console.log("Generating course cover images...");
  
  const courseSearchTerms = [
    "AI personal branding concept art, digital profile enhancement",
    "modern photography studio with professional equipment",
    "data visualization dashboard with analytics charts",
    "digital marketing strategy concepts and tools",
    "e-commerce showcase with beautiful product photography",
    "programming code on screen with modern workspace",
    "professional video production set with equipment",
    "content writing workspace with creative elements",
    "user experience design tools and interfaces",
    "social media marketing platforms visualization",
    "mobile app development concept with devices",
    "podcasting studio setup with microphones",
    "personal finance management visualization with charts",
    "blockchain technology visualization concept",
    "web development modern workspace with code",
    "creative workspace for multimedia design",
    "AI robotics concept visualization"
  ];
  
  for (let id = 1; id <= courseSearchTerms.length; id++) {
    const imagePath = getAbsolutePath(coursesImgDir, `course_${id}.jpg`);
    const searchTerm = courseSearchTerms[id - 1];
    
    try {
      console.log(`Generating course image ${id}...`);
      const relativePath = await ImageGetter.get(searchTerm, imagePath, "search");
      console.log(`Generated course image: ${relativePath}`);
    } catch (error) {
      console.error(`Error generating course image ${id}:`, error);
    }
  }
  
  console.log("All course images generated!");
}

// Main execution function
async function main() {
  try {
    // Generate all the required images
    await generateInstructorImages();
    await generateCourseImages();
    
    console.log("Image generation complete!");
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the script
main();