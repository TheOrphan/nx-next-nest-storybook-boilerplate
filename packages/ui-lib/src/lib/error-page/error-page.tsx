import {
  createStyles,
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
} from '@mantine/core';
import client from './client-error.svg';
import server from './server-error.svg';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  root: {
    marginTop: '10%',
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

export function ErrorPage({
  isServer = false,
  statusCode,
}: {
  isServer?: boolean;
  statusCode?: number;
}) {
  const { classes } = useStyles();
  return (
    <Container className={classes.root}>
      <SimpleGrid
        spacing={80}
        cols={2}
        breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 40 }]}
      >
        <Image
          src={isServer ? server.src : client.src}
          className={classes.mobileImage}
        />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text color="dimmed" size="lg">
            The page you are trying to open is in trouble. It may have fixed
            itself, or the developer has been moved to another problem. If you
            think this is an error contact support.
            {isServer
              ? ` An error ${statusCode} occurred on server.`
              : ' An error occurred on client.'}
          </Text>
          <Link href="/dashboard">
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
        <Image
          src={isServer ? server.src : client.src}
          className={classes.desktopImage}
        />
      </SimpleGrid>
    </Container>
  );
}
