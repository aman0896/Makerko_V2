import Button from "../Button";

export const slideData = [
    {
        button: <ApplyButton link="https://forms.gle/Y22kLuYi5ZSeZQv98" />,
        image: "./assests/sliderimage/makerko_challenge_banner.png",
        description:
            "Climate and Environment Clean Cooking Stove Innovation Challenge ",
    },
    {
        image: "./assests/sliderimage/Maker_ko_sustanibility_model.png",
    },
];

function ApplyButton({ link }) {
    const onBtnClick = () => {
        window.open(link, "_blank");
    };
    return (
        <span
        // style={{
        //     position: "absolute",
        //     bottom: 0,
        //     transform: `translate(${-300}px, ${5}px)`,
        // }}
        >
            <Button
                buttonSize="button--large"
                buttonStyle="button--primary--outline"
                style={{
                    borderRadius: "50px",
                    fontSize: "2rem",
                    height: "70px",
                    letterSpacing: "5px",
                    textTransform: "uppercase",
                    marginTop: "15px",
                    marginLeft: "15px",
                }}
                onClick={onBtnClick}
            >
                Apply
            </Button>
        </span>
    );
}
