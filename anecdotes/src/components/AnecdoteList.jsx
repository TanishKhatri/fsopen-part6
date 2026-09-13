import { useAnecdotes, useAnecdotesActions } from "../store";
import { useEffect } from "react";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const actions = useAnecdotesActions();
  const voteOnAnecdote = actions.vote;

  useEffect(() => {
    actions.initialize();
  }, [actions]);

  const vote = (id) => {
    voteOnAnecdote(id);
  }

  const deleteAnecdote = (id) => {
    actions.deleteAnecdote(id);
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
            {anecdote.votes === 0 && <button onClick={() => deleteAnecdote(anecdote.id)}>delete</button>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList;