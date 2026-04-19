import type { UserRole } from "@/constants/lists";
import type { TagWithCount } from "@/types/games";

export const mockUser = {
  id: "mock-user-123",
  email: "user@example.com",
  created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
};

export const mockProfile = {
  first_name: "Jane",
  last_name: "Doe",
};

export const mockRole: UserRole = "user";

export const mockBoardData = {
  games: Array.from({ length: 12 }, (_, i) => ({ id: `game-${i}` })),
  lists: Array.from({ length: 3 }, (_, i) => ({ id: `list-${i}` })),
};

export const mockTags: TagWithCount[] = [
  {
    id: "tag-1",
    tag_name: "Favorites",
    created_at: "2024-01-01T00:00:00Z",
    game_count: 5,
  },
  {
    id: "tag-2",
    tag_name: "Backlog",
    created_at: "2024-01-02T00:00:00Z",
    game_count: 8,
  },
  {
    id: "tag-3",
    tag_name: "Completed",
    created_at: "2024-01-03T00:00:00Z",
    game_count: 3,
  },
];
