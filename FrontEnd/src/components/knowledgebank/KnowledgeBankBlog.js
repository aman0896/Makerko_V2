import Footer from '../main/footer';
import { TableBlog } from './TableBlog';
import './KnowledgeBankBlog.css';

function KnowledgeBankBlog() {
    return (
        <div className="mt-4">
            <div className="row m-auto d-flex justify-content-center align-items-center">
                <div className="col-lg my-auto offset-1  mr-4">
                    <div className="blogtitle mb-5 mt-2">3D PRINTING</div>
                    <p style={{ fontSize: '16px' }}>
                        {' '}
                        3D Printing, also termed as an additive manufacturing is
                        the process of making physical objects/products through
                        layer wise addition of melted material directly from the
                        computer aided 3D designs.
                    </p>
                </div>
                <div className="col-lg m-0 p-0">
                    <img
                        src="/KnowledgeBank/3D Printing.jpg"
                        style={{ height: '450px', width: '100%' }}
                    />
                </div>
            </div>
            <div className="blogfooter pl-3 d-flex justify-content-center align-items-center flex-column">
                “I believe in the near future we will 3D print our buildings and
                houses.”
                <div style={{ fontWeight: 'normal' }}>
                    Neri Oxman, Professor – MIT Media Lab
                </div>
            </div>

            <div className="row mt-5 mx-auto pt-5 d-flex justify-content-center">
                <div className="col-lg offset-1">
                    <img
                        src="/KnowledgeBank/3dprinting.jpg"
                        style={{ height: '450px', width: '100%' }}
                    />
                </div>
                <div className="col-lg align-top">
                    <div
                        className="blogtitle mb-3"
                        style={{ fontSize: '20px' }}
                    >
                        3D PRINTING
                    </div>
                    <p style={{ fontSize: '16px' }}>
                        There is no necessity of investing in additional tools
                        or die/mold in the 3D printing manufacturing process. A
                        desired product is first modelled in a 3D CAD software,
                        exported in acceptable file formats (usually .obj, .stl)
                        and sent to a 3D printing slicer software which converts
                        design into machine supported codes and a 3D printer
                        makes the product in real physical form. Most popular 3D
                        printing technologies are the FDM 3D printers
                        (Plastic/rubber filament as raw material), SLA/DLP 3D
                        printers (liquid resins as raw material and laser/light
                        source for binding layers) and SLS 3D Printer
                        technologies (polymer or metal power as raw material and
                        laser source)
                    </p>
                </div>
            </div>
            <div
                className="row mt-2 mx-auto pt-4 pb-5 d-flex justify-content-center align-items-center"
                style={{
                    backgroundColor: '#5044FD',
                    height: 'auto',
                    color: 'rgba(255, 255, 255, 0.788)',
                }}
            >
                <div className="col-lg my-auto offset-1 mr-5 pl-5 pb-3">
                    <div style={{ fontWeight: 'bold', fontSize: '22px' }}>
                        About the Technology
                    </div>
                    <div className="pt-3">
                        Here are the capabilities of different 3D printing
                        technologies:
                    </div>
                    <TableBlog />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default KnowledgeBankBlog;
