import { useState } from 'react';
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  Button,
} from '@mantine/core';
import { keys } from '@mantine/utils';
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconPlus,
} from '@tabler/icons';
import { useRecoilValue } from 'recoil';

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors['dark'][6]
          : theme.colors['gray'][0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}));

interface TableSortProps {
  data: Array<any>;
  access: { add: boolean; remove: boolean; edit: boolean };
  forceNoAdd?: boolean;
  FormAdd?: React.ReactNode | null;
  FormEdit?: React.ReactNode | null;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  style: React.CSSProperties;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort, style }: ThProps) {
  const { classes } = useStyles();
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton
        onClick={onSort}
        className={classes.control}
        style={style}
      >
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data: any[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

function sortData(
  data: any,
  payload: { sortBy: keyof any | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

export function TableSearchSort({
  data,
  access,
  forceNoAdd = false,
  FormAdd = null,
  FormEdit = null,
}: TableSortProps) {
  const [search, setSearch] = useState('');
  const [formState, setFormState] = useState('view');
  const [btnAddPress, setBtnAddPress] = useState(false);
  const [sortedData, setSortedData] = useState(data || []);
  const firstRow = data[0];
  const [sortBy, setSortBy] = useState<keyof any | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const action = () => (
    <>
      {access.edit && (
        <Button onClick={() => setFormState('edit')}>Edit</Button>
      )}
      {access.remove && <Button ml="xs">Delete</Button>}
    </>
  );

  const setSorting = (field: keyof any) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };

  const rows =
    sortedData.length > 0 &&
    sortedData.map((row, index) => (
      <tr key={row.name}>
        {Object.entries(row).map(([key, value]: any[]) => {
          if (typeof value === 'string') {
            return <td key={key + index}>{value}</td>;
          } else {
            return <td key={key + index}>{value()}</td>;
          }
        })}
      </tr>
    ));

  return formState === 'add' ? (
    <ScrollArea>{FormAdd}</ScrollArea>
  ) : formState === 'edit' ? (
    <ScrollArea>{FormEdit}</ScrollArea>
  ) : (
    <ScrollArea>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        icon={<IconSearch size={14} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      {access.add && !forceNoAdd && (
        <Button
          style={{ float: 'right' }}
          leftIcon={<IconPlus size={14} />}
          onClick={() => {
            setBtnAddPress(true);
            setTimeout(() => {
              setFormState('add');
              setBtnAddPress(false);
            }, 1000);
          }}
          loading={btnAddPress}
          loaderPosition="right"
          mb={'md'}
        >
          Add
        </Button>
      )}
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{ tableLayout: 'fixed', minWidth: 700 }}
      >
        <thead>
          <tr>
            {Object.entries(firstRow).map(([k, v]) => (
              <Th
                key={k + v}
                sorted={sortBy === k}
                reversed={reverseSortDirection}
                onSort={() => setSorting(k)}
                style={{ textTransform: 'capitalize' }}
              >
                {k}
              </Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows && rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={Object.keys(data[0]).length}>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
