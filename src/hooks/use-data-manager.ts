import { useState } from 'react';
import { generateId } from '../utils/id';

export const useDataManager = <T extends { id: string }>({
  initialState,
  defaultItem,
}: {
  initialState: Array<T>;
  defaultItem: T;
}) => {
  const generateErrorsState = (state: Array<T>) =>
    state.map((item: T) => ({
      ...Object.keys(item).reduce(
        (acc, key) => ({ ...acc, [key]: '' }),
        {} as Record<keyof T, string>,
      ),
    }));

  const [errorMsg, setErrorMsg] = useState<string>('');
  const [state, setState] = useState<Array<T>>(initialState);
  const [errors, setErrors] = useState<Array<Record<keyof T, string>>>(
    generateErrorsState(initialState),
  );

  const handleChange = (
    inx: number,
    name: keyof T,
    value: string | boolean,
  ) => {
    setState(prev =>
      prev.map((item, index) =>
        index === inx ? { ...item, [name]: value } : item,
      ),
    );

    setErrors(prev =>
      prev.map((item, index) =>
        index === inx ? { ...item, [name]: '' } : item,
      ),
    );

    setErrorMsg('');
  };

  const setPosition = (inxFrom: number, inxTo: number) => {
    if (inxTo < 0 || inxTo > state.length - 1) {
      return;
    }

    // eslint-disable-next-line no-underscore-dangle
    const _state = state.map(item => ({ ...item }));
    // eslint-disable-next-line no-underscore-dangle
    const _errors = errors.map(item => ({ ...item }));

    const tmpStateItem = _state[inxFrom];
    const tmpErrorItem = _errors[inxFrom];

    _state[inxFrom] = _state[inxTo];
    _errors[inxFrom] = _errors[inxTo];

    _state[inxTo] = tmpStateItem;
    _errors[inxTo] = tmpErrorItem;

    setState(_state);
    setErrors(_errors);
  };

  const onRemove = (inx: number) => {
    setState(prev => prev.filter((_, index) => index !== inx));
    setErrors(prev => prev.filter((_, index) => index !== inx));
  };

  const onAddItem = () => {
    setState(prev => [...prev, { ...defaultItem, id: generateId() }]);
    setErrors(prev => [...prev, ...generateErrorsState([defaultItem])]);
  };

  // eslint-disable-next-line no-underscore-dangle
  const _setErrors = (_errors: Array<Record<keyof T, string>>) => {
    setErrors(_errors);

    if (_errors.some(error => Object.values(error).some(value => !!value))) {
      setErrorMsg('errors.make_sure_that_fields_are_correct');
    }
  };

  return {
    state,
    setState,
    errors,
    setErrors: _setErrors,
    handleChange,
    setPosition,
    onRemove,
    onAddItem,
    generateErrorsState,
    errorMsg,
  };
};
