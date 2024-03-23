export class AccessToken {
  static get expirationIsMS(): number {
    return 30 * 60 * 1000;
  }
}
