import { render } from '@testing-library/react';

import NavbarLinksGroup from './navbar-links-group';

describe('NavbarLinksGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NavbarLinksGroup />);
    expect(baseElement).toBeTruthy();
  });
});
