import { render } from '@testing-library/react';

import SocialButton from './social-button';

describe('SocialButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SocialButton />);
    expect(baseElement).toBeTruthy();
  });
});
