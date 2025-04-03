export type RedisResultSet = {
  total: number;
  documents: {
      id: string;
      value: any;
  }[];
};