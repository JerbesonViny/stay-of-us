import { createHash } from "crypto";
import { Service } from "typedi";
import { CreateHashService } from "@/domain/services";

export const CREATE_HASH_SERVICE = "create-hash.service";

@Service(CREATE_HASH_SERVICE)
export class CreateHashServiceImpl implements CreateHashService {
  private algorithm: string = "sha512";

  perform({ text }: CreateHashService.Input): string {
    const hasher = createHash(this.algorithm);

    hasher.update(text);

    return hasher.digest("hex");
  }
}
