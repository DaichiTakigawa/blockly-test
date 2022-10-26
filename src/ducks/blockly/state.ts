/* eslint-disable @typescript-eslint/no-explicit-any */
export type State = {
  workspace?: {
    [key: string]: any;
  };
  definition?: string;
  code?: string;
  result?: string;
};
