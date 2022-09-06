import {
  createStyles,
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
} from '@mantine/core';
import Link from 'next/link';
import image from './image.svg';

const useStyles = createStyles((theme) => ({
  root: {
    marginTop: '20%',
    paddingTop: 80,
    paddingBottom: 80,
    color: '#f03d5f',
  },

  title: {
    fontWeight: 900,
    fontSize: 34,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  control: {
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },

  mobileImage: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  desktopImage: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
}));

export function Unauthorized() {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <SimpleGrid
        spacing={80}
        cols={2}
        breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 40 }]}
      >
        <Image src={image.src} className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text color="dimmed" size="lg">
            You are trying to open protected page. You may have mistyped the
            address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Link href="/dashboard" passHref>
            <Button
              variant="outline"
              size="md"
              mt="xl"
              className={classes.control}
            >
              Get back to home page
            </Button>
          </Link>
        </div>
        <Image src={image.src} className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
}
