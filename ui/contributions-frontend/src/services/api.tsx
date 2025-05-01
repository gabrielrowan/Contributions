const BASE_URL = "http://127.0.0.1:8000"

export const getContributions = async (skip: number) => {
    const response = await fetch(`${BASE_URL}/contributions/?skip=${skip}&limit=14`);
    const data = await response.json();
    return [data.contributions, data.total];

}

export const searchContributions = async (query: string, skip: number) => {
    const response = await fetch(`${BASE_URL}/contributions/?title=${encodeURIComponent(query)}`);
    const data = await response.json();
    return [data.contributions, data.total];
}