import { AccessToken } from "@/domain/models";
import { AuthenticationError } from "@/domain/errors";

namespace FacebookAuthentication {
  export type Input = {
    token: string;
  };

  export type Output = AccessToken | AuthenticationError;
}

export interface FacebookAuthentication {
  perform: (
    input: FacebookAuthentication.Input
  ) => Promise<FacebookAuthentication.Output>;
}
