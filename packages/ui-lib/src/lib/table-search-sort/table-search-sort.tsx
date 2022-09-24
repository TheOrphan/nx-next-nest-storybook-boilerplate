import { useEffect, useState } from 'react';
import {
  Table,
  ScrollArea,
  Text,
  TextInput,
  Button,
  Group,
  Alert,
  Pagination,
} from '@mantine/core';
import { usePagination } from '@mantine/hooks';
import {
  IconSearch,
  IconPlus,
  IconEdit,
  IconTrash,
  IconAlertCircle,
} from '@tabler/icons';
import { useRouter } from 'next/router';
import { TableFormStateTypes, TableSortProps } from './table-search-sort-types';
import { sortData } from './table-search-sort-helper';
import { TableHeader } from './_components';
// import { useFormTableState } from './table-search-sort-hook';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { encrypt } from '@boilerplate-project/util-lib';
import ConfirmButton from '../confirm-button/confirm-button';

export function TableSearchSort({
  data,
  access,
  forceNoAdd = false,
  FormAdd = null,
  FormEdit = null,
  withNumber = false,
  FormAddURI = '',
  FormEditURI = '',
  uniqueKey = 'id',
  dataTotal,
  dataPerPage = 10,
  paginationSiblings = 1,
  paginationBoundaries = 1,
  showAlert,
  onDeleteConfirm = () => {},
  onDeleteAbort = () => {},
  onPageChange = () => {},
}: TableSortProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  // const [btnAddPress, setBtnAddPress] = useState(false);
  // const [btnEditPress, setBtnEditPress] = useState(false);
  const [initialData, setInitialData] = useState<any[]>([]);
  const [sortedData, setSortedData] = useState<any[]>([]);
  const [firstRow, setFirstRow] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState<keyof any | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [isAlert, setAlert] = useState({
    status: false,
    msg: 'If you have questions, please contact team support.',
  });
  const [dataTotalState] = useState(dataTotal || data?.length || 0);
  const [addURI] = useState(FormAddURI || `${router.pathname}/add`);
  const [editURI] = useState(FormEditURI || `${router.pathname}/edit`);
  const pagination = usePagination({
    total: dataTotalState,
    siblings: paginationSiblings,
    boundaries: paginationBoundaries,
  });
  // const { formState, setFormState } = useFormTableState();
  const action = (row: any) => {
    return (
      (access.edit || access.delete) && (
        <Group position="apart">
          {access.edit && (
            <Link href={`${editURI}/${encrypt(row[uniqueKey])}`}>
              <Button key={`edit${row?.id}`} leftIcon={<IconEdit size={14} />}>
                Edit
              </Button>
            </Link>
          )}
          {access.delete && (
            <ConfirmButton
              key={`remove${row?.id}`}
              buttonProps={{
                leftIcon: <IconTrash size={14} />,
              }}
              popoverProps={{ position: 'top-end' }}
              dialogProps={{
                onConfirm: () => {
                  onDeleteConfirm();
                },
                onAbort: () => {
                  onDeleteAbort();
                },
              }}
            />
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
    if (showAlert) setAlert(showAlert);
  }, [showAlert]);

  useEffect(() => {
    if (data) {
      if (!data[0][uniqueKey]) {
        setAlert({
          status: true,
          msg: `There is no property of '${uniqueKey.toUpperCase()}' associated to the data, or maybe you were wrong to assign the uniqueKey.`,
        });
      }
      const formatData =
        data[0][uniqueKey] &&
        data.map((each, idx) => {
          if (withNumber) {
            return {
              No: (idx + 1) * pagination.active,
              ...each,
              Action: action({ ...each, id: each.id || uuidv4() }),
            };
          }
          return {
            ...each,
            Action: action({ ...each, id: each.id || uuidv4() }),
          };
        });
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
      {isAlert.status && (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Oops, Something bad has happened!"
          color="red"
          my="md"
        >
          {isAlert.msg}
        </Alert>
      )}
      <TextInput
        placeholder="Search by any field"
        mb="md"
        icon={<IconSearch size={14} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
        disabled={!data[0][uniqueKey]}
      />
      {access.add && !forceNoAdd ? (
        <Link href={addURI}>
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
            disabled={!data[0][uniqueKey]}
          >
            Add
          </Button>
        </Link>
      ) : null}
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
                      width:
                        k === 'Action'
                          ? actionsLen * 115
                          : k === 'No'
                          ? 40
                          : 'inherit',
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
      {!!data[0][uniqueKey] && (
        <Group position="apart" mt="md" px="md">
          <Text>
            Showing {pagination.active} to {dataPerPage} of {dataTotalState}{' '}
            entries
          </Text>
          <Pagination
            page={pagination.active}
            total={Math.ceil(dataTotalState / dataPerPage) || 10}
            onChange={(p) => {
              onPageChange();
              pagination.setPage(p);
            }}
            withEdges
          />
        </Group>
      )}
    </ScrollArea>
  );
}

export * from './table-search-sort-types';
// export * from './table-search-sort-hook';
