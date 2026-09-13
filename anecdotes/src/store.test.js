import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useAnecdoteStore, { useAnecdotes, useAnecdotesActions } from "./store";

vi.mock("./service", () => ({
  default: {
    getAll: vi.fn(),
    addNew: vi.fn(),
    update: vi.fn(),
    deleteAnc: vi.fn(),
  },
}));

import service from "./service";

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: "" });
  vi.clearAllMocks();
});

describe("anecdote store", () => {
  it("initially it is empty", () => {
    const { result: anecdotes } = renderHook(() => useAnecdotes());

    expect(anecdotes.current).toHaveLength(0);
  });

  describe("Those that require values inside", () => {
    const mockAnecdotes = [
      {
        content: "Make it work, then make it fast",
        id: "5",
        votes: 4,
      },
      {
        content: "There are two hard things in computer science",
        id: "4",
        votes: 1,
      },
      {
        content: "Simplicity is the ultimate sophistication",
        id: "2",
        votes: 5,
      },
    ];

    beforeEach(() => {
      service.getAll.mockResolvedValue(mockAnecdotes);
    });

    it("initial anecdotes are contained inside", async () => {
      const { result: actions } = renderHook(() => useAnecdotesActions());
      const { result: anecdotes } = renderHook(() => useAnecdotes());

      await act(() => actions.current.initialize());

      expect(anecdotes.current).toHaveLength(3);
      expect(anecdotes.current).toContainEqual({
        content: "Make it work, then make it fast",
        id: "5",
        votes: 4,
      });
    });

    it("Store gives out anecdotes sorted by votes", async () => {
      const { result: actions } = renderHook(() => useAnecdotesActions());
      const { result: anecdotes } = renderHook(() => useAnecdotes());

      await act(() => actions.current.initialize());

      expect(anecdotes.current).toHaveLength(3);
      let prevValue = Infinity;
      expect(anecdotes.current.every((anc) => {
        const res = anc.votes <= prevValue;
        prevValue = anc.votes;
        return res;
      })).toBeTruthy();
    });

    it("Filteration works", async () => {
      const { result: actions } = renderHook(() => useAnecdotesActions());
      const { result: anecdotes } = renderHook(() => useAnecdotes());

      await act(async () => {
        await actions.current.initialize();
        await actions.current.changeFilter("en");
      });

      expect(anecdotes.current).toHaveLength(2);
    });

    it("Voting works", async () => {
      service.update.mockResolvedValue({...mockAnecdotes[1], votes: mockAnecdotes[1].votes + 1 })

      const { result: actions } = renderHook(() => useAnecdotesActions());
      const { result: anecdotes } = renderHook(() => useAnecdotes());

      await act(async () => {
        await actions.current.initialize();
        await actions.current.vote("4");
      });

      expect(anecdotes.current.find((anc) => anc.id === "4")).toHaveProperty('votes', 2);
    })
  });
});
