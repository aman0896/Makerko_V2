import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FileDownload } from './global/GlobalFunction';
import { useHistory } from 'react-router';
import InvalidAction from './invalidAction';
import Button from './global/Button';
import Footer from './main/footer';

function Validation() {
    const [orderInfo, setOrderInfo] = useState();
    const [tableTitle, setTableTitle] = useState([
        'OrderID',
        'CustomerID',
        'Date',
        'OrderType',
        'ModelName',
        'FabricationService',
        'Material',
        'Thickness',
        'Quantity',
        'Download',
        'Validation',
    ]);
    const history = useHistory();

    useEffect(() => {
        axios.get(`${window.host}/validation`).then((response) => {
            if (response.data) {
                const data = response.data.orderSpecification;
                console.log(data);
                setOrderInfo(data);
            }
        });
    }, []);

    const titles = tableTitle.map((title, index) => {
        return (
            <th key={index} scope="col" className="align-middle">
                {title}
            </th>
        );
    });

    const GetOrderType = (orderType) => {
        var stringData = JSON.stringify(orderType);
        var data = stringData.replace(/[\[\\\]"]+/g, '');
        return data;
    };

    if (orderInfo) {
        var data = orderInfo.map((item, index) => {
            return (
                <tr key={index} style={{ fontSize: '12px' }}>
                    <td
                        className="align-middle text-center"
                        style={{ width: '4%' }}
                    >
                        {item.Order_ID}
                    </td>
                    <td
                        className="align-middle text-center"
                        style={{ width: '4%' }}
                    >
                        {item.Customer_ID}
                    </td>
                    <td
                        className="align-middle text-center"
                        style={{ width: '4%' }}
                    >
                        {item.Date}
                    </td>
                    <td
                        className="align-middle text-center"
                        style={{ width: '4%' }}
                    >
                        {GetOrderType(item.Order_Type)}
                    </td>
                    <td
                        className="align-middle text-center"
                        style={{ width: '18%' }}
                    >
                        {item.Model_Name}
                    </td>
                    <td
                        className="align-middle text-center"
                        style={{ width: '18%' }}
                    >
                        {item.Fabrication_Service}
                    </td>
                    <td
                        className="align-middle text-center"
                        style={{ width: '18%' }}
                    >
                        {item.Material}
                    </td>
                    <td
                        style={{ width: '5%' }}
                        className="align-middle text-center"
                    >
                        {item.Thickness}
                    </td>
                    <td
                        style={{ width: '5%' }}
                        className="align-middle text-center"
                    >
                        {item.Quantity}
                    </td>
                    <td
                        style={{ width: '8%' }}
                        className="align-middle text-center"
                    >
                        <Button
                            btnName="Download"
                            styleClass="btn p-1"
                            onClick={() =>
                                FileDownload(item.Model_Path, item.Model_Name)
                            }
                        />
                    </td>
                    <td
                        style={{ width: '23%' }}
                        className="align-middle text-center"
                    >
                        <button
                            style={{
                                width: 80,
                                color: 'white',
                                backgroundColor: '#04B000',
                            }}
                            className="btn btn-sm m-1"
                        >
                            Valid
                        </button>
                        <button
                            style={{
                                width: 80,
                                backgroundColor: '#FF0000',
                                color: 'white',
                            }}
                            className="btn btn-sm m-1"
                            data-toggle="modal"
                            data-target="#invalidmodal"
                            // onClick={() => {
                            //     history.push('/invalid');
                            // }}
                        >
                            Invalid
                        </button>
                    </td>
                </tr>
            );
        });
    }

    return (
        <div className="pt-5 mt-3">
            <div
                className="container-fluid"
                style={{ width: '95%', overflowX: 'auto' }}
            >
                <h2 className="mt-3 mb-4" style={{ color: '#5044fd' }}>
                    File Validation
                </h2>
                <table className="table">
                    <thead
                        className=""
                        style={{
                            backgroundColor: 'black',
                            color: 'white',
                            fontSize: '12px',
                        }}
                    >
                        <tr
                            className="py-5"
                            style={{ fontSize: '12px', height: '70px' }}
                        >
                            {titles}
                        </tr>
                    </thead>
                    <tbody
                        className="justify-content-center"
                        style={{
                            fontSize: '12px',
                            backgroundColor: '#E5E5E5',
                        }}
                    >
                        {data}
                    </tbody>
                </table>
            </div>
            <Footer />
            <InvalidAction />
        </div>
    );
}

export default Validation;
