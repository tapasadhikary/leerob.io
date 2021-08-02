export default async function handler(_, res) {
    const articleResponse = await fetch('https://dev.to/api/articles?username=atapas&state=all');
    const articles = await articleResponse.json();
    
    const totalReactions = articles.reduce((accumulator, article) => {
      return accumulator + article['positive_reactions_count'];
    }, 0);
  
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=1200, stale-while-revalidate=600'
    );
  
    return res.status(200).json({
      articles: articles.length,
      reactions: totalReactions
    });
  }
  