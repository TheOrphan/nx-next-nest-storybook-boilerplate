import { render } from '@testing-library/react';

import ServerBusy from './server-busy';

describe('ServerBusy', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ServerBusy />);
    expect(baseElement).toBeTruthy();
  });
});
