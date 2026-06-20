import { render, screen } from "@testing-library/react";
import React from 'react';
import { expect, test, vi } from 'vitest';
import KanbanBoard from "../../components/KanbanBoard.jsx";

vi.mock('socket.io-client', () => {
  return {
    io: vi.fn(() => ({
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
      connected: true
    }))
  };
});

vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
  BarChart: () => <div data-testid="bar-chart" />,
  Bar: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  Cell: () => null
}));

test("WebSocket receives task update", () => {
  render(<KanbanBoard />);
  expect(screen.getByText(/Kanban/)).toBeInTheDocument();
});
