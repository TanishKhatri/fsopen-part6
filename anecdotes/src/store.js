import { create } from "zustand";
import service from "./service";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => ({
  content: anecdote,
  id: getId(),
  votes: 0,
});

const useNotificationStore = create((set) => ({
  notification: "",
  showNotification: (msg) => {
    set(() => ({ notification: msg }));
    setTimeout(() => {
      set(() => ({ notification: "" }));
    }, 5000);
  },
}));

const sortedByVotes = (anecdotes) => {
  return anecdotes.toSorted((a, b) => b.votes - a.votes);
};

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: "",
  actions: {
    initialize: async () => {
      const allAnecdotes = await service.getAll();
      set(() => ({ anecdotes: sortedByVotes(allAnecdotes) }));
    },
    vote: async (id) => {
      const anecdote = get().anecdotes.find((anc) => anc.id === id);
      const newAnecdote = await service.update(id, {
        ...anecdote,
        votes: anecdote.votes + 1,
      });
      set((state) => ({
        anecdotes: sortedByVotes(
          state.anecdotes.map((anc) =>
            anc.id === newAnecdote.id ? newAnecdote : anc,
          ),
        ),
      }));
      useNotificationStore
        .getState()
        .showNotification(`you voted '${newAnecdote.content}'`);
    },
    add: async (anecdoteContent) => {
      const toBeSent = asObject(anecdoteContent);
      const newAnecdote = await service.addNew(toBeSent);
      set((state) => ({
        anecdotes: sortedByVotes([...state.anecdotes, newAnecdote]),
      }));
      useNotificationStore
        .getState()
        .showNotification(`Created '${newAnecdote.content}'`);
    },
    deleteAnecdote: async (id) => {
      await service.deleteAnc(id);
      set((state) => ({ anecdotes: state.anecdotes.filter((a) => a.id !== id)}));
    },
    changeFilter: (f) => set({ filter: f.toUpperCase() }),
  },
}));

export const useAnecdotes = () => {
  const filter = useAnecdoteStore((state) => state.filter);
  return useAnecdoteStore((state) => state.anecdotes).filter((anc) =>
    anc.content.toUpperCase().includes(filter),
  );
};
export const useAnecdotesActions = () =>
  useAnecdoteStore((state) => state.actions);

export const useNotification = () =>
  useNotificationStore((state) => state.notification);

export default useAnecdoteStore;