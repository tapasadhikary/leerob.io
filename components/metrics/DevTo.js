import useSWR from 'swr';

import fetcher from '@/lib/fetcher';
import MetricCard from '@/components/metrics/Card';

export default function GitHub() {
  const { data } = useSWR('/api/devto', fetcher);
  const link = 'https://dev.to/atapas';

  const articles = new Number(data?.articles);
  const reactions = new Number(data?.reactions);

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
        <MetricCard header="Dev.To Posts" link={link} metric={articles} />
        <MetricCard header="Total Reactions" link={link} metric={reactions} />
    </div>
  );
}
