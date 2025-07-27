import { lazy, Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load heavy components
const CurrencyConverter = lazy(() => import('@/components/CurrencyConverter'));
const HistoricalChart = lazy(() => import('@/components/HistoricalChart'));
const RateAlerts = lazy(() => import('@/components/RateAlerts'));
const TravelMoney = lazy(() => import('@/components/TravelMoney'));

interface LazyComponentProps {
  component: 'converter' | 'chart' | 'alerts' | 'travel';
  fallback?: React.ReactNode;
  className?: string;
  props?: any; // Allow passing props to components
}

const LazyComponent = ({ component, fallback, className, props = {} }: LazyComponentProps) => {
  const defaultFallback = (
    <div className={`space-y-4 ${className}`}>
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-8 w-3/4" />
    </div>
  );

  const components = {
    converter: CurrencyConverter,
    chart: HistoricalChart,
    alerts: RateAlerts,
    travel: TravelMoney,
  };

  const Component = components[component];

  // Default props for components that require them
  const getDefaultProps = () => {
    switch (component) {
      case 'chart':
        return {
          fromCurrency: 'USD',
          toCurrency: 'EUR',
          currentRate: 1.1,
          ...props
        };
      default:
        return props;
    }
  };

  return (
    <Suspense fallback={fallback || defaultFallback}>
      <Component {...getDefaultProps()} />
    </Suspense>
  );
};

export default LazyComponent;