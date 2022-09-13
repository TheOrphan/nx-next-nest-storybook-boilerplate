import { useEffect, useState } from 'react';
import {
  Table,
  ScrollArea,
  Text,
  TextInput,
  Button,
  Group,
} from '@mantine/core';
import { IconSearch, IconPlus, IconEdit, IconTrash } from '@tabler/icons';
import { TableFormStateTypes, TableSortProps } from './table-search-sort-types';
import { sortData } from './table-search-sort-helper';
import { TableHeader } from './_components';
// import { useFormTableState } from './table-search-sort-hook';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { encrypt } from '@boilerplate-project/util-lib';

export function TableSearchSort({
  data,
  access,
  forceNoAdd = false,
  FormAdd = null,
  FormEdit = null,
  FormAddURI = '',
  FormEditURI = '',
  uniqueKey = 'id',
}: TableSortProps) {
  const [search, setSearch] = useState('');
  // const [btnAddPress, setBtnAddPress] = useState(false);
  // const [btnEditPress, setBtnEditPress] = useState(false);
  const [initialData, setInitialData] = useState<any[]>([]);
  const [sortedData, setSortedData] = useState<any[]>([]);
  const [firstRow, setFirstRow] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState<keyof any | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  // const { formState, setFormState } = useFormTableState();
  const action = (row: any) => {
    return (
      (access.edit || access.remove) && (
        <Group position="apart">
          {access.edit && (
            <Link href={`${FormEditURI}/${encrypt(row[uniqueKey])}`}>
              <Button key={`edit${row?.id}`} leftIcon={<IconEdit size={14} />}>
                Edit
              </Button>
            </Link>
          )}
          {access.remove && (
            <Link href="">
              <Button
                key={`remove${row?.id}`}
                leftIcon={<IconTrash size={14} />}
              >
                Delete
              </Button>
            </Link>
          )}
        </Group>
      )
    );
  };
  // const action = (row: any) => {
  //   return (
  //     (access.edit || access.remove) && (
  //       <Group position="apart">
  //         {access.edit && (
  //           <Button
  //             key={`edit${row?.id}`}
  //             onClick={() => {
  //               setBtnEditPress(true);
  //               setTimeout(() => {
  //                 setFormState(TableFormStateTypes.Edit);
  //                 setBtnEditPress(false);
  //               });
  //             }}
  //             leftIcon={<IconEdit size={14} />}
  //             loading={btnEditPress}
  //             loaderPosition="left"
  //           >
  //             Edit
  //           </Button>
  //         )}
  //         {access.remove && (
  //           <Button key={`remove${row?.id}`} leftIcon={<IconTrash size={14} />}>
  //             Delete
  //           </Button>
  //         )}
  //       </Group>
  //     )
  //   );
  // };

  useEffect(() => {
    if (data) {
      const formatData = data.map((each) => ({
        ...each,
        Action: action({ ...each, id: each.id || uuidv4() }),
      }));
      setInitialData(formatData);
    }
  }, [data]);

  useEffect(() => {
    if (initialData) setFirstRow(initialData[0]);
    if (initialData) setSortedData(initialData);
  }, [initialData]);

  const setSorting = (field: keyof any) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(initialData, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(initialData, {
        sortBy,
        reversed: reverseSortDirection,
        search: value,
      })
    );
  };

  const rows =
    sortedData.length > 0 &&
    sortedData.map((row, index) => (
      <tr key={row[Object.keys(row)[0]] + `${index}`}>
        {Object.entries(row).map(([key, value]: any[]) => {
          return <td key={key + index}>{value}</td>;
        })}
      </tr>
    ));
  // return formState === TableFormStateTypes.Add ? (
  //   <ScrollArea>{FormAdd}</ScrollArea>
  // ) : formState === TableFormStateTypes.Edit ? (
  //   <ScrollArea>{FormEdit}</ScrollArea>
  // ) : (
  return (
    <ScrollArea>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        icon={<IconSearch size={14} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      {access.add && !forceNoAdd && (
        <Link href={FormAddURI}>
          <Button
            style={{ float: 'right' }}
            leftIcon={<IconPlus size={14} />}
            // onClick={() => {
            //   setBtnAddPress(true);
            //   setTimeout(() => {
            //     setFormState(TableFormStateTypes.Add);
            //     setBtnAddPress(false);
            //   }, 200);
            // }}
            // loading={btnAddPress}
            // loaderPosition="right"
            mb={'md'}
          >
            Add
          </Button>
        </Link>
      )}
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{ tableLayout: 'fixed', minWidth: 700 }}
      >
        <thead>
          <tr>
            {firstRow &&
              Object.entries(firstRow).map(([k, v]) => {
                const actionChild = v?.props?.children;
                const actionsLen =
                  Array.isArray(actionChild) && !actionChild.includes(undefined)
                    ? actionChild?.length
                    : 1;
                return (
                  <TableHeader
                    key={k + v}
                    sorted={sortBy === k}
                    reversed={reverseSortDirection}
                    sortActive={['string', 'integer'].includes(typeof v)}
                    onSort={() => setSorting(k)}
                    ThColStyle={{
                      width: k === 'Action' ? actionsLen * 115 : 'inherit',
                    }}
                    style={{
                      textTransform: 'capitalize',
                    }}
                  >
                    {k}
                  </TableHeader>
                );
              })}
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

export * from './table-search-sort-types';
// export * from './table-search-sort-hook';
