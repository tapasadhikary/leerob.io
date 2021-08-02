
import useSWR from 'swr';

import { useState, useEffect } from 'react';

import fetcher from '@/lib/fetcher';
import MetricCard from '@/components/metrics/Card';

export default function Npm() {
    
  const { data } = useSWR('/api/npm', fetcher);
  
  const count = new Number(data?.count); 
  
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(true);

  const getLink = packageName => {
    return `https://www.npmjs.com/package/${packageName}`;
  }

  useEffect(() => {
    if(data) {
        setMetrics(data.values);
        setLoading(false);
    }
  }, [data]);

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-4 my-2 w-full">
        {
            !loading && (Object.keys(metrics) && Object.keys(metrics).map((packageName, index) => (
                <MetricCard header={packageName} link={getLink(packageName)} metric={metrics[packageName].downloads} />
            )))
        }
    </div>
  );
}
