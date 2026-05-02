export type StayMessage = {
    type: "STAY",
    gameId: string,
}

export const createStayMessage = (gameId: string): StayMessage => ({
    type: "STAY",
    gameId
});