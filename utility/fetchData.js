export async function fetchData(apiEndpoint, session) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(baseUrl + apiEndpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${session?.user?.accessToken}`
      },
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok. Status code: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // You can handle the error in the component that calls this function.
  }
}