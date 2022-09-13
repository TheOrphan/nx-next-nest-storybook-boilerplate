import { UnstyledButton, Group, Text, Center } from '@mantine/core';
import { IconChevronUp, IconChevronDown, IconSelector } from '@tabler/icons';
import { useStyles } from '../../table-search-sort-style';
import { ThProps } from '../../table-search-sort-types';

function TableHeader({
  children,
  reversed,
  sorted,
  onSort,
  sortActive = true,
  ThColStyle,
  style,
}: ThProps) {
  const { classes } = useStyles();
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <th className={classes.th} style={ThColStyle}>
      <UnstyledButton
        onClick={() => sortActive && onSort()}
        className={classes.control}
        style={style}
      >
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          {sortActive && (
            <Center className={classes.icon}>
              <Icon size={14} stroke={1.5} />
            </Center>
          )}
        </Group>
      </UnstyledButton>
    </th>
  );
}

export { TableHeader };
