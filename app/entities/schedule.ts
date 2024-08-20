type Shift = 'morning' | 'afternoon';

export type Schedule = {
  id: number;
  day: number;
  shift: Shift;
  machine: string;
  user: {
    id: number;
    name: string;
    number: number;
  };
};
