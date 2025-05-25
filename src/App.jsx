import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';
import CoursesPage from './pages/CoursesPage';
import InstructorsPage from './pages/InstructorsPage';
import InstructorDetailPage from './pages/InstructorDetailPage';
import SubscriptionPage from './pages/SubscriptionPage';
import { CourseProvider } from './context/CourseContext';

function App() {
  // Add a loading state for initial data fetch
  const [loading, setLoading] = useState(true);

  // Simulate loading state for initial animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-3xl font-bold">
          <span className="animate-pulse">AIMASTER</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <CourseProvider>
        <div className="flex flex-col min-h-screen bg-black text-white">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/course/:id" element={<CoursePage />} />
              <Route path="/instructors" element={<InstructorsPage />} />
              <Route path="/instructor/:id" element={<InstructorDetailPage />} />
              <Route path="/subscription" element={<SubscriptionPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CourseProvider>
    </Router>
  );
}

export default App;