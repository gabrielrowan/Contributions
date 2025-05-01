const BASE_URL = "http://127.0.0.1:8000"

export const getContributions = async () => {
    const response = await fetch(`${BASE_URL}/contributions/`);
    const data = await response.json();
    return data.contributions;

}