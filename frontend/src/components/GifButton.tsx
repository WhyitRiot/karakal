import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type GifButtonProps = {
    nonHover : string,
    hover : string,
    type : "button" | "submit" | "reset" | undefined,
    click?: () => void
}

export default function KarakalButton({ nonHover, hover, type, click } : GifButtonProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.button
            className="h-20 w-2/3 text-red-600 overflow-hidden rounded-2xl hover:cursor-pointer relative shadow-sm hover:shadow-md"
            type={type}
            onClick={click && click}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
        >
            {/* Base image */}
            <motion.img
                src={nonHover}
                alt="karakal"
                className="absolute inset-0 h-full w-full object-contain rounded pl-1 pr-2"
                animate={{ opacity: hovered ? 0 : 1 }}
                transition={{ duration: 0.2 }}
            />

            {/* Hover image */}
            <motion.img
                src={hover}
                alt="karakal hover"
                className="absolute inset-0 h-full w-full object-contain rounded pl-1 pr-2"
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
            />
        </motion.button>
    );
}