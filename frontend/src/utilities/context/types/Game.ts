export type Game = {
    gameId: string,
    date : string,
    status: string,
    winner: string
}

// @Id
// private UUID gameId;
//
// @Column(name = "created_at", nullable = false, updatable = false)
// private Instant createdAt = Instant.now();
//
// @Column(length = 20)
// private String status = "IN_PROGRESS";
//
// @ManyToOne(fetch = FetchType.LAZY)
// @JoinColumn(name = "winner_id")
// private User winner;