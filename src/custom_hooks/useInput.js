import { useState } from 'react';

const useInput = (initial, validate) => {
  const [value, setValue] = useState(initial);
  const [hasError, setHasError] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const handleChange = (t) => {
    setValue((p) => t.target.value);
  };

  const handleReset = () => {
    setValue('');
  };

  const handleBlur = () => {
    setIsTouched(true);
    if (!validate(value)) {
      setHasError(true);
    } else setHasError(false);
  };

  return {
    value,
    isTouched,
    handleChange,
    handleReset,
    hasError,
    handleBlur,
  };
};

export default useInput;