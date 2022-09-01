import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AccessDenied } from './access-denied';

export default {
  component: AccessDenied,
  title: 'AccessDenied',
} as ComponentMeta<typeof AccessDenied>;

const Template: ComponentStory<typeof AccessDenied> = (args) => (
  <AccessDenied {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
