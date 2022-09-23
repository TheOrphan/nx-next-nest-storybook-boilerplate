import { Button, Group, Popover, Text } from '@mantine/core';
import { useState } from 'react';
import { ConfirmButtonProps } from './confirm-button-types';

export function ConfirmButton({
  popoverProps,
  dialogProps,
  buttonProps,
}: ConfirmButtonProps) {
  const [opened, setOpened] = useState(false);
  const {
    position = 'top',
    width = 300,
    withArrow = true,
    shadow = 'md',
    ...restPopoverProps
  } = popoverProps || {};
  const {
    text = 'Are you sure you want to delete this data?',
    confirmText = 'Delete',
    abortText = 'Cancel',
    onConfirm = () => {},
    onAbort = () => {},
    ...restTextProps
  } = dialogProps || {};
  const handleConfirm = () => {
    onConfirm();
    setOpened(false);
  };
  const handleAbort = () => {
    onAbort();
    setOpened(false);
  };
  return (
    <Popover
      {...{ ...restPopoverProps, position, width, withArrow, shadow, opened }}
    >
      <Popover.Target>
        <Button {...buttonProps} onClick={() => setOpened((o) => !o)}>
          {buttonProps?.text || 'Delete'}
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text {...restTextProps}>{text}</Text>
        <Group position="right" mt="sm">
          <Button
            onClick={handleConfirm}
            variant="subtle"
            color="red"
            size="xs"
          >
            {confirmText}
          </Button>
          <Button onClick={handleAbort} size="xs">
            {abortText}
          </Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
}

export default ConfirmButton;
