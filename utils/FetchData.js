// FetchData.js
export async function fetchData(url) {
  const result = {
    data: null,
    isLoading: true,
    isError: false,
  };

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    result.data = data;
  } catch (error) {
    result.isError = true;
    console.error("Error fetching data:", error);
  } finally {
    result.isLoading = false;
  }

  return result;
}
