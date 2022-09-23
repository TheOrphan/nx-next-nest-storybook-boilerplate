import { render } from '@testing-library/react';

import ConfirmButton from './confirm-button';

describe('ConfirmButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ConfirmButton />);
    expect(baseElement).toBeTruthy();
  });
});
