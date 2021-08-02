import useSWR from 'swr';

import fetcher from '@/lib/fetcher';
import MetricCard from '@/components/metrics/Card';

export default function GitHub() {
  const { data } = useSWR('/api/github', fetcher);

  const stars = new Number(data?.stars);
  const followers = new Number(data?.followers);
  const repositories = new Number(data?.repositories);
  const link = 'https://github.com/atapas';

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 my-2 w-full">
      <MetricCard header="GitHub Repos" link={link} metric={repositories} />
      <MetricCard header="GitHub Followers" link={link} metric={followers} />
      <MetricCard header="GitHub Stars" link={link} metric={stars} />
    </div>
  );
}
