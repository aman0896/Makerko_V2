function CurrentPosition() {
    console.log("inside current position function");
    if (!navigator.geolocation) {
        let res = {
            status: false,
            msg: "Geolocation is not supported by your browser",
            position: null,
        };
        return res;
    } else {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let res = {
                    status: true,
                    msg: "Location Successfully Retrieved",
                    position: position.coords,
                };
                return res;
            },
            () => {
                let res = {
                    status: false,
                    msg: "Unable to retrieve your location. Please Check if you have allowed the location permission or not. If it still didn`t work please call the service provider",
                    position: null,
                };
                return res;
            }
        );
    }
}

const SearchLocation = ({ searchText }) => {
    fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=10&q=${searchText}`
    )
        .then((res) => res.json())
        .then((data) => {
            console.log(data, "search data");
            return data;
        });
};

export { CurrentPosition, SearchLocation };
