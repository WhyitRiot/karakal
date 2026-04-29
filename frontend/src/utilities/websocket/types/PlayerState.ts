import type {Card} from "../../card.ts";

export type PlayerState = {
    userId : string,
    name : string,
    score : number,
    hand : Card[]
}

/*
public UUID userId;
public String name;
public int score;
public List<Card> hand;
*/
