/* eslint-disable react/display-name */
import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { XCircle, Lock, Unlock } from "react-feather";

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

const introAnimation = keyframes`
 0% { opacity: 0 }
 100% { opacity: 1 }
`;

const EditLayer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 20;
    background: ${({ locked }) => (locked ? "#451517" : "rgb(25 26 28)")};
    border: 2px dotted #c7c6c6;
    color: gray;
    border-radius: 4px;
    display: flex;
    align-items: center;
    cursor: move;
    animation-name: ${introAnimation};
    animation-timing-function: ease-out;
    animation-duration: 0.3s;
    animation-iteration-count: 1;

    &:hover {
        border-color: ${({ locked }) => (locked ? "none" : "#fff")};
        background-color: ${({ locked }) =>
            locked ? "none" : "rgb(28 30 33)"};

        .actions-wrapper {
            opacity: 1;
        }
    }

    > span {
        flex: 1;
        font-family: "Inconsolata", monospace;
        font-size: 16px;
        text-align: center;
        user-select: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

const ActionsWrapper = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 12px;
    display: flex;
    flex-direction: column;
    transition: opacity 0.3s ease-out;
    opacity: 0;
`;

const Button = styled.button`
    width: 26px;
    height: 26px;
    display: block;
    background: none;
    outline: none;
    border: none;
    padding: 0;
    cursor: pointer;
    margin: 5px 0;
    position: relative;
    border-radius: 4px;

    > svg {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    &:hover {
        background: rgba(255, 255, 255, 0.1);
    }
`;

const RemoveButton = styled(Button)`
    color: #ff5656;
`;

const WrappedOuter = styled.div`
    height: 100%;
    ${({ editMode }) =>
        editMode &&
        `
        opacity: 0;
        pointer-events: none;
    `}
`;

function withModule(WrappedComponent, moduleName) {
    return (props) => {
        const { editMode, moduleKey, onRemoveModule, moduleData } = props;
        return (
            <Wrapper>
                {editMode && (
                    <EditLayer className="module-handle">
                        <span>{moduleName}</span>

                        <ActionsWrapper className="actions-wrapper">
                            {/* Lock Drag n Drop */}
                            {/* <LockButton onClick={() => onLockToggle(moduleKey)}>
                                {locked.includes(moduleKey) ? (
                                    <Lock />
                                ) : (
                                    <Unlock />
                                )}
                            </LockButton> */}

                            {/* Remove Module */}
                            {!moduleData.required && (
                                <RemoveButton
                                    onClick={() => onRemoveModule(moduleKey)}
                                >
                                    <XCircle />
                                </RemoveButton>
                            )}
                        </ActionsWrapper>
                    </EditLayer>
                )}

                <WrappedOuter editMode={editMode}>
                    <WrappedComponent {...props} />
                </WrappedOuter>
            </Wrapper>
        );
    };
}

export default withModule;
