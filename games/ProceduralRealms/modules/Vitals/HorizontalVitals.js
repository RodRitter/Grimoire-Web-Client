import React, { useEffect, useState } from "react";
import styled from "styled-components";
import withModule from "../../../shared/withModule";

const Guage = styled.div`
    position: relative;
    height: 25px;
    background: #212223;
    border: 1px solid #191919;
    flex: 1;

    margin-left: 1px;
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

const HPGuageInner = styled(GuageInner)`
    background: rgb(200, 55, 57);
    background: linear-gradient(
        180deg,
        rgba(200, 55, 57, 1) 0%,
        rgba(168, 40, 41, 1) 30%,
        rgba(168, 40, 41, 1) 75%,
        rgba(200, 55, 57, 1) 100%
    );
`;

const ENGuageInner = styled(GuageInner)`
    background: rgb(48, 192, 214);
    background: linear-gradient(
        180deg,
        rgba(48, 192, 214, 1) 0%,
        rgba(32, 144, 161, 1) 30%,
        rgba(32, 144, 161, 1) 75%,
        rgba(48, 192, 214, 1) 100%
    );
`;

const STGuageInner = styled(GuageInner)`
    background: rgb(231, 142, 67);
    background: linear-gradient(
        180deg,
        rgba(231, 142, 67, 1) 0%,
        rgba(185, 106, 40, 1) 30%,
        rgba(185, 106, 40, 1) 75%,
        rgba(231, 142, 67, 1) 100%
    );
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
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
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

const HorizontalVitalsModule = ({ socket }) => {
    const [data, setData] = useState({});

    useEffect(() => {
        if (socket) {
            socket.on("gmcp", (data) => {
                if (data.key === "Char.Vitals") {
                    setData(data.data);
                } else if (data.key === "Char.State") {
                    // Update delta state
                    // TODO speak with Admin about keeping the names the same as Char.Vitals
                }
            });

            socket.on("disconnected", () => {
                setData(null);
            });
        }
    }, [socket]);

    return (
        <Wrapper data={data}>
            <InnerWrapper>
                <Guage>
                    <GuageOverlay />
                    <GuageValue>
                        <span>{data.hp || "N/A"}</span>/
                        <span>{data.maxhp || "N/A"}</span>
                    </GuageValue>
                    <GuageLabel>HP</GuageLabel>
                    <HPGuageInner
                        progress={
                            data.hp && data.maxhp
                                ? (data.hp / data.maxhp) * 100
                                : 100
                        }
                    />
                </Guage>
                <Guage>
                    <GuageOverlay />
                    <GuageValue>
                        <span>{data.en || "N/A"}</span>/
                        <span>{data.maxen || "N/A"}</span>
                    </GuageValue>
                    <GuageLabel>EN</GuageLabel>
                    <ENGuageInner
                        progress={
                            data.en && data.maxen
                                ? (data.en / data.maxen) * 100
                                : 100
                        }
                    />
                </Guage>
                <Guage>
                    <GuageOverlay />
                    <GuageValue>
                        <span>{data.st || "N/A"}</span>/
                        <span>{data.maxst || "N/A"}</span>
                    </GuageValue>
                    <GuageLabel>ST</GuageLabel>
                    <STGuageInner
                        progress={
                            data.st && data.maxst
                                ? (data.st / data.maxst) * 100
                                : 100
                        }
                    />
                </Guage>
            </InnerWrapper>
        </Wrapper>
    );
};

const HorizontalVitals = withModule(HorizontalVitalsModule, "Vitals 2");
export default HorizontalVitals;
