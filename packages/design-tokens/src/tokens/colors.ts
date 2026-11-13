/** RoomSync colour tokens. Framework-independent; no Tailwind or shadcn/ui dependency. */
export const colors = {
  brand: {
    primary: "#DD700B",
    secondary: "#707D75",
  },
  neutral: {
    warmGrey: "#ADACA7",
    background: "#FCF8D8",
    surface: "#D9DADF",
    white: "#FFFFFF",
  },
  text: {
    // Neutral values for readability on the cream background.
    primary: "#1F2421",
    secondary: "#4A524D",
    onPrimary: "#FFFFFF",
  },
  border: {
    default: "#D9DADF",
    strong: "#ADACA7",
  },
  state: {
    success: "#2F7D4F",
    warning: "#B7791F",
    error: "#B42318",
    info: "#707D75",
  },
} as const;

export type Colors = typeof colors;
