import React from "react";
import { useRouter } from "next/router";

const Game = () => {
    const router = useRouter();
    const { gameKey } = router.query;

    return <h1>{gameKey}</h1>;
};

export default Game;
