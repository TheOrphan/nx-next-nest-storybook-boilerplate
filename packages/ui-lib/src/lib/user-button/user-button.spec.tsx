import { render } from '@testing-library/react';

import UserButton from './user-button';

describe('UserButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserButton />);
    expect(baseElement).toBeTruthy();
  });
});
