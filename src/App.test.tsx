import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from './App';

describe('App', () => {
  it('App should be rendered without errors', async () => {
    render(<App />);

    expect(screen.queryByText('ERROR')).not.toBeInTheDocument();
  });
});
