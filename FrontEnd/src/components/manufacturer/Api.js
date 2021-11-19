import axios from "axios";
import { useEffect, useState } from "react";
import { GetCookiesInfo } from "../global/GlobalFunction";

export const UpdateDetails = (
    userID,
    otherServices,
    documentPath,
    coverImage,
    logoPath,
    slogan,
    multipleImage,
    deletedImage,
    setDeletedImage,
    sendResponse
) => {
    console.log("hi", multipleImage);
    console.log(deletedImage, "deleteImage");
    if (otherServices) {
        var otherServicesData = JSON.stringify(otherServices);
    }

    axios
        .post(`${window.host}/maker-additional-details`, {
            uid: userID,
            documentFile: JSON.stringify(documentPath),
            otherServices: otherServicesData,
            coverImage: JSON.stringify(coverImage),
            logo: JSON.stringify(logoPath),
            slogan: slogan,
            multipleImage: multipleImage,
        })
        .then((response) => {
            console.log(response.data, "data");
            if (response.data) {
                const { dataUpdate } = response.data;

                axios
                    .post(`${window.host}/deleteMultiple`, {
                        filePath: deletedImage,
                    })
                    .then((response) => {
                        if (response.data) {
                            const { msg, removed } = response.data;
                            console.log(msg, removed, "daa...");
                            setDeletedImage([...deletedImage, []]);
                            //window.location.reload();
                        }
                    });
                if (dataUpdate) sendResponse(dataUpdate);
            }
        });
};

export const UpdateLocation = (userID, location, sendResponse) => {
    const { lat, lng } = location;

    axios
        .post(`${window.host}/update-location`, {
            uid: userID,
            latitude: lat,
            longitude: lng,
        })
        .then((response) => {
            if (response.data.locationUpdate) {
                const { locationUpdate } = response.data;
                sendResponse(locationUpdate);
            }
        });
};

// export const GetLocation = (uid, sendResponse) => {
//     axios
//         .get(`${window.host}/get-location`, {
//             makerID: uid,
//         })
//         .then((response) => {
//             if (response.data != {}) {
//                 const { Latitude, Longitude } = response.data.location;
//                 sendResponse(null, { Latitude, Longitude });
//             }
//         });
// };
