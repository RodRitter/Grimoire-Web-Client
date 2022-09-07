import BufferFeed from "../shared/BufferFeed";
import BufferInput from "../shared/BufferInput";
import TestModule from "../shared/TestModule";
import HorizontalVitals from "./modules/Vitals/HorizontalVitals";
import ExperienceBar from "./modules/Vitals/ExperienceBar";
import Map from "./modules/Map";
import InfoPanels from "./modules/InfoPanels";
import MobileControls from "./modules/MobileControls";

const ProceduralRealms = {
    host: "procrealms.ddns.net",
    post: 3000,
    breakpoints: {
        lg: 1200,
        md: 960,
        sm: 100,
    },
    cols: { lg: 20, md: 16, sm: 12 },
    rowHeight: 20,
    margin: [10, 10],
    defaultLayouts: {
        lg: [
            {
                w: 10,
                h: 14,
                x: 5,
                y: 0,
                i: "buffer-feed",
                moved: false,
                static: false,
            },
            {
                w: 10,
                h: 2,
                x: 5,
                y: 14,
                i: "buffer-input",
                moved: false,
                static: false,
            },
        ],
        md: [
            {
                w: 8,
                h: 14,
                x: 4,
                y: 0,
                i: "buffer-feed",
                moved: false,
                static: false,
            },
            {
                w: 8,
                h: 2,
                x: 4,
                y: 14,
                i: "buffer-input",
                moved: false,
                static: false,
            },
        ],
        sm: [
            {
                w: 10,
                h: 6,
                x: 2,
                y: 0,
                i: "buffer-feed",
                moved: false,
                static: true,
            },
            {
                w: 2,
                h: 6,
                x: 0,
                y: 0,
                i: "map-module",
                moved: false,
                static: true,
            },
            {
                w: 12,
                h: 6,
                x: 0,
                y: 6,
                i: "mobile-controls-module",
                moved: false,
                static: true,
            },
        ],
    },
    modules: {
        "buffer-feed": {
            name: "Buffer Feed",
            layout: { i: "buffer-feed", x: 5, y: 0, w: 6, h: 14 },
            component: BufferFeed,
            required: true,
        },
        "buffer-input": {
            name: "Buffer Input",
            layout: {
                i: "buffer-input",
                x: 5,
                y: 12,
                w: 6,
                h: 2,
                maxH: 3,
                minH: 2,
            },
            component: BufferInput,
            required: true,
        },
        "vitals-module": {
            name: "Vitals",
            layout: {
                i: "vitals-module",
                x: 0,
                y: 0,
                w: 4,
                h: 4,
                minW: 4,
                minH: 2,
            },
            component: HorizontalVitals,
        },
        "xp-module": {
            name: "Experience Bar",
            layout: {
                i: "xp-module",
                x: 0,
                y: 0,
                w: 4,
                h: 4,
                minW: 4,
                minH: 2,
            },
            component: ExperienceBar,
        },

        "map-module": {
            name: "Map",
            layout: {
                i: "map-module",
                x: 0,
                y: 0,
                w: 2,
                h: 6,
                minW: 2,
                minH: 6,
            },
            component: Map,
        },
        "info-module": {
            name: "Info Panels",
            layout: {
                i: "info-module",
                x: 0,
                y: 0,
                w: 2,
                h: 8,
                minW: 2,
                minH: 6,
            },
            component: InfoPanels,
        },
        "test-module": {
            name: "Test Module",
            layout: {
                i: "test-module",
                x: 0,
                y: 0,
                w: 2,
                h: 2,
            },
            component: TestModule,
        },
        "mobile-controls-module": {
            name: "Mobile Controls",
            layout: {
                i: "mobile-controls-module",
                x: 0,
                y: 0,
                w: 2,
                h: 2,
            },
            component: MobileControls,
        },
    },
};

export default ProceduralRealms;