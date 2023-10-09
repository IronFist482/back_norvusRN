export const CLOG = (data: unknown) => {
  console.log(`args ->\n${JSON.stringify(data, null, 2)}`);
};

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
