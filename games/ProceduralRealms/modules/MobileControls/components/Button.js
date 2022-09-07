import React from "react";
import styled from "styled-components";

const ButtonBorder = styled.button`
    font-family: "Inconsolata", monospace;
    outline: none;
    border: none;
    position: relative;
    overflow: hidden;
    font-size: 15px;
    text-align: center;

    color: #fff;

    background: rgb(74, 94, 105);
    background: linear-gradient(
        180deg,
        rgba(74, 94, 105, 1) 0%,
        rgba(57, 76, 85, 1) 20%,
        rgba(53, 71, 80, 1) 100%
    );

    &:disabled {
        opacity: 0.4;
    }
`;

const ButtonOverlay = styled.div`
    position: absolute;
    z-index: 10;
    top: 1px;
    bottom: 1px;
    left: 1px;
    right: 1px;

    background: rgb(25, 26, 28);
    background: radial-gradient(
        circle,
        rgba(25, 26, 28, 0) 0%,
        rgba(25, 26, 28, 0.35) 100%
    );
`;

const ButtonInner = styled.div`
    > svg {
        width: 18px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%)
            rotate(${({ rotate }) => (rotate ? `${rotate}deg` : 0)});
        color: rgba(255, 255, 255, 0.75);
    }
`;

const Button = ({ rotate, ...props }) => (
    <ButtonBorder {...props}>
        <ButtonOverlay />
        <ButtonInner rotate={rotate}>{props.children}</ButtonInner>
    </ButtonBorder>
);

export default Button;
