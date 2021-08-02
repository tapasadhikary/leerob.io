import useSWR from 'swr';

import fetcher from '@/lib/fetcher';
import MetricCard from '@/components/metrics/Card';

export default function GitHub() {
  const { data } = useSWR('/api/hashnode', fetcher);

  const followers = new Number(data?.followers);
  const reactions = new Number(data?.reactions);
  const posts = new Number(data?.posts);

  const link = 'https://blog.greenroots.info';

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 my-2 w-full">
        <MetricCard header="Total Articles" link={link} metric={posts} />
        <MetricCard header="Reactions" link={link} metric={reactions} />
        <MetricCard header="Followers" link={link} metric={followers} />
    </div>
  );
}
