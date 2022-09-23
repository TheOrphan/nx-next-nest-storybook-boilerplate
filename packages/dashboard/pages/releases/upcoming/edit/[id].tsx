import { Button, Group, TextInput, Grid, Title, Paper } from '@mantine/core';
import { useForm } from '@mantine/form';
import { getCookie } from 'cookies-next';
import { checkAccess } from 'packages/dashboard/lib/useAccess';

const AddPage = ({ access, title }) => {
  const form = useForm({
    initialValues: {
      name: '',
    },
  });
  const handleAdd = (values) => {
    console.log(values);
  };
  return (
    <>
      <Grid justify="space-between" align="flex-start">
        <Grid.Col span={8}>
          <Title order={1}>{title}</Title>
        </Grid.Col>
      </Grid>
      <Paper radius="xs" p="lg" mt={'lg'}>
        <form
          onSubmit={form.onSubmit((values) => {
            handleAdd(values);
          })}
        >
          <TextInput
            placeholder="Your name"
            label="Full name"
            withAsterisk
            {...form.getInputProps('name')}
          />
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Paper>
    </>
  );
};

export async function getServerSideProps({ req, res, resolvedUrl }) {
  const uriArr = resolvedUrl.split('/');
  // pop id segment
  uriArr.pop();
  // pop edit segment
  uriArr.pop();
  const parentUri = uriArr.join('/');
  const token = getCookie('_o', { req, res });
  const { session, authCheck, permission } = await checkAccess({
    token,
    page: parentUri,
  });
  const { access } = permission || {};

  if (!session || !authCheck) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
  console.log(access);
  if (!access?.edit || !access?.view) {
    return {
      redirect: {
        destination: '/error/401',
        permanent: false,
      },
    };
  }
  return { props: { title: 'Edit Upcoming Releases', access } };
}

export default AddPage;
