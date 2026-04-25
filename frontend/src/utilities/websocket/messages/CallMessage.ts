export type CallMessage = {
    type: "CALL",
    gameId: string,
    playerId: string
}

export const createCallMessage = (gameId: string, playerId: string): CallMessage => ({
    type: "CALL",
    gameId,
    playerId
});