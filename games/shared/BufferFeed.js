import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import withModule from "./withModule";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
`;

const BufferList = styled.pre`
    margin: 5px 0;
    font-family: "Inconsolata", monospace;
    font-size: 22px;
    overflow-y: auto;
    white-space: pre-wrap;
    scroll-behavior: smooth;

    ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }

    ::-webkit-scrollbar-thumb {
        background: #595b5e;
        border-radius: 20px;
    }

    ::-webkit-scrollbar-track {
        background-color: #2a2c2f;
    }
`;

const BufferLine = styled.div``;

const ConsoleBuffer = ({ socket }) => {
    const [bufferItems, setBufferItems] = useState([]);
    const [lastBufferItem, setLastBufferItem] = useState();

    const bufferRef = useRef();

    const addBufferLine = (line) => {
        setLastBufferItem(line);
    };

    useEffect(() => {
        window.addEventListener("buffer-input-line", (e) => {
            addBufferLine(e.detail.line);
        });

        return () => {
            window.removeEventListener("buffer-input-line", (e) =>
                addBufferLine(e.detail.line)
            );
        };
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on("connected", (gameKey) => {
                console.log("connected");
                addBufferLine(
                    `<div style="margin: 40px 0;">Grimoire Web Client Alpha - Connected to <b>${gameKey}</b></div>`
                );
            });

            socket.on("disconnected", () => {
                console.log("disconnected");
            });

            socket.on("buffer", (line) => {
                addBufferLine(line);
            });

            socket.on("error", (error) => {
                console.log(`Error: ${error.message}`, error.games);
            });
        }
    }, [socket]);

    useEffect(() => {
        if (lastBufferItem) {
            const buff = [...bufferItems];
            const MAX_BUFFER_ITEMS = 50;
            if (buff.length >= MAX_BUFFER_ITEMS) {
                buff.shift();
            }

            buff.push(lastBufferItem);
            setBufferItems(buff);
        }
    }, [lastBufferItem]);

    const scrollToBottom = () => {
        if (bufferRef.current) {
            bufferRef.current.scrollTop = bufferRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [bufferItems]);

    return (
        <Wrapper>
            <BufferList ref={bufferRef}>
                {bufferItems.map((b, index) => (
                    <BufferLine
                        key={index}
                        dangerouslySetInnerHTML={{ __html: b }}
                    />
                ))}
            </BufferList>
        </Wrapper>
    );
};

const BufferFeed = withModule(ConsoleBuffer, "Buffer Feed");

export default BufferFeed;
