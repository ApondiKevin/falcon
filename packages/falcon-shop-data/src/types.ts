export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type OperationInput<TInputArgument> = {
  input: TInputArgument;
};