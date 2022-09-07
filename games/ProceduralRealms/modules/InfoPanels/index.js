import React, { useEffect, useState } from "react";
import withModule from "../../../shared/withModule";
import styled from "styled-components";

import Quests from "./Quests";
import Skills from "./Skills";

const BorderWrapper = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    border-radius: 4px;

    background: rgb(207, 170, 37);
    background: linear-gradient(
        180deg,
        rgba(207, 170, 37, 0.8) 0%,
        rgba(170, 114, 0, 0.8) 100%
    );
`;

const Wrapper = styled.div`
    border-radius: 4px;
    background: #191a1c;
    position: absolute;
    top: 1px;
    bottom: 1px;
    left: 1px;
    right: 1px;
    overflow: hidden;
`;

const TabWrapper = styled.div`
    background: #212226;
    width: 100%;
    display: flex;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    overflow: auto;

    ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
        margin-right: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background: #595b5e;
        border-radius: 20px;
    }

    ::-webkit-scrollbar-track {
        background-color: #2a2c2f;
    }
`;

const TabButton = styled.div`
    flex: 1;
    text-align: center;
    font-family: "Cinzel", serif;
    font-weight: 300;
    font-size: 14px;
    padding: 10px 15px;
    cursor: pointer;
    transition: all ease-in-out 0.2s;

    border-left: 1px solid rgba(255, 255, 255, 0.2);

    &:first-child {
        border-left: none;
    }

    background: rgb(57, 61, 69);
    background: linear-gradient(
        180deg,
        rgba(57, 61, 69, 1) 0%,
        rgba(25, 26, 28, 1) 25%,
        rgba(25, 26, 28, 1) 100%
    );

    ${({ active }) =>
        active &&
        `
        background: rgb(25, 26, 28);
        background: linear-gradient(
            180deg,
            rgba(25, 26, 28, 1) 0%,
            rgba(27, 28, 29, 1) 70%,
            rgba(66, 56, 24, 0.8) 95%,
            rgba(207, 170, 37, 0.6) 100%
        );
        color: #ffcf00;
    `}

    &:hover {
        color: #ffcf00;
    }
`;

const PanelWrapper = styled.div`
    position: absolute;
    top: 40px;
    bottom: 0;
    left: 0;
    right: 0;

    ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
        margin-right: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background: #595b5e;
        border-radius: 20px;
    }

    ::-webkit-scrollbar-track {
        background-color: #2a2c2f;
    }
`;

const Panel = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    ${({ active }) =>
        !active &&
        `
        opacity: 0;
        pointer-events: none;
    `}
`;

const InfoPanelsModule = ({ socket }) => {
    const [tab, setTab] = useState(0);
    return (
        <BorderWrapper>
            <Wrapper>
                <TabWrapper>
                    <TabButton active={tab === 0} onClick={() => setTab(0)}>
                        Quests
                    </TabButton>
                    <TabButton active={tab === 1} onClick={() => setTab(1)}>
                        Skills
                    </TabButton>
                </TabWrapper>

                <PanelWrapper>
                    <Panel active={tab === 0}>
                        <Quests socket={socket} />
                    </Panel>
                    <Panel active={tab === 1}>
                        <Skills socket={socket} />
                    </Panel>
                </PanelWrapper>
            </Wrapper>
        </BorderWrapper>
    );
};

const InfoPanels = withModule(InfoPanelsModule, "Info Panels");
export default InfoPanels;
