import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  name: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbNavigationProps {
  className?: string;
  customBreadcrumbs?: BreadcrumbItem[];
  pageTitle?: string;
}

const BreadcrumbNavigation = ({ className, customBreadcrumbs, pageTitle }: BreadcrumbNavigationProps) => {
  const location = useLocation();
  
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs: BreadcrumbItem[] = [
      {
        name: 'Home',
        href: '/',
        current: location.pathname === '/'
      }
    ];

    let currentPath = '';
    
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      let name = '';
      const isLast = index === pathSegments.length - 1;
      
      // Generate human-readable names based on route patterns
      switch (segment) {
        case 'convert':
          name = 'Currency Converter';
          break;
        case 'blog':
          name = 'Blog';
          break;
        case 'charts':
          name = 'Charts & Analytics';
          break;
        case 'alerts':
          name = 'Price Alerts';
          break;
        case 'travel':
          name = 'Travel Money';
          break;
        case 'faq':
          name = 'FAQ';
          break;
        case 'privacy-policy':
          name = 'Privacy Policy';
          break;
        case 'terms-of-service':
          name = 'Terms of Service';
          break;
        default:
          // Handle currency pair routes like "usd-to-eur"
          if (segment.includes('-to-')) {
            const [from, , to] = segment.split('-');
            name = `${from.toUpperCase()} to ${to.toUpperCase()}`;
          }
          // Handle blog post slugs
          else if (location.pathname.startsWith('/blog/')) {
            name = pageTitle || segment.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
          }
          // Default: convert kebab-case to Title Case
          else {
            name = segment.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
          }
      }
      
      breadcrumbs.push({
        name,
        href: currentPath,
        current: isLast
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();
  
  // Don't show breadcrumbs on home page unless there are custom ones
  if (location.pathname === '/' && !customBreadcrumbs) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center space-x-1 text-sm text-muted-foreground", className)}>
      <ol className="flex items-center space-x-1">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
            
            {breadcrumb.current ? (
              <span 
                className="font-medium text-foreground"
                aria-current="page"
              >
                {index === 0 && <Home className="h-4 w-4 mr-1 inline" />}
                {breadcrumb.name}
              </span>
            ) : (
              <Link 
                to={breadcrumb.href}
                className="hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-1 py-0.5"
              >
                {index === 0 && <Home className="h-4 w-4 mr-1 inline" />}
                {breadcrumb.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;