import useSWR from 'swr';


import fetcher from '@/lib/fetcher';
import MetricCard from '@/components/metrics/Card';

export default function GitHub() {
    
  const { data } = useSWR('/api/fcc', fetcher);
  const link = 'https://www.freecodecamp.org/news/author/tapas/';
  const articles = new Number(data?.articles);

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 my-2 w-full">
        <MetricCard header="freeCodeCamp Posts" link={link} metric={articles} />
    </div>
  );
}
