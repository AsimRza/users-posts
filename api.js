const MOCK_API_URL = "http://localhost:3000/api";

export async function getRequest(url) {
  return fetch(`${MOCK_API_URL}${url}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}

export async function putRequest(url, data) {
  return fetch(`${MOCK_API_URL}${url}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error updating data:", error);
      throw error;
    });
}

export async function postRequest(url, data) {
  return fetch(`${MOCK_API_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).catch((error) => {
    console.error("Error creating data:", error);
    throw error;
  });
}

export async function deleteRequest(url) {
  return fetch(`${MOCK_API_URL}${url}`, {
    method: "DELETE",
  }).catch((error) => {
    console.error("Error deleting data:", error);
    throw error;
  });
}
