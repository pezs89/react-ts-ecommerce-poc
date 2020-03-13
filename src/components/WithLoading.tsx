import React from 'react';
import Spinner from './Spinner';

type SpinnerProps = {
  isLoading: boolean
}

const withLoading = <T extends object>(WrappedComponent: React.ComponentType<T>) => ({ isLoading, ...otherProps }: T & SpinnerProps) => {
  return isLoading ?
    <Spinner />
    :
    <WrappedComponent {...otherProps as T} />
}

export default withLoading;