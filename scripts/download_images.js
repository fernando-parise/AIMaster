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

// Function to get instructor image descriptions based on ID
function getInstructorImageDescription(id) {
  const descriptions = {
    1: "professional headshot of an Asian male AI expert in business attire, neutral background",
    2: "professional headshot of an Asian female tech educator in business attire, neutral background",
    3: "professional portrait of an Asian male data scientist in business attire, neutral background",
    4: "professional portrait of an Asian female marketing expert in business attire, neutral background",
    5: "professional headshot of an Asian male photographer with camera, neutral background"
  };
  return descriptions[id] || "professional portrait Asian educator, neutral background";
}

// Function to get course image descriptions based on ID
function getCourseImageDescription(id) {
  const descriptions = {
    1: "AI personal branding concept art, digital profile enhancement",
    2: "modern photography studio with professional equipment",
    3: "data visualization dashboard with analytics charts",
    4: "digital marketing strategy concepts and tools",
    5: "e-commerce showcase with beautiful product photography",
    6: "programming code on screen with modern workspace",
    7: "professional video production set with equipment",
    8: "content writing workspace with creative elements",
    9: "user experience design tools and interfaces",
    10: "social media marketing platforms visualization",
    11: "mobile app development concept with devices",
    12: "podcasting studio setup with microphones",
    13: "personal finance management visualization with charts",
    14: "blockchain technology visualization concept",
    15: "web development modern workspace with code",
    16: "creative workspace for multimedia design",
    17: "AI robotics concept visualization"
  };
  return descriptions[id] || "online education concept, digital learning";
}

// Generate instructor images
async function generateInstructorImages() {
  console.log("Generating instructor images...");
  
  for (let id = 1; id <= 5; id++) {
    const imagePath = path.join(instructorsImgDir, `instructor_${id}.jpg`);
    const absolutePath = path.resolve(imagePath);
    
    const searchTerm = getInstructorImageDescription(id);
    
    try {
      console.log(`Generating instructor image ${id}...`);
      const relativePath = await ImageGetter.get(searchTerm, absolutePath, "search");
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
  
  for (let id = 1; id <= 17; id++) {
    const imagePath = path.join(coursesImgDir, `course_${id}.jpg`);
    const absolutePath = path.resolve(imagePath);
    
    const searchTerm = getCourseImageDescription(id);
    
    try {
      console.log(`Generating course image ${id}...`);
      const relativePath = await ImageGetter.get(searchTerm, absolutePath, "search");
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