import { writable }  from 'svelte/store';

type query = {
  query: string;
  date: Date;
};

type Data = {
  hello: query[];
};

const dataStore = writable<Data>({
  hello: [],
});

export default dataStore;
