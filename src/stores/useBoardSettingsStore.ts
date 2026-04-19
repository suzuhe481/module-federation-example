import { create } from "zustand";
import {
  CardContent,
  CardSpacing,
  TextSize,
  DEFAULT_USER_SETTINGS,
} from "@/constants/settings";

interface UserSettings {
  card_content: string;
  card_spacing: string;
  text_size: string;
}

interface BoardSettingsStore {
  cardContent: CardContent;
  cardSpacing: CardSpacing;
  textSize: TextSize;
  isOpen: boolean;

  setCardContent: (value: CardContent) => void;
  setCardSpacing: (value: CardSpacing) => void;
  setTextSize: (value: TextSize) => void;
  applySettings: (settings: UserSettings) => void;
  open: () => void;
  close: () => void;
}

export const useBoardSettingsStore = create<BoardSettingsStore>()((set) => ({
  cardContent: DEFAULT_USER_SETTINGS.card_content,
  cardSpacing: DEFAULT_USER_SETTINGS.card_spacing,
  textSize: DEFAULT_USER_SETTINGS.text_size,
  isOpen: false,

  setCardContent: (value) => set({ cardContent: value }),
  setCardSpacing: (value) => set({ cardSpacing: value }),
  setTextSize: (value) => set({ textSize: value }),
  applySettings: (settings) =>
    set({
      cardContent: settings.card_content as CardContent,
      cardSpacing: settings.card_spacing as CardSpacing,
      textSize: settings.text_size as TextSize,
    }),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
