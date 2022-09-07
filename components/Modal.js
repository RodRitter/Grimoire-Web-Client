import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { X } from "react-feather";

const introAnimation = keyframes`
    0% { opacity: 0; top: 5% }
    100% { opacity: 1; top: 10% }
`;

const outroAnimation = keyframes`
    0% { opacity: 1; top: 10% }
    100% { opacity: 0; top: 5% }
`;

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 30;
    opacity: 1;
`;

const Background = styled.div`
    background: rgba(25, 26, 28, 0.2);
    backdrop-filter: blur(4px);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
`;

const ModalContainer = styled.div`
    background: #282b2f;
    color: #fff;
    border-radius: 5px;
    padding: 15px;
    border: 1px solid #4c4d51;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    max-width: 600px;
    width: 100%;
    min-height: 100px;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.15);
    -webkit-box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.15);

    animation-name: ${introAnimation};
    animation-timing-function: ease-in-out;
    animation-duration: 0.2s;
    animation-iteration-count: 1;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    padding: 5px;

    > svg {
        width: 20px;
        height: 20px;
    }
`;

const Heading = styled.h2`
    margin: 0;
    font-size: 20px;
`;

const ItemsWrapper = styled.div`
    padding: 15px 0;
`;
const LineItem = styled.div`
    height: 54px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #373737;
    font-size: 16px;

    &:first-child {
        border: none;
    }
`;

const ModuleName = styled.div``;

const Button = styled.button`
    border: 1px solid ${({ isNew }) => (isNew ? "#2e982e" : "#ff3737")};
    color: ${({ isNew }) => (isNew ? "#2e982e" : "#ff3737")};

    background: transparent;
    border-radius: 5px;
    cursor: pointer;
    transition: all linear 0.05s;
    margin: 0 5px;
    min-width: 60px;
    height: 34px;
    font-size: 16px;

    &:hover {
        border-color: ${({ isNew }) => (isNew ? "#78ce78" : "#ff7171")};
        color: ${({ isNew }) => (isNew ? "#78ce78" : "#ff7171")};
    }
`;

const NoticeText = styled.div`
    color: gray;
    font-style: italic;
`;

const Modal = ({
    isOpen,
    onCloseModal,
    allModules,
    addedModules,
    onAddModule,
    onRemoveModule,
}) => {
    return (
        <Wrapper isOpen={isOpen}>
            <Background onClick={onCloseModal} />
            <ModalContainer>
                <CloseButton onClick={onCloseModal}>
                    <X />
                </CloseButton>
                <Heading>Components</Heading>
                <ItemsWrapper>
                    {Object.values(allModules).map((module) => {
                        const isNew = !addedModules.includes(module.layout.i);

                        return (
                            <LineItem key={module.name}>
                                <ModuleName>{module.name}</ModuleName>
                                {!module.required ? (
                                    <Button
                                        onClick={() => {
                                            const modKey = module.layout.i;
                                            if (isNew) {
                                                onAddModule(modKey);
                                            } else {
                                                onRemoveModule(modKey);
                                            }
                                        }}
                                        isNew={isNew}
                                    >
                                        {isNew ? "Add" : "Remove"}
                                    </Button>
                                ) : (
                                    <NoticeText>Required</NoticeText>
                                )}
                            </LineItem>
                        );
                    })}
                </ItemsWrapper>
            </ModalContainer>
        </Wrapper>
    );
};

export default Modal;
