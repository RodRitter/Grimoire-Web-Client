import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "../components/Modal";

const Wrapper = styled.div`
    height: 60px;
    padding: 0 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(105, 105, 105, 0.25);

    ${({ mobile }) =>
        mobile &&
        `@media only screen and (max-width: 960px) {
        display: none;
    }`}
`;

const Brand = styled.div`
    font-size: 20px;
    font-family: "Inconsolata", monospace;
    font-weight: bold;
`;

const Button = styled.button`
    border: 1px solid gray;
    background: transparent;
    color: gray;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: all linear 0.05s;
    margin: 0 5px;

    &:hover {
        border-color: white;
        color: white;
    }
`;

const GameHeader = ({
    onToggleEdit,
    onAddModule,
    onRemoveModule,
    onSaveLayout,
    onResetLayout,
    allModules,
    addedModules,
    mobileSplitScreen,
}) => {
    const [ready, setReady] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        setReady(true);
    }, []);

    useEffect(() => {
        onToggleEdit(editMode);
        if (!editMode && ready) {
            onSaveLayout();
        }
    }, [editMode]);

    return (
        <Wrapper mobile={mobileSplitScreen}>
            {modalOpen && (
                <Modal
                    onCloseModal={closeModal}
                    isOpen={modalOpen}
                    allModules={allModules}
                    addedModules={addedModules}
                    onAddModule={onAddModule}
                    onRemoveModule={onRemoveModule}
                />
            )}
            <Brand>Grimoire</Brand>
            <div>
                {editMode && (
                    <>
                        <Button onClick={openModal}>Modules</Button>
                        <Button onClick={() => onResetLayout()}>
                            Reset Layout
                        </Button>
                    </>
                )}
                <Button
                    onClick={() => {
                        setEditMode(!editMode);
                    }}
                >
                    {editMode ? "Save Layout" : "Edit Layout"}
                </Button>
            </div>
        </Wrapper>
    );
};

export default GameHeader;
