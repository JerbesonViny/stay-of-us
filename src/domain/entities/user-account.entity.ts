import { PasswordDoesNotMatchConfirmPasswordError } from "@/domain/errors";
import { UserId } from "@/domain/entities";

export namespace UserAccount {
  export type Constructor = {
    id?: UserId;
    name: string;
    login: string;
    password: string;
  };

  export type ValidateCreateUserInput = {
    confirmPassword: string;
  };

  export type SetPasswordInput = {
    password: string;
  };
}

export class UserAccount {
  id?: UserId;
  name: string;
  login: string;
  private password: string;

  constructor({ id, name, login, password }: UserAccount.Constructor) {
    this.id = id ?? new UserId();
    this.name = name;
    this.login = login;
    this.password = password;
  }

  public validateCreateUser({
    confirmPassword,
  }: UserAccount.ValidateCreateUserInput): boolean {
    if (this.password !== confirmPassword) {
      throw new PasswordDoesNotMatchConfirmPasswordError();
    }

    return true;
  }

  getPassword(): string {
    return this.password;
  }

  setPassword({ password }: UserAccount.SetPasswordInput): void {
    this.password = password;
  }
}
