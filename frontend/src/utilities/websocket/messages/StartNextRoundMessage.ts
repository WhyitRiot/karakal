export type StartMessage = {
    type: "START",
    gameId: string
}

export const createStartMessage = (gameId : string) => ({
    type: "START",
    gameId
})