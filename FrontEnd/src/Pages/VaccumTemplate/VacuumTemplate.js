import React from "react";
import Vaccum from "../../assets/images/Vacuum/Mayku.png";
import Figure1 from "../../assets/images/Vacuum/Figure1.png";
import Figure2 from "../../assets/images/Vacuum/Figure2.png";
import Figure3 from "../../assets/images/Vacuum/Figure3.png";
import Figure4 from "../../assets/images/Vacuum/Figure4.png";
import Figure5 from "../../assets/images/Vacuum/Figure5.png";
import "./VaccumTemplate.css";
const VacuumTemplate = () => {
  return (
    <div className="">
      <div className="row contain">
        <div className="col-lg-6">
          <img src={Vaccum} alt="" className="w-100" />
          <p>
            Source: mayku.me “Manufacture life-saving medical masks at scale
            with the Mayku FormBox “
          </p>
        </div>
        <div className="col-lg-6" style={{ paddingRight: "100px" }}>
          <div className="sub-title pt-5" style={{ fontSize: "20px" }}>
            Vacuum Forming
          </div>
          <p>
            Vacuum forming is a digital manufacturing process which involves
            heating specific sheets of plastic to required forming temperature
            and stretching and pulling them onto the surface of the mold placed
            in the bed using vacuum suction. Forming involves shaping plastic to
            that of the mold. Vacuum forming is the simple type of plastic
            thermoforming that uses vacuum pressure to get the required parts
            mold with desired details and geometry.
          </p>
          <p>
            It uses a portal in the home vacuum machine for creating suction
            under the bed. When the plastic sheet is heated the sheet is pulled
            down stretching over the mold above the bed. The suction starts
            pulling the sheets and forming the desired shape in the sheet.
          </p>
          <p>
            The templates used for vacuum forming are usually 3D printed parts,
            parts made from wood or metal or real life products. The thing to
            consider is that the material packing of these templates needs to be
            tight.
          </p>
        </div>
      </div>
      <div
        style={{
          height: "150px",
          background: "black",
          color: "white",
          fontSize: "20px",
        }}
        className="mb-2 d-flex justify-content-center align-items-center"
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum
      </div>
      <div className="contain">
        <p>Few examples:</p>
        <img src={Figure1} alt="" />
        <div>
          <p>Figure 1: Map of Nepal die made using vacuum form @ Zener Tech</p>
          <p className="sub-title" style={{ fontSize: "20px" }}>
            Different types of sheets are used for different purpose
          </p>
          <p>
            Compatible materials for forming: Thermoplastic Sheets (Clear Sheet,
            Resin Sheets, Form Sheets and Cast Sheets ((PETg 0.5mm))
          </p>
          <p>
            Materials for Casting in the mount: Plaster of Paris, Resin,
            Jesmonite, Concrete, Chocolate, Silicone, Wax.
          </p>
        </div>
        <div>
          <p className="sub-title" style={{ fontSize: "20px" }}>
            Applications
          </p>
          <ul>
            <li>
              Prototyping: Can be used to make large quantity of same design
              products
            </li>
          </ul>
          <img src={Figure2} alt="" />
          <p>Figure 2: Upper cover of drone @ Makyu </p>
          <ul>
            <li>Product packing: For good and Accessories</li>
          </ul>
          <img src={Figure3} alt="" />
          <p>Figure 3: Custom Chocolate Packing molds @Mayku</p>
          <ul>
            <li>Chocolate molding: To make designers chocolate</li>
          </ul>
          <img src={Figure4} alt="" />
          <p>Figure 4: Custom Chocolate molds @ Mayku</p>
        </div>
        <div>
          <p className="sub-title" style={{ fontSize: "20px" }}>
            Tools for vacuum forming
          </p>
          <p>
            Tools in vacuum forming are used to make necessary parts from the
            use of different quality of sheets for different applications.
          </p>
          <p>
            Selection of material used to make tools for use in vacuum forming
            depends on the quality of product finish required and the service
            time of the tool required. Since the vacuum forming process uses
            less pressure compared to other die making processes the tool use
            can be produced economically by using a wide range of materials for
            different kinds of production requirements. For Fairly low
            temperature plastic wood or plaster can be used and for larger
            quantities and higher temperature an aluminum based resin or
            aluminum tools would be used. 3D printed tools can be made for
            complex structure and material for 3D should be selected depending
            on the use time and temperature.
          </p>
          <img src={Figure5} alt="" />
          <p>
            Figure 5: 3D printed tool filled with plaster of Paris for making
            die of Non-Invasive Ventilation mask @ Zener Tech
          </p>
        </div>
        <div>
          <p className="sub-title" style={{ fontSize: "20px" }}>
            About us:
          </p>
          <p>
            he Makerko is a web of production platforms, an online marketplace
            that connects local producers and end-users. End-users will have the
            ability to request the production of a product via the platform.
          </p>
          <p>
            This platform addresses local challenges in Nepal around production,
            including: incorrect designs for manufacturing, obtaining a workable
            prototype, lack of access to design/manufacturing experts and
            marketing and communication gaps.
          </p>
          <p>
            The makerko platform will make the capabilities of local producers
            more visible to consumers, as the producers offer new products and
            innovations. Users will then have the ability to upload a work order
            (with a product design if applicable) and be connected with a local
            producer that will execute the work order.
          </p>
          <p>
            The platform also brings together idle machines, decentralized
            technology tools, global and remote expertise, diverse skill sets,
            and a growing supplier network, making the product development
            process more reliable for consumers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VacuumTemplate;
