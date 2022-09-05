import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  subtitle: {
    '&:first-letter': {
      textTransform: 'capitalize',
    },
  },
}));

export { useStyles };
