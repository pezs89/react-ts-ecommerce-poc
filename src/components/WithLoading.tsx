import React from 'react';

interface SpinnerProps {
  isLoading: boolean
}

const withLoading = <T extends object>(WrappedComponent: React.ComponentType<T>) => ({ isLoading, ...otherProps }: T & SpinnerProps) => {
  console.log(isLoading, otherProps)
  return isLoading ?
    <div className='spinner-overlay'>
      <div className='spinner-overlay__spinner'></div>
    </div>
    :
    <WrappedComponent {...otherProps as T} />
}

export default withLoading;