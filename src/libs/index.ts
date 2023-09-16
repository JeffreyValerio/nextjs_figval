import { NextResponse } from "next/server";

export async function strapiFetch(endpoint: string, cache?: RequestCache, revalidate?: any) {
    const options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_STRAPI_TOKEN,
        },
        cache: cache,
        revalidate: revalidate,
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

export const oAuthProviders = async (user: any) => {
    try {
        const response = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/users?filters[email]=${user.email}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

        const userExist = await response;

        if (userExist.length > 0) {
            // EL USUARIO SI EXISTE  
            return userExist[0];
        } else {
            // NO EXISTE EL USUARIO
            try {
                const data = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/register`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: user.name,
                            email: user.email.toLowerCase(),
                            password: '123456',
                            avatar: user.image
                        })
                    }
                )
                return data.user
            } catch (error) {
                console.error('Error al crear el usuario:', error)
            }
            console.log({ user })
            return user
        }
    } catch (error) {
        console.error('Error al verificar el usuario:', error);
        return null;
    }
} 