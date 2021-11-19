import "../css/Partners.css";
import Data from "./PartnersData.json";

export default function Partners() {
    return (
        <div className="pb-5 partner-back pt-5">
            <div
                style={{
                    fontSize: "24px",
                    marginBottom: "50px",
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "center",
                    color: "white",
                }}
            >
                Partners and Collaborators
            </div>
            <div className="row m-auto p-4">
                {Data.map((item, index) => (
                    <div
                        key={index}
                        className="col-md ml-1 pl-1 d-flex justify-content-center"
                    >
                        <a href={item.href} target="_blank">
                            <img src={item.src} className="figure" />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
