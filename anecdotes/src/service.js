const baseURL = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await fetch(baseURL);

  if (!response.ok) {
    throw new Error("Server responded with error");
  }

  const data =  await response.json();
  return data;
}

const addNew = async (anecdote) => {
  const response = await fetch(baseURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anecdote)
  });

  if (!response.ok) {
    throw new Error("Server responded with error");
  }

  const data =  await response.json();
  return data;
}

const update = async (id, anecdote) => {
  const response = await fetch(`${baseURL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anecdote)
  });

  if (!response.ok) {
    throw new Error("Server responded with error");
  }

  const data =  await response.json();
  return data;
}

export default { getAll, addNew, update }