import { render } from '@testing-library/react';

import TableSearchSort from './table-search-sort';

describe('TableSearchSort', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TableSearchSort />);
    expect(baseElement).toBeTruthy();
  });
});
