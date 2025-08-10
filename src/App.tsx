import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import BlogAdminDashboard from './components/BlogAdminDashboard';

// Simple homepage placeholder - replace with your actual currency converter
const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Section */}
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Currency Converter
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Real-time currency exchange rates with smart money insights. 
            Convert currencies and discover how to master your financial mindset.
          </p>
          
          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
              Start Converting
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Coming Soon: Blog
            </button>
          </div>
          
          {/* Currency Converter Placeholder */}
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Quick Currency Conversion</h2>
              
              {/* Replace this placeholder with your actual currency converter component */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>USD - US Dollar</option>
                      <option>EUR - Euro</option>
                      <option>GBP - British Pound</option>
                      <option>JPY - Japanese Yen</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>EUR - Euro</option>
                      <option>USD - US Dollar</option>
                      <option>GBP - British Pound</option>
                      <option>JPY - Japanese Yen</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <input 
                    type="number" 
                    placeholder="Enter amount" 
                    className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    €0.85
                  </div>
                  <div className="text-sm text-gray-600">
                    1 USD = 0.85 EUR
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Features Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                💱
              </div>
              <h3 className="text-lg font-semibold mb-2">Real-Time Rates</h3>
              <p className="text-gray-600">Live exchange rates updated every minute</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                📊
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Insights</h3>
              <p className="text-gray-600">Historical charts and market analysis</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                🧠
              </div>
              <h3 className="text-lg font-semibold mb-2">Money Mindset</h3>
              <p className="text-gray-600">Learn the psychology behind wealth</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Books page placeholder
const BooksPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Money Mindset Books</h1>
          <p className="text-xl text-gray-600 mb-12">
            Transform your relationship with money and build lasting wealth
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((book) => (
              <div key={book} className="bg-white rounded-lg shadow-lg p-6">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Book Cover {book}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Money Mindset Book {book}</h3>
                <p className="text-gray-600 mb-4">
                  Discover the psychology behind wealth and transform your financial future.
                </p>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple login component for admin access
const AdminLogin: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      onLogin();
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter admin password"
            />
          </div>
          {error && (
            <div className="mb-4 text-red-600 text-sm">{error}</div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/" className="text-blue-600 hover:text-blue-700 text-sm">
            ← Back to site
          </Link>
        </div>
      </div>
    </div>
  );
};

// Protected admin route component
const AdminRoute: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return <BlogAdminDashboard />;
};

// Navigation component
const Navigation: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };
  
  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-bold text-xl text-blue-600 hover:text-blue-700 transition-colors">
            💱 CurrencyApp
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                isActive('/') && location.pathname === '/' 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Converter
            </Link>
            <Link 
              to="/books" 
              className={`font-medium transition-colors ${
                isActive('/books') 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Books
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

// 404 Not Found page
const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <Link 
          to="/" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

// Main App component
const App: React.FC = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <Navigation />
          
          <Routes>
            {/* Homepage */}
            <Route path="/" element={<HomePage />} />
            
            {/* Books page */}
            <Route path="/books" element={<BooksPage />} />
            
            {/* Admin route - protected with simple password */}
            <Route path="/admin" element={<AdminRoute />} />
            
            {/* 404 - This should be the last route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;