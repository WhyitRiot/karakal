export type PlayMessage = {
    type: "PLAY",
    playerId: string,
    drawType: 'DECK' | 'DISCARD',
    drawCardId? : number,
    discardIds: number[]
}

export const createPlayMessage = (gameId : string, playerId: string, drawType: string, discardIds: number[], drawCardId?: number) => ({
    type: "PLAY",
    gameId,
    playerId,
    drawType,
    drawCardId,
    discardIds,
})
