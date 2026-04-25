export type DiscardMessage = {
    type: "DISCARD",
    gameId: string,
    playerId: string,
    cardIds: number[]
}

export const createDiscardMessage = (gameId: string, playerId: string, cardIds: number[]) : DiscardMessage => ({
    type: "DISCARD",
    gameId,
    playerId,
    cardIds
})