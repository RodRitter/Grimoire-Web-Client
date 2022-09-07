import React from "react";
import styled from "styled-components";
import withModule from "./withModule";

const Wrapper = styled.div`
    font-family: "Inconsolata", monospace;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 2px dashed gray;
    border-radius: 5px;
    overflow: hidden;

    > span {
        position: absolute;
        text-align: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

const TestModuleComponent = () => {
    return (
        <Wrapper>
            <span>Test Module</span>
        </Wrapper>
    );
};

const TestModule = withModule(TestModuleComponent, "Test Component");

export default TestModule;
