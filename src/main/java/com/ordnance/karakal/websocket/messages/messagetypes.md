CreateMessage:
{
    type: 'CREATE'

    gameId: '123'
}
JoinMessage:
{
    type: 'JOIN'

    gameId: UUID
    playerName: 'Wyatt'
}
DrawMessage:
{
    type: 'DRAW'
    
    gameId: UUID
    drawType: 'DECK' | 'DISCARD'
    cardId?
}
DiscardMessage:
{
    type: 'DISCARD'

    gameId: UUID
    playerId: UUID
    cardIds: Long[]
}
CallMessage:
{
    type: 'CALL'

    gameId: UUID
    playerId: UUID
}