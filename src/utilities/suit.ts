export const Suit = {
    Hearts: "HEARTS",
    Clubs: "CLUBS",
    Diamonds: "DIAMONDS",
    Spades: "SPADES"
}

export type Suit = typeof Suit[keyof typeof Suit];

