import React from "react";
import Heading from "../utils_component/Heading";
import Nav from "../utils_component/Nav";
import ReactLoading from "react-loading";
import axios from "axios";
import URL from "../redux/url";
import Cookies from 'universal-cookie';
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import Input from "../utils_component/Input";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../redux/actions";
import { Link } from "react-router-dom";
const cookies = new Cookies();

function AdminUsers(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState({});

    const GetUsers = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return await axios.get(`${URL.baseURL}/api/users`);
    }

    useEffect(() => {
        GetUsers().then((res) => {
            setUsers(JSON.parse(JSON.stringify(res.data)));
            setIsLoading(false);
        })
        /* return () => {

        } */
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
                                        <th>Name</th>
                                        <th>Username</th>
                                        <th>Address</th>
                                        <th>Age</th>
                                        <th>Phone</th>
                                        <th>Order</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length >= 0 && users.map(item => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.username}</td>
                                                <td>{item.address}</td>
                                                <td>{item.age}</td>
                                                <td>{item.phone}</td>
                                                <td><Link to={`/admin/${item.username}/orders`}><button>Click here for detail</button></Link></td>
                                                <td><button>Delete</button></td>
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

export default AdminUsers;