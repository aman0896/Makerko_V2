import axios from 'axios';

export function SetRatings(userID, rating, makerID) {
    axios
        .post(`${window.host}/set-star-rating`, {
            userID: userID,
            rating: rating,
            makerID: makerID,
        })
        .then((response) => {
            console.log(response);
        });
}

export function GetRatings(userID, makerID, getResult) {
    axios
        .post(`${window.host}/get-star-rating`, {
            userID: userID,
            makerID: makerID,
        })
        .then((response) => {
            if (response.data) {
                getResult(null, response.data);
            } else {
                getResult('errgetingrating', null);
            }
        });
}
