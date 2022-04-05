export const required = () => (val: any) => !!val || 'Field is required';

export const arrayRequired = () => (val: any) =>
  (val && !!val.length) || 'Field is required';
