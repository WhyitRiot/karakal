export type DrawMessage = {
    type: "DRAW",
    drawType: 'DECK' | 'DISCARD',
    cardId? : number
}