import React from "react";
import WrapperComponent from "../Components/WrapperComponent";
import aboutus from "../config/AboutUs.json";
import { useWindowDimensions } from "../functions/Functions";

function AboutUs() {
  const width = useWindowDimensions();
  console.log(width, "width");

  return (
    <WrapperComponent>
      <div className={"d-flex align-items-center"} id="local-production">
        <div className="p-2">
          <h4 className="heading">{aboutus[0].name}</h4>
          <p>
            MAKERKO enables producers and consumers interact locally. Local
            production is at the core of the Makerko principle as its key to
            boosting local economy by engaging people in local making and
            creating more jobs, climate friendly approach to saving thousands of
            Tons of carbon emission otherwise generated during long distance
            complex global supply chain. We believe finding sustainable local
            solutions to community’s pressing challenges through local
            production and innovation. MAKERKO aims to map distributed local
            makers, document their capabilities and provide them a platform to
            build their digital portfolio where potential designers/innovators
            can spot them online and connect to make things locally. “MAKERKO -
            Making Things Locally!”
          </p>
        </div>
        <div className="p-2">
          <img src={aboutus[0].image} alt="" />
        </div>
      </div>
      <div
        className="d-flex align-items-center"
        id="collaborative-manufacturing"
      >
        <div className="p-2">
          <h4 className="heading">{aboutus[1].name}</h4>
          <p>
            MAKERKO enables producers and consumers interact locally. Local
            production is at the core of the Makerko principle as its key to
            boosting local economy by engaging people in local making and
            creating more jobs, climate friendly approach to saving thousands of
            Tons of carbon emission otherwise generated during long distance
            complex global supply chain. We believe finding sustainable local
            solutions to community’s pressing challenges through local
            production and innovation. MAKERKO aims to map distributed local
            makers, document their capabilities and provide them a platform to
            build their digital portfolio where potential designers/innovators
            can spot them online and connect to make things locally. “MAKERKO -
            Making Things Locally!”
          </p>
        </div>
        <div className="p-2">
          <img src={aboutus[1].image} style={{ height: "300px" }} alt="" />
        </div>
      </div>
      <div className="d-flex align-items-center" id="design-support">
        <div className="p-2">
          <h4 className="heading">{aboutus[2].name}</h4>
          <p>
            MAKERKO enables producers and consumers interact locally. Local
            production is at the core of the Makerko principle as its key to
            boosting local economy by engaging people in local making and
            creating more jobs, climate friendly approach to saving thousands of
            Tons of carbon emission otherwise generated during long distance
            complex global supply chain. We believe finding sustainable local
            solutions to community’s pressing challenges through local
            production and innovation. MAKERKO aims to map distributed local
            makers, document their capabilities and provide them a platform to
            build their digital portfolio where potential designers/innovators
            can spot them online and connect to make things locally. “MAKERKO -
            Making Things Locally!”
          </p>
        </div>
        <div className="p-2">
          <img src={aboutus[2].image} alt="" />
        </div>
      </div>
      <div className="d-flex align-items-center" id="design-challanges">
        {" "}
        <div className="p-2">
          <h4 className="heading">{aboutus[3].name}</h4>
          <p>
            MAKERKO enables producers and consumers interact locally. Local
            production is at the core of the Makerko principle as its key to
            boosting local economy by engaging people in local making and
            creating more jobs, climate friendly approach to saving thousands of
            Tons of carbon emission otherwise generated during long distance
            complex global supply chain. We believe finding sustainable local
            solutions to community’s pressing challenges through local
            production and innovation. MAKERKO aims to map distributed local
            makers, document their capabilities and provide them a platform to
            build their digital portfolio where potential designers/innovators
            can spot them online and connect to make things locally. “MAKERKO -
            Making Things Locally!”
          </p>
        </div>
        <div className="p-2">
          <img src={aboutus[3].image} alt="" />
        </div>
      </div>
    </WrapperComponent>
  );
}

export default AboutUs;
