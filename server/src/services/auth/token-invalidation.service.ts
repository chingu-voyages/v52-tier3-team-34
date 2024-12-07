/**
 * Simple in-memory token invalidation service
 * Note: In production, use Redis or a database for persistence
 */
export class TokenInvalidationService {
  private static invalidatedTokens = new Set<string>();

  /**
   * Invalidate a token
   */
  static invalidateToken(token: string): void {
    this.invalidatedTokens.add(token);
  }

  /**
   * Check if a token is invalidated
   */
  static isTokenInvalidated(token: string): boolean {
    return this.invalidatedTokens.has(token);
  }

  /**
   * Clear invalidated tokens (for testing/maintenance)
   */
  static clearInvalidatedTokens(): void {
    this.invalidatedTokens.clear();
  }
}
