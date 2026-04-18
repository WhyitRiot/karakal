import {type Card} from "./card.ts"
import {Suit} from "./suit.ts"
import {Rank} from "./rank.ts"


const fillDeck = () : Card[] =>{
    const deck : Card[] = [];
    for (const suit of Object.values(Suit)){
        for(const rank of Object.values(Rank)){
            deck.push({rank, suit})
        }
    }
    return deck;
}

const shuffle = (deck : Card[]) : Card[] => {
    for (let i = deck.length -1 ; i >= 0; i--){
        const randIndex = Math.floor(Math.random() * i + 1);
        const buffer : Card = deck[i];
        deck[i] = deck[randIndex];
        deck[randIndex] = buffer;
    }
    return deck;
}

const cut = (deck : Card[], from : number) : Card[] =>{
    deck.push(...deck.splice(0, from + 1))
    return deck;
}

const createDeck = () : Card[] =>{
    let deck : Card[] = fillDeck();
    deck = shuffle(deck);
    return deck;
}

const deck: Card[] = createDeck();
