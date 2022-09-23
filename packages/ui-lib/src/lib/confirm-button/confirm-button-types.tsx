import { ReactNode } from 'react';
import { ButtonProps, PopoverProps, TextProps } from '@mantine/core';

/* eslint-disable-next-line */
type DialogTextProps = TextProps & {
  text?: ReactNode;
  onConfirm?: () => void;
  onAbort?: () => void;
  confirmText?: string;
  abortText?: string;
};

export type ConfirmButtonProps = {
  popoverProps?: Omit<PopoverProps, 'children'>;
  dialogProps?: DialogTextProps;
  buttonProps?: ButtonProps & { text?: string };
};
