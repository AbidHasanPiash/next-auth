export async function postData(apiEndpoint, data, session, isFormData = false) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const token = session?.user?.accessToken;

    const headers = isFormData
      ? { 'Authorization': `Bearer ${token}` }
      : {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };

    const body = isFormData ? data : JSON.stringify(data);

    const response = await fetch(baseUrl + apiEndpoint, {
      method: 'POST',
      headers,
      body,
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Request failed with status: ' + response.status);
    }
  } catch (error) {
    throw new Error('Error: ' + error.message);
  }
}