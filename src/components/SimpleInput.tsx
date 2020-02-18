import React from 'react';

interface InputProps {
  name: string;
  type: string;
  value?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SimpleInput: React.FC<InputProps> = (props: InputProps): JSX.Element => {
  const { label } = props;
  return (
    <div className='group'>
      <input className='form-input' {...props} />
      {!!label && <label className={`${props.value && props.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>}
    </div>
  );
}

export default SimpleInput;