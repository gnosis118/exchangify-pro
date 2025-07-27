import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface BreadcrumbNavProps {
  className?: string;
}

const BreadcrumbNav = ({ className }: BreadcrumbNavProps) => {
  const location = useLocation();
  
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    ...pathSegments.map((segment, index) => {
      const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      return { label, href };
    })
  ];

  useEffect(() => {
    // Add breadcrumb structured data - recalculate breadcrumbItems inside useEffect to avoid stale closures
    const currentPathSegments = location.pathname.split('/').filter(Boolean);
    const currentBreadcrumbItems = [
      { label: 'Home', href: '/' },
      ...currentPathSegments.map((segment, index) => {
        const href = `/${currentPathSegments.slice(0, index + 1).join('/')}`;
        const label = segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        return { label, href };
      })
    ];

    if (currentBreadcrumbItems.length > 1) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": currentBreadcrumbItems.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.label,
          "item": `${window.location.origin}${item.href}`
        }))
      });
      document.head.appendChild(script);
      
      return () => {
        const existingScript = document.querySelector('script[type="application/ld+json"]');
        if (existingScript && existingScript.textContent?.includes('BreadcrumbList')) {
          document.head.removeChild(existingScript);
        }
      };
    }
  }, [location.pathname]);

  if (breadcrumbItems.length <= 1) return null;

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <BreadcrumbItem key={item.href}>
            {index === breadcrumbItems.length - 1 ? (
              <BreadcrumbPage>{item.label}</BreadcrumbPage>
            ) : (
              <>
                <BreadcrumbLink asChild>
                  <Link to={item.href}>{item.label}</Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbNav;