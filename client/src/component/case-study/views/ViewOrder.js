import React from "react";
import { useState } from "react";
import Heading from "../utils_component/Heading";
import Nav from "../utils_component/Nav";
import axios from "axios";
import Cookies from 'universal-cookie';
import ReactLoading from "react-loading";
import URL from "../redux/url";
import { useEffect } from "react";
import HeadingDetailUser from "../utils_component/H-Detail-User";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
const cookies = new Cookies(); 

function ViewOrder(props) {
    const param = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    const GetOrder = async () => {
        const username = param.username;
        let _id;
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await axios.get(`${URL.baseURL}/api/users`)
            .then(res => {
                res.data.map((item) => {
                    if(item.username === username) {
                        _id = item.id;
                    }
                })
            })
        return await axios.get(`${URL.baseURL}/api/users/${_id}`);
    }

    useEffect(() => {
        GetOrder()
            .then(res => {
                console.log(res);
                setOrders(res.data.orders);
                setIsLoading(false);
            })
    }, [])

    return (
        <div className="detail-order">
            <Heading />
            <Nav />
            <div className="container">
                <div className="row row-1">
                    <div className="nav flex-column nav-pills col-md-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <Link to={'/admin/products'} className="nav-link active" id="v-pills-home-tab" data-toggle="pill" role="tab" aria-controls="v-pills-home" aria-selected="true">Quản lí sản phẩm</Link>
                        <Link to={'/admin/users'} className="nav-link" id="v-pills-order-tab" data-toggle="pill" role="tab" aria-controls="v-pills-order" aria-selected="false">Quản lí khách hàng</Link>
                        <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Thông báo</a>
                    </div>
                    {!isLoading ? (
                        <div className="col-md-9 info">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Detail</th>
                                        <th>Address</th>
                                        <th>Cost</th>
                                        <th>Phone</th>
                                        <th>Cancel</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.length >= 0 && orders.map(item => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.things}</td>
                                                <td>{item.address}</td>
                                                <td>{item.cost}</td>
                                                <td>{item.phone}</td>
                                                <td><button>Cancel</button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="col-md-9 info">
                            <ReactLoading className="loading" type="bubbles" color="#0000FF" height={100} width={50} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ViewOrder;