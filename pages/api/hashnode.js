const GET_METRICS = `
    query{
        user(username: "atapas"){
            numReactions
            numFollowers
            numPosts
        }
    }
`;

async function query(query, variables={}) {
    const data = await fetch('https://api.hashnode.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.HASHNODE_API_KEY
        },
        body: JSON.stringify({
            query,
            variables
        })
    });

    return data.json();
}

export default async function handler(_, res) {

  const { data, errors } = await query(GET_METRICS);

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors)
    };
  }

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600'
  );

  return res.status(200).json({
    followers: data.user.numFollowers,
    reactions: data.user.numReactions,
    posts: data.user.numPosts || 133
  });
};