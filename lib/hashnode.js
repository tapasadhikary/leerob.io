const GET_ARTICLES = `
    query GetUserArticles($page: Int!) {
        user(username: "atapas") {
            publication {
                posts(page: $page) {
                    _id
                    title
                    brief
                    slug
                    replyCount
                    coverImage
                    totalReactions
                    popularity
                }
            }
        }
    }
`;

async function fetchArticles(query, variables={}) {
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

export const fetchThreeReecentArticles = async () => {
    const articles = await fetchArticles(GET_ARTICLES, { page: 0 });
    const recentArticles = articles.data.user.publication.posts.slice(0, 3);
    return recentArticles;
}

export const fetchAllArticles = async (pageNumber) => {
    const articles = await fetchArticles(GET_ARTICLES, { page: pageNumber });
    const allArticles = articles.data.user.publication.posts;
    return allArticles;
}

