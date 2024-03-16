export class UserAlreadyExists extends Error {
  constructor() {
    super("User already exists");
    this.name = "UserAlrearyExists";
  }
}

export class PasswordDoesNotMatchConfirmPasswordError extends Error {
  constructor() {
    super("Password does not match with confirm password");
    this.name = "PasswordDoesNotMatchConfirmPasswordError";
  }
}
