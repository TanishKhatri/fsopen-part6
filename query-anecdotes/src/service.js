const baseURL = "http://localhost:3001/anecdotes";

export const getAll = async () => {
  const response = await fetch(baseURL);

  const result = await response.json();

  if (!response.ok) {
    throw new Error(`${result.error}`);
  }

  return result; 
}

export const addNew = async (ancObj) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ancObj)
  }

  const response = await fetch(baseURL, options);

  const result = await response.json();

  if (!response.ok) {
    throw new Error(`${result.error}`);
  }

  return result; 
}

export const vote = async (id, ancObj) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ancObj)
  }

  const response = await fetch(`${baseURL}/${id}`, options);

  const result = await response.json();

  if (!response.ok) {
    throw new Error(`${result.error}`);
  }

  return result; 
}