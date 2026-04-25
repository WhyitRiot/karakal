export type DrawMessage = {
    type: "DRAW",
    drawType: 'DECK' | 'DISCARD',
    cardId? : number
}

export const createDrawMessage = (drawType : 'DECK' | 'DISCARD', cardId? : number) => ({
    type: "DRAW",
    drawType,
    cardId
})