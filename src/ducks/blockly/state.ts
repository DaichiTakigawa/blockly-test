/* eslint-disable @typescript-eslint/no-explicit-any */
export type State = {
  workspace?: {
    [key: string]: any;
  };
  code?: string;
  result?: string;
};
