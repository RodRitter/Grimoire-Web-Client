import React, { useEffect, useState } from "react";
import withModule from "../../../shared/withModule";
import {
    Wrapper,
    PortraitBorder,
    Portrait,
    LevelPill,
    GuagesBorderWrapper,
    Guage,
    GuageOverlay,
    GuageValue,
    GuageLabel,
    HPGuageInner,
    ENGuageInner,
    STGuageInner,
    StatusWrapper,
    StatusIcon,
    StatusValue,
    NoDataText,
} from "./styles";

const VitalsComponent = ({ socket }) => {
    const [data, setData] = useState();

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
        <>
            <Wrapper data={data}>
                {!data && <NoDataText>No Data</NoDataText>}
                <PortraitBorder>
                    <Portrait>
                        <LevelPill>{data ? data.level : "0"}</LevelPill>
                    </Portrait>
                </PortraitBorder>
                <GuagesBorderWrapper>
                    <Guage>
                        <GuageOverlay />
                        <GuageValue>
                            <span>{data ? data.hp : "N/A"}</span>/
                            <span>{data ? data.maxhp : "N/A"}</span>
                        </GuageValue>
                        <GuageLabel>HP</GuageLabel>
                        <HPGuageInner
                            progress={data ? (data.hp / data.maxhp) * 100 : 100}
                        />
                    </Guage>
                    <Guage>
                        <GuageOverlay />
                        <GuageValue>
                            <span>{data ? data.en : "N/A"}</span>/
                            <span>{data ? data.maxen : "N/A"}</span>
                        </GuageValue>
                        <GuageLabel>EN</GuageLabel>
                        <ENGuageInner
                            progress={data ? (data.en / data.maxen) * 100 : 100}
                        />
                    </Guage>
                    <Guage>
                        <GuageOverlay />
                        <GuageValue>
                            <span>{data ? data.st : "N/A"}</span>/
                            <span>{data ? data.maxst : "N/A"}</span>
                        </GuageValue>
                        <GuageLabel>ST</GuageLabel>
                        <STGuageInner
                            progress={data ? (data.st / data.maxst) * 100 : 100}
                        />
                    </Guage>
                </GuagesBorderWrapper>

                <StatusWrapper>
                    <div>
                        <StatusIcon>Combo</StatusIcon>
                        <StatusValue>
                            {data ? data.combo : "N/A"}
                            <span>/{data ? data.maxcombo : "N/A"}</span>
                        </StatusValue>
                    </div>
                    <div>
                        <StatusIcon>Rage</StatusIcon>
                        <StatusValue>
                            {data ? data.rage : "N/A"}
                            <span>/{data ? data.maxrage : "N/A"}</span>
                        </StatusValue>
                    </div>
                </StatusWrapper>
            </Wrapper>
        </>
    );
};

const Vitals = withModule(VitalsComponent, "Vitals");
export default Vitals;
