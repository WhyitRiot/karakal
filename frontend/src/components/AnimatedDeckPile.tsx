import React from 'react';
import {AnimatedCardItem} from "./AnimatedCardItem.tsx";
import {motion} from "framer-motion";
import type {Card} from "../utilities/card.ts";

const AnimatedDeckPile = ({card, totalCards, index, children} : {card :Card, totalCards : number, index : number, children : React.ReactNode}) => {
    //Calculate the spread logic
    const centerIndex = (totalCards - 1) / 2;
    const spreadAmount = 100; // How far they fan out
    return (
        <motion.div
            key={card.id}
            className="absolute inset-0"
            style={{ zIndex: index }}
            variants={{
                rest: {
                    x: (index % 3) * 4 - 4,
                    rotate: (index % 5) * 3 - 6,
                    y: 0
                },
                hover: {
                    // 3. Spread cards horizontally based on their index
                    x: (index - centerIndex) * spreadAmount,
                    rotate: 0,
                    y: -20, // Lift them up slightly
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                }
            }}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedDeckPile;