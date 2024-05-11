import { createHash } from "crypto";
import { Service } from "typedi";
import { CreateHash } from "@/domain/services";

export const CREATE_HASH_SERVICE = "create-hash.service";

@Service(CREATE_HASH_SERVICE)
export class CreateHashService implements CreateHash {
  private algorithm: string = "sha512";

  perform({ text }: CreateHash.Input): string {
    const hasher = createHash(this.algorithm);

    hasher.update(text);

    return hasher.digest("hex");
  }
}
