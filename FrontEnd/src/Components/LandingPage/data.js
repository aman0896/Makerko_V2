import Button from "../Button";
import {
    DesktopMediaQuery,
    MobileMediaQuery,
    TabletMediaQuery,
} from "../ReactResponsize";

export const slideData = [
    {
        button: <ApplyButton link="https://forms.gle/Y22kLuYi5ZSeZQv98" />,
        image: "./assests/sliderimage/makerko_challenge_banner.png",
        description:
            "Climate and Environment Clean Cooking Stove Innovation Challenge ",
    },
    // {
    //     image: "./assests/sliderimage/Maker_ko_sustanibility_model.png",
    // },
];

function ApplyButton({ link }) {
    const isDesktop = DesktopMediaQuery();
    const isTablet = TabletMediaQuery();
    const isMobile = MobileMediaQuery();

    const onBtnClick = () => {
        window.open(link, "_blank");
    };
    return (
        <span>
            <Button
                buttonSize={
                    isMobile
                        ? "button--small"
                        : isTablet
                        ? "button--medium"
                        : "button--large"
                }
                buttonStyle="button--primary--outline"
                style={{
                    borderRadius: "50px",
                    fontSize: isMobile ? "14px" : isTablet ? "1.5rem" : "2rem",
                    height: isMobile ? "40px" : isTablet ? "50px" : "70px",
                    letterSpacing: "5px",
                    textTransform: "uppercase",
                }}
                onClick={onBtnClick}
            >
                Apply
            </Button>
        </span>
    );
}
