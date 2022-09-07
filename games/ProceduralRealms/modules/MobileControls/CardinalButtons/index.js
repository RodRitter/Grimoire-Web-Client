import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ChevronUp, Eye } from "react-feather";
import Button from "../components/Button";

const Wrapper = styled.div``;

const InnerWrapper = styled.div`
    aspect-ratio: auto 1 / 1;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 4px 4px;
    height: 100%;
`;

const CardinalButtonsModule = ({ socket, disabled }) => {
    const write = (command) => {
        if (!disabled) {
            socket.emit("write", command);

            // Use this if you want to echo the command in the terminal
            const inputEvent = new CustomEvent("buffer-input-line", {
                detail: {
                    line: command,
                },
            });
            window.dispatchEvent(inputEvent);
        }
    };

    return (
        <Wrapper>
            <InnerWrapper>
                <Button
                    rotate={-45}
                    disabled={disabled}
                    onClick={() => write("nw")}
                >
                    <ChevronUp />
                </Button>
                <Button disabled={disabled} onClick={() => write("n")}>
                    <ChevronUp />
                </Button>
                <Button
                    rotate={45}
                    disabled={disabled}
                    onClick={() => write("ne")}
                >
                    <ChevronUp />
                </Button>
                <Button
                    rotate={-90}
                    disabled={disabled}
                    onClick={() => write("w")}
                >
                    <ChevronUp />
                </Button>
                <Button disabled={disabled} onClick={() => write("look")}>
                    <Eye />
                </Button>
                <Button
                    rotate={90}
                    disabled={disabled}
                    onClick={() => write("e")}
                >
                    <ChevronUp />
                </Button>
                <Button
                    rotate={-135}
                    disabled={disabled}
                    onClick={() => write("sw")}
                >
                    <ChevronUp />
                </Button>
                <Button
                    rotate={180}
                    disabled={disabled}
                    onClick={() => write("s")}
                >
                    <ChevronUp />
                </Button>
                <Button
                    rotate={135}
                    disabled={disabled}
                    onClick={() => write("se")}
                >
                    <ChevronUp />
                </Button>
            </InnerWrapper>
        </Wrapper>
    );
};

export default CardinalButtonsModule;
