import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAll, addNew, vote } from "./service";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (content) => ({
  id: getId(),
  content,
  votes: 0,
});

const useAnecdotes = () => {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const newAnecdoteMutation = useMutation({
    mutationFn: addNew,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
    },
  });

  const voteMutation = useMutation({
    mutationFn: ({ id, obj }) => {
      return vote(id, obj);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["anecdotes"]);
    },
  });

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (ancContent) =>
      newAnecdoteMutation.mutate(asObject(ancContent)),
    addVote: (ancObj) =>
      voteMutation.mutate({
        id: ancObj.id,
        obj: { ...ancObj, votes: ancObj.votes + 1 },
      }),
  };
};

export default useAnecdotes;
