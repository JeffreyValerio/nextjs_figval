export async function strapiFetch(endpoint: string, cache: RequestCache, revalidate?: any) {
    const options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_STRAPI_TOKEN,
        },
        cache: cache,
        revalidate,
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}${endpoint}`, options);
    const data = await res.json();

    return data;
}

export async function fetcher(url: any, options = {}) {
    let response;
    if (!options) {
        response = await fetch(url);
    } else {
        response = await fetch(url, options);
    }
    const data = await response.json();
    return data;
} 