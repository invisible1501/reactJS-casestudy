import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import './Cart.css';
import Cookies from 'universal-cookie';
import Heading from "../utils_component/Heading";
import Nav from "../utils_component/Nav";
import CartContent from "../utils_component/CartContent";
import axios from "axios";
import ReactLoading from "react-loading";
import URL from "../redux/url";
import { useSelector } from "react-redux";
const cookies = new Cookies(); 

function Cart() {
    const [cart, setCart] = useState([]);
    const isLoading = useSelector(state => state.isLoading);
    const [user, setUser] = useState({});

    const loading = async () => {
        await new Promise((resolve) => {setTimeout(resolve, 1000)});
        return await axios.get(`${URL.baseURL}/api/users`);
    }

    useEffect(() => {
        setCart((cookies.get('cart') != null) ? cookies.get('cart') : []);
        loading()
            .then(res => {
                res.data.map(item => {
                    if(item.username === cookies.get('username')) {
                        setUser(item);
                    }
                })
            }) 
    }, [])

    return (
        <div>
            <Heading />
            <Nav />
            {!isLoading ? (
                <CartContent cart={cart} user={user}/>
            ) : (
                <div className="col-md-12 info">
                    <ReactLoading className="loading" type="bubbles" color="#0000FF" height={100} width={50} />
                </div>
            )}
        </div>
    )
}

export default Cart