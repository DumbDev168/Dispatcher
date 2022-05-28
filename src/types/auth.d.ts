export interface IRegister {
  username: string;
  phone_number: string;
  password: string;
  password_confirmation: string;
}

export interface IRegisteredUser {
  id: number;
  username: string;
  phone_number: string;
}

export interface IVerifyRegisterAccount {
  code: string;
  phone_number: string;
}
