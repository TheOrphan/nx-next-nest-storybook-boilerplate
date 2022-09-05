export type AuthFormProps = {
  disableSocial?: boolean;
  disableRegister?: boolean;
};

export type AuthFormValues = {
  name: string;
  email: string;
  password: string;
  terms: boolean;
};

export type AuthToken = {
  access_token: string;
};
