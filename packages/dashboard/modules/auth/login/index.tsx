import { Paper, Title } from '@mantine/core';
import { useStyles } from './login.style';
import { AuthenticationForm } from './form';

export default function AuthenticationImage() {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title
          order={2}
          className={classes.title}
          align="center"
          mt="md"
          mb={20}
        >
          Welcome back to Dashboard!
        </Title>
        <AuthenticationForm disableSocial disableRegister />
      </Paper>
    </div>
  );
}
