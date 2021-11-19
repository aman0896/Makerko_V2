import React, { Component, useEffect, useState } from 'react';
import Ratings from 'react-ratings-declarative';
import './StarRating.css';
import RatingProgressView from './RatingProgressView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDivide, faUser } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useParams } from 'react-router';
import { GetCookiesInfo } from '../global/GlobalFunction';
import { GetRatings, SetRatings } from './RestApi';

var ratings = [];
export default function StarRating({
    widgetDimensions,
    widgetSpacing,
    setAverageRating,
    setTotalRatings,
    overallRatingArray,
}) {
    const [myRating, setMyRating] = useState(0);
    const [isAuth, setIsAuth] = useState();
    const [currentUser, setCurretnUser] = useState();
    const [userType, setUserType] = useState();
    const [totalReviews, SetTotalReviews] = useState();
    // const [averageRating, setAverageRating] = useState();
    // const [totalFeedback, setTotalFeedback] = useState();
    // var [arr, setArr] = useState([0, 0, 0, 0, 0]);
    const history = useHistory();
    const params = useParams();
    const makerID = params.id;

    useEffect(async () => {
        const data = await GetCookiesInfo().then((response) => {
            console.log(response);
            if (response.data) {
                return response;
            } else {
                console.log(response.ServerMsg);
                return response;
            }
        });
        if (data.data != null) {
            const { uid, loggedIn, userStatus } = data.data;
            if (uid && loggedIn && userStatus) {
                setIsAuth(loggedIn);
                setCurretnUser(uid);
                setUserType(userStatus);
            }
        }
    }, []);

    useEffect(() => {
        GetRatings(currentUser, makerID, (err, result) => {
            if (err) {
                return console.log(err);
            }
            const { averageRating, myRating, totalReviews } = result;
            setAverageRating(averageRating);
            setTotalRatings(totalReviews);
            SetTotalReviews(totalReviews);
            setMyRating(myRating);
            console.log(result);
        });
    }, [currentUser]);

    const ChangeRating = (newRating) => {
        if (isAuth) {
            //ratings.push(newRating);
            setMyRating(newRating);
            SetRatings(currentUser, newRating, makerID);
            //var totalRating = totalReviews;
            // setAverageRating(
            //     ratings.reduce((a, v) => (a = a + v), 0) / totalRating
            // ); // a is new value, v is the value of array
            //if (!myRating) setTotalRatings(totalRating + 1);
            //overallRatingArray(ratings);
            //console.log(newRating);
        } else {
            history.push({ pathname: '/login' });
        }
    };
    const svgIconPath =
        'M40 14.48L25.62 13.24L20 0L14.38 13.26L0 14.48L10.92 23.94L7.64 38L20 30.54L32.36 38L29.1 23.94L40 14.48ZM20 26.8L12.48 31.34L14.48 22.78L7.84 17.02L16.6 16.26L20 8.2L23.42 16.28L32.18 17.04L25.54 22.8L27.54 31.36L20 26.8Z';
    const svgIconViewBox = '0 0 40 38';
    return (
        <>
            <div>
                <Ratings
                    rating={myRating}
                    // widgetRatedColors="black"
                    widgetDimensions={widgetDimensions}
                    widgetSpacings={widgetSpacing}
                    changeRating={ChangeRating}
                    widgetRatedColors="black"
                    widgetEmptyColor="green"
                >
                    <Ratings.Widget
                        widgetHoverColor="black"
                    />
                    <Ratings.Widget widgetHoverColor="black" />
                    <Ratings.Widget widgetHoverColor="black" />
                    <Ratings.Widget widgetHoverColor="black" />
                    <Ratings.Widget widgetHoverColor="black" />
                </Ratings>
            </div>
        </>
    );
}

export function StarRatingAverage({ averageRating, widgetDimensions }) {
    return (
        <div>
            <Ratings
                rating={averageRating}
                widgetRatedColors="black"
                widgetDimensions={widgetDimensions}
                widgetSpacings="4px"
            >
                <Ratings.Widget widgetHoverColor="black" />
                <Ratings.Widget widgetHoverColor="black" />
                <Ratings.Widget widgetHoverColor="black" />
                <Ratings.Widget widgetHoverColor="black" />
                <Ratings.Widget widgetHoverColor="black" />
            </Ratings>
        </div>
    );
}

export function AverageRatingNum({ averageRating }) {
    const averageRatingRoundOff = (
        Math.round(averageRating * 100) / 100
    ).toFixed(1);
    return <div>{averageRatingRoundOff}</div>;
}

export function TotalRatings({ totalRatings }) {
    const CommaSeperate = (x) => {
        if (x) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    return (
        <div>
            <FontAwesomeIcon className="mr-1" icon={faUser} size="sm" />
            {CommaSeperate(totalRatings)} total
        </div>
    );
}

export function OverallRatings({ overallRatingArray, totalRatings }) {
    var arr = [0, 0, 0, 0, 0];

    if (overallRatingArray) {
        for (let i = 0; i < overallRatingArray.length; i++) {
            arr[overallRatingArray[i] - 1] += 1;
        }
    }
    arr = arr.reverse();
    return (
        <div>
            {arr.map((item, index) => (
                <div
                    className="row m-1 d-flex align-items-center justify-content-end"
                    key={index}
                >
                    <div
                        className="col-1 mr-1 p-0"
                        style={{
                            textAlign: 'end',
                            fontWeight: 'bold',
                        }}
                    >
                        {arr.length - index}
                    </div>
                    <div className="col p-0">
                        <RatingProgressView
                            completed={(item / totalRatings) * 100}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
