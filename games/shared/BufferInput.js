import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import withModule from "./withModule";

const StyledInput = styled.input`
    padding: 0 15px;
    background: #191a1c;
    border: 1px solid #424242;
    color: #fff;
    border-radius: 4px;
    font-size: 16px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;

    &:focus {
        outline: none;
    }
`;

const ConsoleInput = ({ socket }) => {
    const [value, setValue] = useState("");

    const [inputHistory, setHistory] = useState([]);
    const [selectedHistory, setSelectedHistory] = useState(null);
    const [lastActiveInput, setLastActiveInput] = useState(null);

    const inputRef = useRef();

    const _onChange = (event) => {
        setSelectedHistory(null);
        setLastActiveInput(event.target.value);
        setValue(event.target.value);
    };

    const onEnter = (value) => {
        socket.emit("write", value);
        sendInputEvent(value);
    };

    const onKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            onEnter(value);
            record(value);
            setLastActiveInput("");
            event.target.select();
            // setValue("");
        }
        if (event.key === "ArrowUp") {
            event.preventDefault();
            selectHistory(true);
        }
        if (event.key === "ArrowDown") {
            event.preventDefault();
            selectHistory();
        }
    };

    const record = (val) => {
        const curr = [...inputHistory];
        const MAX_HISTORY_LEN = 15;

        if (curr[curr.length - 1] !== val) {
            if (curr.length > MAX_HISTORY_LEN) curr.shift();
            curr.push(val);
            setHistory(curr);
        }
    };

    const selectHistory = (isUp) => {
        let curr = selectedHistory;
        if (curr === null) {
            if (isUp && inputHistory.length > 0) setSelectedHistory(0);
        } else if (curr !== null) {
            if (isUp && curr < inputHistory.length - 1)
                setSelectedHistory(curr + 1);
            else if (!isUp && curr > 0) {
                setSelectedHistory(curr - 1);
            } else if (!isUp) {
                setSelectedHistory(null);
            }
        }
    };

    const sendInputEvent = (line) => {
        const inputEvent = new CustomEvent("buffer-input-line", {
            detail: {
                line,
            },
        });
        window.dispatchEvent(inputEvent);
    };

    useEffect(() => {
        if (selectedHistory !== null) {
            const reverseHistory = [...inputHistory].reverse();
            setValue(reverseHistory[selectedHistory]);
        } else {
            setValue(lastActiveInput);
        }
    }, [selectedHistory]);

    return (
        <StyledInput
            ref={inputRef}
            type="text"
            value={value || ""}
            onChange={_onChange}
            onKeyDown={onKeyDown}
        />
    );
};

const BufferInput = withModule(ConsoleInput, "Buffer Input");

export default BufferInput;
