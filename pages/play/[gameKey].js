import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import io from "socket.io-client";
import styled from "styled-components";
import Games from "../../games";

import GameHeader from "../../containers/GameHeader";
import { GridLayout, GridLayoutChild } from "../../components/GridLayout";

const Wrapper = styled.div`
    padding: ${({ padding }) => padding}px;
`;

const Game = () => {
    // Router
    const router = useRouter();
    const { gameKey } = router.query;
    // Game
    const [gameData, setGameData] = useState();
    const [modules, setModules] = useState({ lg: [], md: [], sm: [] });
    // Layout
    const [breakpoint, setBreakpoint] = useState("lg");
    const [defaultLayouts, setDefaultLayouts] = useState({
        lg: [],
        md: [],
        sm: [],
    });
    const [currLayouts, setCurrLayouts] = useState({ lg: [], md: [], sm: [] });
    const [lastLayout, setLastLayout] = useState();
    const [editMode, setEditMode] = useState(false);
    // Socket
    const [socket, setSocket] = useState();

    const onAddModule = (module) => {
        const exists = Object.keys(gameData.modules).includes(module);
        const isUsed = modules[breakpoint].includes(module);

        if (exists && !isUsed) {
            const newModules = { ...modules };
            newModules[breakpoint].push(module);
            setModules(newModules);
        }
    };

    const onRemoveModule = (module) => {
        const mods = gameData.modules;
        if (gameData && mods[module] && !mods[module].required) {
            const remainingModules = modules[breakpoint].filter(
                (mod) => mod != module
            );

            const _modules = { ...modules };
            _modules[breakpoint] = remainingModules;
            setModules(_modules);
        }
    };

    const resetLayout = () => {
        if (gameData) {
            const _modules = { ...modules };

            _modules[breakpoint] = gameData.defaultLayouts[breakpoint];

            setModules(_modules);
        }
    };

    const onBreakpointChange = (breakpoint) => {
        setBreakpoint(breakpoint);
    };

    const save = () => {
        if (lastLayout && gameKey) {
            setCurrLayouts(lastLayout);

            localStorage.setItem(
                `${gameKey}-layouts`,
                JSON.stringify(lastLayout)
            );
            localStorage.setItem(`${gameKey}-modules`, JSON.stringify(modules));
        }
    };

    const load = () => {
        // Load layout
        const _layoutsStr = localStorage.getItem(`${gameKey}-layouts`);

        try {
            const _layouts = JSON.parse(_layoutsStr);
            if (_layouts) {
                setCurrLayouts(_layouts);
            }
        } catch (e) {}

        // Load modules
        const _modulesStr = localStorage.getItem(`${gameKey}-modules`);
        try {
            if (_modulesStr) {
                const _modules = JSON.parse(_modulesStr);
                setModules(_modules);
            }
        } catch (e) {}
    };

    // Connect to game once socket is connected
    useEffect(() => {
        if (socket) {
            socket.emit("connect-game", gameKey);
        }
    }, [socket]);

    useEffect(() => {
        if (gameKey && Games[gameKey]) {
            // Store gameData
            const data = Games[gameKey];
            setGameData(data);

            // Store default layout
            setDefaultLayouts(data.defaultLayouts);
            setCurrLayouts(data.defaultLayouts);

            // Set default Layout modules
            const _modules = {};
            Object.entries(data.defaultLayouts).forEach(([_bp, _mods]) => {
                _modules[_bp] = _mods.map((_mod) => _mod.i);
            });
            setModules(_modules);

            load();

            // Connect to socket
            setSocket(
                io.connect(
                    "https://king-prawn-app-megxm.ondigitalocean.app:3001"
                )
            );
        } else {
            // redirect
        }
    }, [gameKey]);

    return (
        <>
            {gameData && (
                <Wrapper padding={0}>
                    {breakpoint && (
                        <GameHeader
                            onToggleEdit={setEditMode}
                            onAddModule={onAddModule}
                            onRemoveModule={onRemoveModule}
                            onSaveLayout={save}
                            onResetLayout={resetLayout}
                            allModules={gameData.modules}
                            addedModules={modules[breakpoint]}
                        />
                    )}

                    <GridLayout
                        layouts={currLayouts}
                        onBreakpointChange={onBreakpointChange}
                        onLayoutChange={(curr, all) => setLastLayout(all)}
                        editMode={editMode}
                        breakpoints={gameData.breakpoints}
                        cols={gameData.cols}
                        rowHeight={gameData.rowHeight}
                        margin={gameData.margin}
                    >
                        {socket &&
                            modules[breakpoint] &&
                            modules[breakpoint].map((module) => {
                                if (
                                    gameData.modules &&
                                    gameData.modules[module]
                                ) {
                                    const Module =
                                        gameData.modules[module].component;

                                    const _dataGrid = currLayouts[
                                        breakpoint
                                    ].filter((_mod) => _mod.i === module);

                                    return (
                                        <GridLayoutChild
                                            key={module}
                                            data-grid={
                                                _dataGrid[0] ||
                                                gameData.modules[module].layout
                                            }
                                        >
                                            <Module
                                                socket={socket}
                                                editMode={editMode}
                                                onRemoveModule={onRemoveModule}
                                                moduleKey={module}
                                                moduleData={
                                                    gameData.modules[module]
                                                }
                                            />
                                        </GridLayoutChild>
                                    );
                                }
                            })}
                    </GridLayout>
                </Wrapper>
            )}
        </>
    );
};

export default Game;
