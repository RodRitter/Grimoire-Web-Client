import React from "react";
import styled from "styled-components";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridLayoutWrapper = styled.div`
    .react-grid-item.react-grid-placeholder {
        background: rgba(255, 255, 255, 0.5);
    }
`;

const ResizeHandle = styled.div`
    position: absolute;
    width: 10px;
    height: 10px;
    right: 5px;
    bottom: 5px;
    z-index: 22;
    border-right: 2px solid #fff;
    border-bottom: 2px solid #fff;
    cursor: se-resize;
`;

const GridLayout = ({
    layouts,
    breakpoints,
    cols,
    rowHeight,
    margin,
    onLayoutChange,
    onBreakpointChange,
    editMode,
    children,
    onDragStart,
}) => {
    return (
        <GridLayoutWrapper>
            <ResponsiveGridLayout
                className="layout"
                layouts={layouts}
                breakpoints={breakpoints}
                cols={cols}
                rowHeight={rowHeight}
                margin={margin}
                onLayoutChange={onLayoutChange}
                onBreakpointChange={onBreakpointChange}
                containerPadding={[0, 0]}
                draggableHandle=".module-handle"
                resizeHandles={editMode ? ["se"] : []}
                resizeHandle={editMode ? <ResizeHandle /> : null}
                compactType={null}
                preventCollision={true}
            >
                {children}
            </ResponsiveGridLayout>
        </GridLayoutWrapper>
    );
};

const GridLayoutChildWrapper = styled.div`
    position: relative;
`;

const GridLayoutChild = React.forwardRef((props, ref) => (
    <GridLayoutChildWrapper {...props} ref={ref}>
        {props.children}
    </GridLayoutChildWrapper>
));
GridLayoutChild.displayName = "GridLayoutChild";

export { GridLayout, GridLayoutChild };
