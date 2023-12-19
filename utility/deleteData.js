export async function deleteData(apiEndpoint, studentId, session) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(baseUrl + apiEndpoint + studentId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${session?.user?.accessToken}`
      },
    });

    if (response.ok) {
      return true; // Deletion successful
    } else {
      throw new Error('Deletion failed with status: ' + response.status);
    }
  } catch (error) {
    throw new Error('Error: ' + error.message);
  }
}