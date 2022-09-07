import React, { useEffect, useState } from "react";
import styled from "styled-components";
import colors from "../colors";

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    filter: grayscale(${({ data }) => (data ? 0 : 1)});
`;

const Heading = styled.h1`
    font-family: "Cinzel", serif;
    margin: 1px 1px 10px 1px;
    padding: 2px 0;
    border-top: 1px solid #262626;
    border-bottom: 1px solid #262626;
    font-size: 18px;
    text-align: center;
    background: rgb(179, 138, 62);

    text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.8);
    background: rgb(179, 138, 62);
    background: linear-gradient(
        90deg,
        rgba(179, 138, 62, 0) 0%,
        rgba(153, 118, 53, 1) 30%,
        rgba(153, 118, 53, 1) 60%,
        rgba(179, 138, 62, 0) 100%
    );
`;

const QuestList = styled.div`
    overflow: auto;
    position: absolute;
    top: 35px;
    bottom: 2px;
    left: 0;
    right: 2px;

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
const QuestItem = styled.div`
    padding: 8px 10px 8px 15px;
    display: flex;
    cursor: pointer;
    transition: all ease-in-out 0.2s;
    border-top: 1px solid rgba(255, 255, 255, 0.1);

    &:first-child {
        border: none;
    }
    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;
const QuestNum = styled.div`
    margin-right: 10px;
`;
const QuestTitle = styled.div``;

const NoDataText = styled.div`
    font-family: "Inconsolata", monospace;
    text-align: center;
    margin: 15px 0;
`;

const Quests = ({ socket }) => {
    const [quests, setQuests] = useState();

    const sendWrite = (command) => {
        socket.emit("write", command);
        const inputEvent = new CustomEvent("buffer-input-line", {
            detail: {
                line: command,
            },
        });
        window.dispatchEvent(inputEvent);
    };

    const convertToHtml = (text) => {
        const pattern = /(^|{{(?<color>\w))(?<content>[^{]+)/gi;

        let _html = "<span>";
        for (const match of text.matchAll(pattern)) {
            const color = match.groups.color;
            const content = match.groups.content;

            _html += `<span style="color:${
                colors[color] || "#fff"
            };">${content}</span>`;
        }
        _html += "</span>";

        return _html;
    };

    useEffect(() => {
        socket.on("gmcp", (data) => {
            if (data.key === "Char.State") {
                const _data = data.data;
                if (_data.update && _data.update.quests) {
                    const _quests = _data.update.quests;
                    setQuests(_quests);
                }
            }
        });
    }, []);

    return (
        <Wrapper data={quests}>
            <Heading>Quests</Heading>

            {quests && quests.length === 0 && (
                <NoDataText>No quests</NoDataText>
            )}

            {quests ? (
                <QuestList>
                    {quests.map((quest, index) => {
                        return (
                            <QuestItem
                                key={index}
                                onClick={() =>
                                    sendWrite(`quest info ${index + 1}`)
                                }
                            >
                                <QuestNum>{index + 1}.</QuestNum>
                                <QuestTitle
                                    dangerouslySetInnerHTML={{
                                        __html: convertToHtml(quest.name),
                                    }}
                                />
                            </QuestItem>
                        );
                    })}
                </QuestList>
            ) : (
                <QuestList>
                    <NoDataText>Waiting for data...</NoDataText>
                </QuestList>
            )}
        </Wrapper>
    );
};

export default Quests;
