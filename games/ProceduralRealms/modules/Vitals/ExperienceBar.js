import React, { useEffect, useState } from "react";
import styled from "styled-components";
import withModule from "../../../shared/withModule";
import { mergeDeep } from "../../../../lib/utils";

const Guage = styled.div`
    position: relative;
    height: 25px;
    background: #212223;
    border: 1px solid #191919;
    flex: 1;

    margin-left: 15px;
    &:first-child {
        margin-left: 0;
    }
`;

const GuageOverlay = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background: rgb(0, 0, 0);
    background: rgb(0, 0, 0);
    background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.5) 0%,
        rgba(0, 0, 0, 0) 100%
    );
`;

const GuageInner = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: ${({ progress }) => progress}%;
    background: gray;
    transition: all ease-in-out 0.5s;
`;

const GuageValue = styled.div`
    position: absolute;
    z-index: 10;
    font-size: 18px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    > span {
        display: inline-block;
        min-width: 38px;
        text-align: center;
    }
`;

const GuageLabel = styled.div`
    position: absolute;
    z-index: 10;
    font-size: 20px;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.4);
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
`;

const XPGuageInner = styled(GuageInner)`
    background: rgb(94, 97, 154);
    background: linear-gradient(
        180deg,
        rgba(94, 97, 154, 1) 0%,
        rgba(73, 75, 119, 1) 30%,
        rgba(73, 75, 119, 1) 75%,
        rgba(94, 97, 154, 1) 100%
    );
`;

const Wrapper = styled.div`
    font-family: "Inconsolata", monospace;
    filter: grayscale(${({ data }) => (data.level ? 0 : 1)});
    height: 100%;
`;

const InnerWrapper = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
`;

const LevelLabel = styled.span`
    margin-right: 25px;
`;

const ExperienceBarModule = ({ socket }) => {
    const [newData, setNewData] = useState({});
    const [data, setData] = useState({});

    useEffect(() => {
        if (socket) {
            socket.on("gmcp", (gmcpData) => {
                if (gmcpData.key === "Char.State") {
                    // console.log(gmcpData);
                    setNewData(gmcpData.data);
                }
            });

            socket.on("disconnected", () => {
                setData(null);
            });
        }
    }, [socket]);

    useEffect(() => {
        try {
            if (newData && newData.update && newData.update.player) {
                const _gameData = { ...data };
                const _newData = { ...newData.update.player };
                const _merged = mergeDeep(_gameData, _newData);
                setData(_merged);
            }
        } catch (e) {
            console.error("Error: useEffect[newData]", { error: e });
        }
    }, [newData]);

    return (
        <Wrapper data={data}>
            <InnerWrapper>
                <Guage>
                    <GuageOverlay />
                    <GuageValue>
                        {data.xp &&
                            data.xpForCurrentLevel &&
                            data.xpForNextLevel && (
                                <span>
                                    <LevelLabel>{`Level ${data.level}`}</LevelLabel>
                                    {`${Math.abs(
                                        data.xpForCurrentLevel - data.xp
                                    )} / ${
                                        data.xpForNextLevel -
                                        data.xpForCurrentLevel
                                    } (${Math.floor(
                                        ((data.xp - data.xpForCurrentLevel) /
                                            (data.xpForNextLevel -
                                                data.xpForCurrentLevel)) *
                                            100
                                    )}%)`}
                                </span>
                            )}
                    </GuageValue>
                    <GuageLabel>XP</GuageLabel>
                    <XPGuageInner
                        progress={
                            data.xp &&
                            data.xpForCurrentLevel &&
                            data.xpForNextLevel
                                ? ((data.xp - data.xpForCurrentLevel) /
                                      (data.xpForNextLevel -
                                          data.xpForCurrentLevel)) *
                                  100
                                : 100
                        }
                    />
                </Guage>
            </InnerWrapper>
        </Wrapper>
    );
};

const ExperienceBar = withModule(ExperienceBarModule, "Experience Bar");
export default ExperienceBar;
