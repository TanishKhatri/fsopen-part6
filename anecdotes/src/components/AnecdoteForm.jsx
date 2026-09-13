import { useAnecdotesActions } from "../store"

const AnecdoteForm = () => {
  const actions = useAnecdotesActions();
  const addAnecdote = actions.add;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const anecdote =  e.target.anecdote.value;
    console.log(anecdote);
    addAnecdote(anecdote);
    e.target.reset();
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <input data-testid="new" name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm;