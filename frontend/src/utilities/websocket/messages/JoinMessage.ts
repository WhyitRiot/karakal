export type JoinMessage = {
    type: "JOIN",
    gameId: string,
    playerName: string
}

export const createJoinMessage = (gameId : string, playerName : string) => ({
    type: "JOIN",
    gameId,
    playerName
})