const { parse } = require('rss-to-json');

export default async function handler(_, res) {
    const rssLink = 'https://www.freecodecamp.org/news/author/tapas/rss/';  
    const data = await parse(rssLink);
  
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=1200, stale-while-revalidate=600'
    );
  
    return res.status(200).json({
      articles: data.items.length,
    });
  }
  