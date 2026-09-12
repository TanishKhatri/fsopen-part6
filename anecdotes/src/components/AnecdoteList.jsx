import { useAnecdotes, useAnecdotesActions } from "../store";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const actions = useAnecdotesActions();
  const voteOnAnecdote = actions.vote;

  const vote = (id) => {
    voteOnAnecdote(id);
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList;