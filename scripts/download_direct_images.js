const fs = require('fs');
const path = require('path');
const https = require('https');

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

// Function to download an image from a URL and save it to the specified path
function downloadImage(url, imagePath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(imagePath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image, status code: ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded image to: ${imagePath}`);
        resolve(imagePath);
      });
    }).on('error', (err) => {
      fs.unlink(imagePath, () => {}); // Delete the file if there was an error
      reject(err);
    });
  });
}

// Instructor image URLs from Unsplash (professional headshots)
const instructorImageUrls = [
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop',  // Male professional 1
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop', // Female professional 1
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop', // Male professional 2
  'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=2670&auto=format&fit=crop', // Female professional 2
  'https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=2574&auto=format&fit=crop'  // Male professional 3
];

// Course cover image URLs from Unsplash (relevant to different course topics)
const courseImageUrls = [
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670&auto=format&fit=crop', // AI/Technology
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2538&auto=format&fit=crop', // Photography
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop', // Data analytics
  'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=2574&auto=format&fit=crop', // Marketing
  'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=2574&auto=format&fit=crop', // E-commerce
  'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2670&auto=format&fit=crop', // Programming
  'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2671&auto=format&fit=crop', // Video production
  'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2673&auto=format&fit=crop', // Content writing
  'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2670&auto=format&fit=crop', // UX Design
  'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=2574&auto=format&fit=crop', // Social media
  'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2564&auto=format&fit=crop', // Mobile app dev
  'https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=2670&auto=format&fit=crop', // Podcasting
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop', // Finance
  'https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=2532&auto=format&fit=crop', // Blockchain
  'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=2670&auto=format&fit=crop', // Web dev
  'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2671&auto=format&fit=crop', // Multimedia design
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2670&auto=format&fit=crop'  // AI robotics
];

// Download instructor images
async function downloadInstructorImages() {
  console.log("Downloading instructor images...");
  
  for (let i = 0; i < instructorImageUrls.length; i++) {
    const id = i + 1;
    const imagePath = path.join(instructorsImgDir, `instructor_${id}.jpg`);
    
    try {
      await downloadImage(instructorImageUrls[i], imagePath);
      console.log(`Downloaded instructor image ${id}`);
    } catch (error) {
      console.error(`Error downloading instructor image ${id}:`, error);
    }
  }
  
  console.log("All instructor images downloaded!");
}

// Download course cover images
async function downloadCourseImages() {
  console.log("Downloading course cover images...");
  
  for (let i = 0; i < courseImageUrls.length; i++) {
    const id = i + 1;
    const imagePath = path.join(coursesImgDir, `course_${id}.jpg`);
    
    try {
      await downloadImage(courseImageUrls[i], imagePath);
      console.log(`Downloaded course image ${id}`);
    } catch (error) {
      console.error(`Error downloading course image ${id}:`, error);
    }
  }
  
  console.log("All course images downloaded!");
}

// Main execution function
async function main() {
  try {
    // Download all the required images
    await downloadInstructorImages();
    await downloadCourseImages();
    
    console.log("Image download complete!");
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the script
main();