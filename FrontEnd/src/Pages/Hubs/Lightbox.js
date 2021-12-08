import React, { useState } from "react";
import ReactDOM from "react-dom";
// import Lightbox from "react-image-lightbox-rotate";
// import Lightbox from "rhino-react-image-lightbox-rotate";
// import Lightbox from "react-image-lightbox-rotate-fixed";
import Lightbox from "react-image-lightbox";

import "react-image-lightbox/style.css";

const images = [
    "//placekitten.com/1500/500",
    "//placekitten.com/4000/3000",
    "//placekitten.com/800/1200",
    "//placekitten.com/1500/1500",
    "https://images3.alphacoders.com/853/thumb-1920-85305.jpg",
];

const LightboxExample = () => {
    const [imageView, setImageView] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    return (
        <div>
            <button type="button" onClick={() => setImageView(true)}>
                Open Lightbox
            </button>

            {imageView && (
                <Lightbox
                    mainSrc={images[photoIndex]}
                    nextSrc={images[(photoIndex + 1) % images.length]}
                    prevSrc={
                        images[(photoIndex + images.length - 1) % images.length]
                    }
                    onCloseRequest={() => setImageView(false)}
                    onMovePrevRequest={() =>
                        setPhotoIndex(
                            (photoIndex + images.length - 1) % images.length
                        )
                    }
                    onMoveNextRequest={() =>
                        setPhotoIndex((photoIndex + 1) % images.length)
                    }
                />
            )}
        </div>
    );
};

// class LightboxExample extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             photoIndex: 0,
//             isOpen: false,
//         };
//     }

//     render() {
//         const { photoIndex, isOpen } = this.state;

//         return (
//             <div>
//                 <button
//                     type="button"
//                     onClick={() => this.setState({ isOpen: true })}
//                 >
//                     Open Lightbox
//                 </button>

//                 {isOpen && (
//                     <Lightbox
//                         mainSrc={images[photoIndex]}
//                         nextSrc={images[(photoIndex + 1) % images.length]}
//                         prevSrc={
//                             images[
//                                 (photoIndex + images.length - 1) % images.length
//                             ]
//                         }
//                         onCloseRequest={() => this.setState({ isOpen: false })}
//                         onMovePrevRequest={() =>
//                             this.setState({
//                                 photoIndex:
//                                     (photoIndex + images.length - 1) %
//                                     images.length,
//                             })
//                         }
//                         onMoveNextRequest={() =>
//                             this.setState({
//                                 photoIndex: (photoIndex + 1) % images.length,
//                             })
//                         }
//                     />
//                 )}
//             </div>
//         );
//     }
// }

function LightBox() {
    return (
        <div className="App">
            <LightboxExample />
        </div>
    );
}

export default LightboxExample;
