import {
  // TableFormStateTypes,
  TableSearchSort,
  // useFormTableState,
} from '@boilerplate-project/ui-lib';
import {
  Grid,
  Paper,
  Title,
  //TextInput, Group, Button
} from '@mantine/core';
import { getCookie } from 'cookies-next';
import { checkAccess } from 'packages/dashboard/lib/useAccess';
// import { useForm } from '@mantine/form';
import { getAllData } from 'packages/dashboard/lib/getAllData';

const data = [
  {
    name: 'Athena Weissnat',
    company: 'Little - Rippin',
    email: 'Elouise.Prohaska@yahoo.com',
  },
  {
    name: 'Deangelo Runolfsson',
    company: 'Greenfelder - Krajcik',
    email: 'Kadin_Trantow87@yahoo.com',
  },
  {
    name: 'Danny Carter',
    company: 'Kohler and Sons',
    email: 'Marina3@hotmail.com',
  },
  {
    name: 'Trace Tremblay PhD',
    company: 'Crona, Aufderhar and Senger',
    email: 'Antonina.Pouros@yahoo.com',
  },
  {
    name: 'Derek Dibbert',
    company: 'Gottlieb LLC',
    email: 'Abagail29@hotmail.com',
  },
  {
    name: 'Viola Bernhard',
    company: 'Funk, Rohan and Kreiger',
    email: 'Jamie23@hotmail.com',
  },
  {
    name: 'Austin Jacobi',
    company: 'Botsford - Corwin',
    email: 'Genesis42@yahoo.com',
  },
  {
    name: 'Hershel Mosciski',
    company: 'Okuneva, Farrell and Kilback',
    email: 'Idella.Stehr28@yahoo.com',
  },
  {
    name: 'Mylene Ebert',
    company: 'Kirlin and Sons',
    email: 'Hildegard17@hotmail.com',
  },
  {
    name: 'Lou Trantow',
    company: 'Parisian - Lemke',
    email: 'Hillard.Barrows1@hotmail.com',
  },
  {
    name: 'Dariana Weimann',
    company: 'Schowalter - Donnelly',
    email: 'Colleen80@gmail.com',
  },
  {
    name: 'Dr. Christy Herman',
    company: 'VonRueden - Labadie',
    email: 'Lilyan98@gmail.com',
  },
  {
    name: 'Katelin Schuster',
    company: 'Jacobson - Smitham',
    email: 'Erich_Brekke76@gmail.com',
  },
  {
    name: 'Melyna Macejkovic',
    company: 'Schuster LLC',
    email: 'Kylee4@yahoo.com',
  },
  {
    name: 'Pinkie Rice',
    company: 'Wolf, Trantow and Zulauf',
    email: 'Fiona.Kutch@hotmail.com',
  },
  {
    name: 'Brain Kreiger',
    company: 'Lueilwitz Group',
    email: 'Rico98@hotmail.com',
  },
];
function Page({ access, title }) {
  // const { setFormState } = useFormTableState();
  // const form = useForm({
  //   initialValues: {
  //     name: '',
  //   },
  // });
  // const handleAdd = (values) => {
  //   // setFormState(TableFormStateTypes.View);
  //   console.log(values);
  // };
  return (
    <>
      <Grid justify="space-between" align="flex-start">
        <Grid.Col span={8}>
          <Title order={1}>{title}</Title>
        </Grid.Col>
      </Grid>
      <Paper radius="xs" p="lg" mt={'lg'}>
        <TableSearchSort
          data={data}
          access={access}
          uniqueKey="email"
          FormAddURI="/releases/upcoming/add"
          FormEditURI="/releases/upcoming/edit"
          // FormAdd={
          //   <form
          //     onSubmit={form.onSubmit((values) => {
          //       handleAdd(values);
          //     })}
          //   >
          //     <TextInput
          //       placeholder="Your name"
          //       label="Full name"
          //       withAsterisk
          //       {...form.getInputProps('name')}
          //     />
          //     <Group position="right" mt="md">
          //       <Button type="submit">Submit</Button>
          //     </Group>
          //   </form>
          // }
          // FormEdit={
          //   <form
          //     onSubmit={form.onSubmit((values) => {
          //       handleAdd(values);
          //     })}
          //   >
          //     <TextInput
          //       placeholder="Your name"
          //       label="Full name"
          //       withAsterisk
          //       {...form.getInputProps('name')}
          //     />
          //     <Group position="right" mt="md">
          //       <Button type="submit">Submit</Button>
          //     </Group>
          //   </form>
          // }
        />
      </Paper>
    </>
  );
}

export async function getServerSideProps({ req, res, resolvedUrl, query }) {
  const token = getCookie('_o', { req, res });
  const currentPage = resolvedUrl.split('?')[0];
  const { session, authCheck, permission } = await checkAccess({
    token,
    page: currentPage,
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
  if (!access?.view) {
    return {
      redirect: {
        destination: '/error/401',
        permanent: false,
      },
    };
  }
  const { page } = query || {};
  const data = await getAllData({
    endpoint: '/release',
    page: parseInt(page) || 1,
    token,
  });
  return { props: { title: 'Upcoming Releases', access, data } };
}

export default Page;
