import classNames from 'classnames';
import React, { ReactElement, ReactNode } from 'react';
import { optStore } from '../store/store';

type ButtonProps = {
  children?: ReactNode;
  active?: boolean;
  onClick?: () => void;
  label?: string;
  className?: string;
};

export default function Button({ children, active, onClick, label, className }: ButtonProps): ReactElement {
  const {opt_theme} = optStore();
  return (
    <button
      className={classNames(
        `px-2 rounded-lg py-1 ease-linear hover:bg-gray-600 hover:text-white`,
        { 'bg-white shadow-inner text-white': active && opt_theme === 0, 'text-gray-800': !active, 'bg-dark-btn shadow-inner ': active && opt_theme === 1 },
        className
      )}
      onClick={onClick}
      type="button"
    >
      {label}
      {children}
    </button>
  );
}
