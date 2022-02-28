import { useMediaQuery } from "react-responsive";

const DesktopMediaQuery = () => useMediaQuery({ query: "(min-width: 1280px)" });
const TabletMediaQuery = () => useMediaQuery({ query: "(max-width: 1050px)" });
const MobileMediaQuery = () => useMediaQuery({ query: "(max-width: 550px)" });

export { DesktopMediaQuery, TabletMediaQuery, MobileMediaQuery };
