export enum CardContent {
  ArtTitle = "art-title",
  TitleOnly = "title-only",
  ArtOnly = "art-only",
}

export enum CardSpacing {
  Compact = "compact",
  Normal = "normal",
  Comfortable = "comfortable",
}

export enum TextSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export const DEFAULT_USER_SETTINGS = {
  card_content: CardContent.ArtTitle,
  card_spacing: CardSpacing.Normal,
  text_size: TextSize.Medium,
} as const;
