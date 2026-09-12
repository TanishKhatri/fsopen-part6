import { useAnecdotes, useAnecdotesActions } from "./store"

const App = () => {
  const anecdotes = useAnecdotes()
  const actions = useAnecdotesActions();
  const voteOnAnecdote = actions.vote;
  const addAnecdote = actions.add;

  const vote = (id) => {
    console.log("vote", id)
    voteOnAnecdote(id);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const anecdote =  e.target.addNewAnecdote.value;
    console.log(anecdote);
    addAnecdote(anecdote);
    e.target.reset();
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <input data-testid="new" name="addNewAnecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App
