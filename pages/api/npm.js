
import { format } from 'date-fns';

const fetchAndDecode = async (url) => {
  const response = await fetch(url);
  const content = await response.json();
  return content;
}

export default async function handler(_, res) {
    const npms = ['react-notification-timeline', 'i18n-web', 'react-clip-path', 'gatsby-source-harperdb'];
    const npmSlug = npms.join(',');
    const beginDate = format(new Date(new Date().setFullYear(new Date().getFullYear() - 1)), 'yyyy-MM-dd');
    const endDate = format(new Date(), 'yyyy-MM-dd');
    const url = `https://api.npmjs.org/downloads/point/${beginDate}:${endDate}/${npmSlug}`;

    const packageDownloadResponse = await fetch(url); 
    const packageDownloads = await packageDownloadResponse.json();
        
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=1200, stale-while-revalidate=600'
    );
  
    return res.status(200).json({
      values: packageDownloads,
      count: npms.length
    });
  }
  