export type StartNextRoundMessage = {
    type: "NEXT",
    gameId: string
}

export const createStartNextRoundMessage = (gameId : string) => ({
    type: "NEXT",
    gameId
})