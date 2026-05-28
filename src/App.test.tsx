import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the main heading', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Ice Task Manager');
  });

  it('renders the subtitle with ICE model description', () => {
    render(<App />);
    expect(
      screen.getByText('Gestión de tareas con modelo ICE (Impact × Confidence × Ease)')
    ).toBeInTheDocument();
  });
});
