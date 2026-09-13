const baseURL = "http://localhost:3001/anecdotes";

export const getAll = async () => {
  const response = await fetch(baseURL);

  if (!response.ok) {
    throw new Error("Client refused");
  }

  return await response.json();
}

export const addNew = async (ancObj) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ancObj)
  }

  const response = await fetch(baseURL, options);

  return await response.json();
}

export const vote = async (id, ancObj) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ancObj)
  }

  const response = await fetch(`${baseURL}/${id}`, options);

  return await response.json();
}