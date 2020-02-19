import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  callback?: (value: string) => void;
  extraClass?: string
}

const Button: React.FC<ButtonProps> = ({ type, value, label, callback, extraClass, children }: ButtonProps): JSX.Element => {
  return (
    <>
      <button className={'custom-button ' + extraClass}
        type={type}
        value={value}
        onClick={(e: React.FormEvent<HTMLButtonElement>) => !!callback && callback((e.target as HTMLButtonElement).value)}>
        {label} {children}
      </button>
    </>
  )
}

export default Button;