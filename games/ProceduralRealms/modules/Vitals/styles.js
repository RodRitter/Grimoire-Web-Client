import styled from "styled-components";

export const Wrapper = styled.div`
    font-family: "Inconsolata", monospace;
    position: absolute;
    padding: 20px 0;
    margin: 10px 20px;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);

    filter: grayscale(${({ data }) => (data ? 0 : 1)});
`;

export const NoDataText = styled.div`
    position: absolute;
    top: 48px;
    left: 10px;
    z-index: 40;
    font-weight: bold;
    // padding: 5px 10px;
    // background: rgba(0, 0, 0, 0.7);
`;

export const BorderWrapper = styled.div`
    background: rgb(207, 170, 37);
    background: linear-gradient(
        180deg,
        rgba(207, 170, 37, 0.9) 0%,
        rgba(170, 114, 0, 0.9) 100%
    );
    padding: 2px 0;
`;

export const GuagesBorderWrapper = styled(BorderWrapper)`
    margin-left: 64px;
    overflow: hidden;
    border-radius: 2px;
`;

export const Guage = styled.div`
    border: 1px solid black;
    border-right: none;
    border-bottom: none;
    position: relative;
    height: 25px;
    background: #212223;

    &:last-child {
        border-bottom: 1px solid black;
    }
`;

export const GuageOverlay = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background: rgb(0, 0, 0);
    background: rgb(0, 0, 0);
    background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.4) 0%,
        rgba(0, 0, 0, 0) 100%
    );
`;

export const GuageInner = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: ${({ progress }) => progress}%;
    background: gray;
    transition: all ease-in-out 0.5s;
`;

export const HPGuageInner = styled(GuageInner)`
    background: rgb(200, 55, 57);
    background: linear-gradient(
        180deg,
        rgba(200, 55, 57, 1) 0%,
        rgba(168, 40, 41, 1) 30%,
        rgba(168, 40, 41, 1) 75%,
        rgba(200, 55, 57, 1) 100%
    );
`;

export const ENGuageInner = styled(GuageInner)`
    background: rgb(48, 192, 214);
    background: linear-gradient(
        180deg,
        rgba(48, 192, 214, 1) 0%,
        rgba(32, 144, 161, 1) 30%,
        rgba(32, 144, 161, 1) 75%,
        rgba(48, 192, 214, 1) 100%
    );
`;

export const STGuageInner = styled(GuageInner)`
    background: rgb(231, 142, 67);
    background: linear-gradient(
        180deg,
        rgba(231, 142, 67, 1) 0%,
        rgba(185, 106, 40, 1) 30%,
        rgba(185, 106, 40, 1) 75%,
        rgba(231, 142, 67, 1) 100%
    );
`;

export const GuageValue = styled.div`
    position: absolute;
    z-index: 10;
    font-size: 18px;
    left: 30px;
    top: 50%;
    transform: translateY(-50%);

    > span {
        display: inline-block;
        min-width: 38px;
        text-align: center;

        &:last-child {
            color: rgba(255, 255, 255, 0.5);
        }
    }
`;

export const GuageLabel = styled.div`
    position: absolute;
    z-index: 10;
    font-size: 20px;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.4);
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
`;

// PORTRAIT & STATS
export const PortraitBorder = styled(BorderWrapper)`
    position: absolute;
    width: 88px;
    height: 88px;
    border-radius: 100px;
    z-index: 15;
    left: 0;
    top: 15px;
`;

export const Portrait = styled.div`
    background: rgb(51, 60, 68);
    background: radial-gradient(
        circle,
        rgba(51, 60, 68, 1) 0%,
        rgba(33, 47, 57, 1) 100%
    );
    width: 84px;
    height: 84px;
    border-radius: 100px;

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

export const StatPill = styled.div`
    width: 32px;
    height: 32px;
    line-height: 30px;
    text-align: center;
    font-size: 18px;
    border-radius: 50px;
    background: #2d1c27;
    border: 1px solid rgb(131, 85, 39);
    position: absolute;
`;

export const LevelPill = styled(StatPill)`
    bottom: -2px;
    left: -5px;
    font-weight: bold;
`;

export const StatusWrapper = styled.div`
    margin: 8px 0 0 0;
    display: flex;
    justify-content: center;

    > div {
        margin: 0 5px;
        display: flex;
    }
`;

export const StatusIcon = styled.div`
    height: 24px;
    line-height: 24px;
    text-align: center;
    font-size: 18px;
    color: rgba(255, 255, 255, 0.6);
`;

export const StatusValue = styled(StatPill)`
    position: initial;
    height: 24px;
    width: auto;
    line-height: 24px;
    font-size: 18px;
    font-weight: bold;
    margin: 0 10px;
    border: none;
    background: none;

    > span {
        font-weight: normal;
        color: rgba(255, 255, 255, 0.6);
    }
`;
