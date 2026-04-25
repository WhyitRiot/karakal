export type DiscardMessage = {
    type: "DISCARD",
    gameId: string,
    playerId: string,
    cardIds: number[]
}