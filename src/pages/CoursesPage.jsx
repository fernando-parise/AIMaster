import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCourses } from '../hooks/useCourses';

const CoursesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  // Extract filter parameters from URL
  const [filters, setFilters] = useState({
    search: queryParams.get('search') || '',
    category: queryParams.get('category') || '',
    level: queryParams.get('level') || '',
    sortBy: queryParams.get('sort') || 'popular',
  });
  
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const { courses, loading, error } = useCourses(filters);
  
  // Available filter options
  const levelOptions = ['Básico', 'Intermediário', 'Avançado'];
  
  // Extract unique categories from courses
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    if (courses && courses.length > 0) {
      const uniqueCategories = new Set();
      courses.forEach(course => {
        course.skill_tags.forEach(tag => uniqueCategories.add(tag));
      });
      setCategories(Array.from(uniqueCategories));
    }
  }, [courses]);
  
  // Update URL when filters change
  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (filters.search) queryParams.set('search', filters.search);
    if (filters.category) queryParams.set('category', filters.category);
    if (filters.level) queryParams.set('level', filters.level);
    if (filters.sortBy && filters.sortBy !== 'popular') queryParams.set('sort', filters.sortBy);
    
    navigate(`${location.pathname}?${queryParams.toString()}`);
  }, [filters, navigate, location.pathname]);
  
  // Handle search input
  const handleSearchChange = (e) => {
    setFilters({...filters, search: e.target.value});
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Search is already updated in filters state due to handleSearchChange
  };
  
  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters({...filters, [filterType]: value});
  };
  
  // Clear all filters
  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      level: '',
      sortBy: 'popular',
    });
  };

  return (
    <div className="bg-black text-white min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Explorar todos os cursos</h1>
          <p className="text-xl text-gray-300">Cursos online de alta qualidade ministrados por especialistas líderes do setor</p>
        </div>
        
        {/* Search and Filters */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            {/* Search bar */}
            <div className="flex-grow">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Pesquisar Curso..."
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg py-3 px-4 pr-10 text-white focus:outline-none focus:border-white"
                  value={filters.search}
                  onChange={handleSearchChange}
                />
                <button 
                  type="submit" 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
            </div>
            
            {/* Sort by dropdown */}
            <div className="min-w-[180px]">
              <select 
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg py-3 px-4 appearance-none cursor-pointer focus:outline-none focus:border-white"
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              >
                <option value="popular">Mais popular</option>
                <option value="newest">Mais recentes</option>
                <option value="price-low">Preço do menor para o maior</option>
                <option value="price-high">Preço do maior para o menor</option>
              </select>
            </div>
            
            {/* Mobile filter button */}
            <button 
              className="md:hidden bg-zinc-900 border border-zinc-700 rounded-lg py-3 px-4 flex items-center justify-center"
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zm0 8a1 1 0 011-1h10a1 1 0 110 2H4a1 1 0 01-1-1zm0 8a1 1 0 011-1h4a1 1 0 110 2H4a1 1 0 01-1-1z" />
              </svg>
              筛选
            </button>
          </div>
          
          {/* Active filters */}
          {(filters.category || filters.level || filters.search) && (
            <div className="flex flex-wrap items-center mt-4 gap-2">
              <span className="text-sm text-gray-400">Filtros ativos:</span>
              
              {filters.search && (
                <span className="bg-zinc-800 text-white text-sm rounded-full px-3 py-1 flex items-center">
                  Busca: {filters.search}
                  <button 
                    onClick={() => handleFilterChange('search', '')}
                    className="ml-2 text-gray-400 hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              
              {filters.category && (
                <span className="bg-zinc-800 text-white text-sm rounded-full px-3 py-1 flex items-center">
                  Categoria: {filters.category}
                  <button 
                    onClick={() => handleFilterChange('category', '')}
                    className="ml-2 text-gray-400 hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              
              {filters.level && (
                <span className="bg-zinc-800 text-white text-sm rounded-full px-3 py-1 flex items-center">
                  Nível: {filters.level}
                  <button 
                    onClick={() => handleFilterChange('level', '')}
                    className="ml-2 text-gray-400 hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              
              <button 
                onClick={clearFilters}
                className="text-sm text-gray-400 hover:text-white ml-2"
              >
                Limpar tudo
              </button>
            </div>
          )}
          
          {/* Mobile filter menu */}
          {isFilterMenuOpen && (
            <div className="mt-4 p-4 bg-zinc-900 rounded-lg border border-zinc-700 md:hidden">
              <h3 className="font-medium mb-3">Nível do Curso</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {levelOptions.map((level) => (
                  <button
                    key={level}
                    className={`px-3 py-1 rounded-full text-sm ${
                      filters.level === level 
                        ? 'bg-white text-black' 
                        : 'bg-zinc-800 text-white hover:bg-zinc-700'
                    }`}
                    onClick={() => handleFilterChange('level', filters.level === level ? '' : level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
              
              <h3 className="font-medium mb-3">Categoria do Curso</h3>
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 10).map((category) => (
                  <button
                    key={category}
                    className={`px-3 py-1 rounded-full text-sm ${
                      filters.category === category 
                        ? 'bg-white text-black' 
                        : 'bg-zinc-800 text-white hover:bg-zinc-700'
                    }`}
                    onClick={() => handleFilterChange('category', filters.category === category ? '' : category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Desktop sidebar + courses grid layout */}
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Desktop sidebar filters */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="font-medium text-lg mb-4">Nível do Curso</h3>
                <div className="space-y-2">
                  {levelOptions.map((level) => (
                    <button
                      key={level}
                      className={`flex items-center w-full px-3 py-2 rounded-lg text-left ${
                        filters.level === level 
                          ? 'bg-white text-black' 
                          : 'hover:bg-zinc-900'
                      }`}
                      onClick={() => handleFilterChange('level', filters.level === level ? '' : level)}
                    >
                      <span>{level}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-4">Categoria do Curso</h3>
                <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`flex items-center w-full px-3 py-2 rounded-lg text-left ${
                        filters.category === category 
                          ? 'bg-white text-black' 
                          : 'hover:bg-zinc-900'
                      }`}
                      onClick={() => handleFilterChange('category', filters.category === category ? '' : category)}
                    >
                      <span>{category}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Courses grid */}
          <div className="flex-grow">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <h2 className="text-xl font-medium mb-2">Falha ao carregar</h2>
                  <p className="text-gray-400 mb-4">{error}</p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="bg-white text-black px-4 py-2 rounded"
                  >
                    Tentar novamente
                  </button>
                </div>
              </div>
            ) : courses && courses.length > 0 ? (
              <div>
                <p className="mb-6 text-gray-400">Mostrando {courses.length} resultados de Cursos</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <Link 
                      key={course.id}
                      to={`/course/${course.id}`}
                      className="group"
                    >
                      <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
                        <img 
                          src={course.cover_image} 
                          alt={course.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <div className="p-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-black">
                              {course.level}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center mb-2">
                        <img 
                          src={course.instructor.avatar} 
                          alt={course.instructor.name}
                          className="w-8 h-8 rounded-full object-cover mr-2"
                        />
                        <span className="text-sm text-gray-400">{course.instructor.name}</span>
                      </div>

                      <h3 className="text-xl font-bold mb-1 group-hover:text-gray-300 transition-colors">
                        {course.title}
                      </h3>

                      <p className="text-gray-400 line-clamp-2 text-sm mb-3">
                        {course.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          {course.skill_tags.slice(0, 2).map((tag, idx) => (
                            <span key={idx} className="text-xs text-gray-400">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        
                        {course.pricing && (
                          <div className="text-right">
                            {course.pricing.discount_percent > 0 ? (
                              <>
                                <span className="text-gray-400 line-through text-sm mr-2">
                                  ¥{course.pricing.original}
                                </span>
                                <span className="font-bold">
                                  ¥{course.pricing.current}
                                </span>
                              </>
                            ) : (
                              <span className="font-bold">¥{course.pricing.original}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-medium mb-2">Nenhum Curso encontrado</h3>
                <p className="text-gray-400 mb-6 max-w-md">
                  Nenhum curso corresponde aos filtros atuais. Tente ajustar sua busca ou limpar os filtros.
                </p>
                <button 
                  onClick={clearFilters}
                  className="bg-white text-black px-5 py-2 rounded font-medium hover:bg-gray-200 transition-colors"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;