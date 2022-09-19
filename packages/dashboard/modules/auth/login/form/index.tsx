import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Notification,
} from '@mantine/core';
import { GoogleButton, TwitterButton } from '@boilerplate-project/ui-lib';
import { useStyles } from './form.styles';
import { AuthFormProps, AuthFormValues } from './form.types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IconX } from '@tabler/icons';

export function AuthenticationForm({
  disableSocial = false,
  disableRegister = false,
}: AuthFormProps) {
  const router = useRouter();
  const { classes } = useStyles();
  const [message, setMessage] = useState('');
  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length < 6 ? 'Password should include at least 6 characters' : null,
    },
  });

  useEffect(() => {
    router.prefetch('/dashboard');
  }, []);

  const handleSubmit = async (val: AuthFormValues) => {
    setMessage('');
    if (type === 'register') {
    } else if (type === 'login') {
      // log user in
      const login = await fetch(`/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify(val),
      });

      if (await login.json()) {
        // redirect dashboard pages
        router.push(`/dashboard`);
        console.log('Login successful');
      } else {
        setMessage('Authentication failed');
      }
    }
  };

  return (
    <Paper radius="md" p="xl" withBorder>
      {!disableSocial && (
        <>
          <Text size="lg" weight={500} className={classes.subtitle}>
            {type} with
          </Text>

          <Group grow mb="md" mt="md">
            <GoogleButton radius="xl">Google</GoogleButton>
            <TwitterButton radius="xl">Twitter</TwitterButton>
          </Group>

          <Divider
            label="Or continue with email"
            labelPosition="center"
            my="lg"
          />
        </>
      )}
      {message && (
        <Notification icon={<IconX size={18} />} color="red">
          {message}
        </Notification>
      )}
      <form
        onSubmit={form.onSubmit((val: AuthFormValues) => handleSubmit(val))}
      >
        <Stack>
          {type === 'register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue('name', event.currentTarget.value)
              }
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue('email', event.currentTarget.value)
            }
            error={form.errors.email && 'Invalid email'}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue('password', event.currentTarget.value)
            }
            error={
              form.errors.password &&
              'Password should include at least 6 characters'
            }
          />

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue('terms', event.currentTarget.checked)
              }
            />
          )}
        </Stack>

        <Group position="apart" mt="xl">
          {!disableRegister && (
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
          )}
          <Button type="submit" fullWidth={disableRegister}>
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
