import { useEffect, useState } from 'react';
import { Table, ScrollArea, Text, TextInput, Button } from '@mantine/core';
import { IconSearch, IconPlus } from '@tabler/icons';
import { TableFormStateTypes, TableSortProps } from './table-search-sort-types';
import { sortData } from './table-search-sort-helper';
import { TableHeader } from './_components';
import { useFormTableState } from './table-search-sort-hook';

export function TableSearchSort({
  data,
  access,
  forceNoAdd = false,
  FormAdd = null,
  FormEdit = null,
}: TableSortProps) {
  const [search, setSearch] = useState('');
  const [btnAddPress, setBtnAddPress] = useState(false);
  const [sortedData, setSortedData] = useState(data || []);
  const firstRow = data[0];
  const [sortBy, setSortBy] = useState<keyof any | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [formState, setFormState] = useFormTableState();

  const action = () => (
    <>
      {access.edit && (
        <Button onClick={() => setFormState(TableFormStateTypes.Edit)}>
          Edit
        </Button>
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

  return formState === TableFormStateTypes.Add ? (
    <ScrollArea>{FormAdd}</ScrollArea>
  ) : formState === TableFormStateTypes.Edit ? (
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
              setFormState(TableFormStateTypes.Add);
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
              <TableHeader
                key={k + v}
                sorted={sortBy === k}
                reversed={reverseSortDirection}
                onSort={() => setSorting(k)}
                style={{ textTransform: 'capitalize' }}
              >
                {k}
              </TableHeader>
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

export * from './table-search-sort-types';
export * from './table-search-sort-hook';
