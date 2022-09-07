import React, { useEffect, useState } from "react";
import styled from "styled-components";
import withModule from "../../../shared/withModule";
import colors from "../colors";

// const BorderWrapper = styled.div`
//     background: rgb(131, 85, 39);
//     background: linear-gradient(
//         90deg,
//         rgba(131, 85, 39, 1) 0%,
//         rgba(179, 138, 62, 1) 100%
//     );
//     position: absolute;
//     top: 0;
//     bottom: 0;
//     left: 0;
//     right: 0;
// `;

const MapWrapper = styled.pre`
    margin: 0;
    background: #191a1c;
    letter-spacing: 6px;
    font-size: 24px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;
const MapLine = styled.span``;

const NoDataText = styled.div`
    font-family: "Inconsolata", monospace;
    text-align: center;
    margin: 15px 0;
    padding: 10px;
`;

export const MapModule = ({ socket }) => {
    const [ansiiMap, setAnsiiMap] = useState();
    const [htmlMap, setHtmlMap] = useState();

    useEffect(() => {
        socket.on("gmcp", (data) => {
            console.log(data);
            if (data.key === "Char.State") {
                const _data = data.data;
                if (_data && _data.update && _data.update.map) {
                    const _map = _data.update.map;
                    setAnsiiMap(_map);
                }
            }
        });
    }, []);

    useEffect(() => {
        if (Array.isArray(ansiiMap)) {
            const html = ansiiMap.map((row, index) => {
                const pattern = /{{(?<color>\w)(?<content>[^{]+)/gi;

                let _html = "<span>";
                for (const match of row.matchAll(pattern)) {
                    const color = match.groups.color;
                    const content = match.groups.content;

                    _html += `<span style="color:${
                        colors[color] || "#fff"
                    };">${content}</span>`;

                    // _html += `<span color="${colors[color]}">${content}</span>`;
                }
                _html += "</span><br />";

                return _html;
            });

            setHtmlMap(html);
        }
    }, [ansiiMap]);

    return (
        <>
            {Array.isArray(htmlMap) ? (
                <MapWrapper>
                    {htmlMap.map((row, index) => {
                        return (
                            <MapLine
                                key={index}
                                dangerouslySetInnerHTML={{ __html: row }}
                            />
                        );
                    })}
                </MapWrapper>
            ) : (
                <NoDataText>Waiting for map data..</NoDataText>
            )}
        </>
    );
};

const Map = withModule(MapModule, "Map");

export default Map;
