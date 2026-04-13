interface UserState {
  _id: string | null;
  name: string | null;
  email: string | null;
  address: string | null;
}

const initialState: UserState = {
  _id: null,
  name: null,
  email: null,
  address: null,
};
