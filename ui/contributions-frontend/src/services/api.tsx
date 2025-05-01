const BASE_URL = "http://127.0.0.1:8000"

export const getContributions = async () => {
    const response = await fetch(`${BASE_URL}/contributions/?skip=0&limit=14`);
    const data = await response.json();
    return data.contributions;

}

export const searchContributions = async (query: string) => {
    const response = await fetch(`${BASE_URL}/contributions/?title=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.contributions;
}