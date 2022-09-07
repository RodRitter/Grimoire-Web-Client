import React, { useEffect, useState, useRef } from "react";
import withModule from "../../../shared/withModule";
import styled from "styled-components";
import { Terminal, Hash, Package, BookOpen, User } from "react-feather";

import Button from "./components/Button";
import CardinalButtons from "./CardinalButtons";

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    bottom: 10px;
    left: 20px;
    right: 20px;
    display: flex;

    > div {
        &:nth-child(1) {
            flex: 1;
            width: 100%;
            max-width: 170px;
        }

        &:nth-child(2) {
            flex: 3;
        }

        &:nth-child(3) {
            flex: 1;
            width: 100%;
            max-width: 170px;
        }
    }
`;

const Container = styled.div`
    position: relative;

    > div {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }
`;

const ActionButtons = styled.div`
    aspect-ratio: auto 1 / 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px 4px;
`;

const IconButton = styled(Button)`
    padding: 10px 0;

    background: rgb(44, 76, 135);
    background: linear-gradient(
        180deg,
        rgba(44, 76, 135, 1) 0%,
        rgba(34, 62, 115, 1) 26%,
        rgba(33, 61, 113, 1) 100%
    );

    svg {
        color: #ffb302;
        width: 20px;
    }
`;

const MobileControlsModule = ({ socket }) => {
    return (
        <>
            <Wrapper>
                <Container>
                    <CardinalButtons socket={socket} />
                </Container>
                <Container></Container>
                <Container>
                    <ActionButtons>
                        <IconButton>
                            <Terminal />
                        </IconButton>

                        <IconButton>
                            <Hash />
                        </IconButton>

                        <IconButton>
                            <BookOpen />
                        </IconButton>

                        <IconButton>
                            <Package />
                        </IconButton>

                        <IconButton>
                            <User />
                        </IconButton>
                        <div />
                    </ActionButtons>
                </Container>
            </Wrapper>
        </>
    );
};

const MobileControls = withModule(MobileControlsModule, "Mobile Controls");
export default MobileControls;
