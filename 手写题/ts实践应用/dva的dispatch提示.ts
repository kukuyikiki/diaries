interface T {
  namespace: 'global';
  effects: {
    fetchLogin: string;
  };
  reducers: {
    updateState: number;
  };
}

type Ac<S extends T> = `${string & S['namespace']}/${(
  | keyof S['effects']
  | keyof S['reducers']
) &
  string}`;

type Dvad<S = undefined> = <T = undefined>(ss: {
  type: Ac<S extends T ? any : any>;
}) => Promise<T>;

let dispatch11: Dvad<T>;

dispatch11({
  type: 'global/fetchLogin',
});
