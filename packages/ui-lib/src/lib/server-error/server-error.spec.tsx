import { render } from '@testing-library/react';

import ServerError from './server-error';

describe('ServerError', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ServerError />);
    expect(baseElement).toBeTruthy();
  });
});
