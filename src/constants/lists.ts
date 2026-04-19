export type UserRole = "user" | "admin";

export const DEMO_MAX_LISTS = 10;
export const DEMO_MAX_GAMES_PER_LIST = 10;

export const USER_MAX_LISTS = 20;
export const USER_MAX_GAMES_PER_LIST = 50;

export function getLimitsForRole(
  role: UserRole | null,
  isDemo: boolean,
): { maxLists: number; maxGamesPerList: number } {
  if (isDemo) {
    return {
      maxLists: DEMO_MAX_LISTS,
      maxGamesPerList: DEMO_MAX_GAMES_PER_LIST,
    };
  }
  if (role === "admin") {
    return { maxLists: Infinity, maxGamesPerList: Infinity };
  }
  return { maxLists: USER_MAX_LISTS, maxGamesPerList: USER_MAX_GAMES_PER_LIST };
}
