import { useReducer } from 'react';

const initialInputState = {
  value: '',
  isTouched: false,
};

// useReducer args: previous state snapshot & action
const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === 'BLUR') {
    return { value: state.value, isTouched: true };
  }
  if (action.type === 'RESET') {
    return { value: '', isTouched: false };
  }

  return initialInputState;
};

// We want this hook to be generic - not limited to one specific input
export default function useInput(validateValue) {
  // useReducer returns an array with two elements
  // first element: state managed by reducer
  // second element: dispatch function
  const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = event => {
    // action is often an object with a 'type' key and a payload
    dispatch({ type: 'INPUT', value: event.target.value });
  };

  const inputBlurHandler = event => {
    dispatch({ type: 'BLUR' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
}
