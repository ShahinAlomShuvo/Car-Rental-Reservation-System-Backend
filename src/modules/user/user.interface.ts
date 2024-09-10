export type TUser = {
  name: string;
  email: string;
  role: "admin" | "user";
  password: string;
  phone: string;
  address: string;
};

export type TSignIn = Pick<TUser, "email" | "password">;
