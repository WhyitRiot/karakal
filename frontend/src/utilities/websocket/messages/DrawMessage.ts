export type DrawMessage = {
    type: "DRAW",
    gameId: number,
    drawType: 'DECK' | 'DISCARD',
    playerId: string,
    cardId? : number
}

export const createDrawMessage = (gameId: string, drawType : 'DECK' | 'DISCARD', playerId: string, cardId? : number) => ({
    type: "DRAW",
    gameId,
    drawType,
    playerId,
    cardId
})