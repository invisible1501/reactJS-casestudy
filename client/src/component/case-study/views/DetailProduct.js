import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import './DetailProduct.css';
import URL from "../redux/url";
import ReactLoading from "react-loading";
import Heading from "../utils_component/Heading";
import Nav from "../utils_component/Nav";
import Cookies from 'universal-cookie';
import DetailProductContent from "../utils_component/Detail-product-content";
const cookies = new Cookies(); 

function DetailProduct() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState({});
    const [num, setNum] = useState(1);

    const GetDetail = async () => {
        await new Promise((resolve) => { setTimeout(resolve, 800) });
        return await axios.get(`${URL.baseURL}/detail/goods/${id}`);
    }

    const handleChange = (evt, type) => {
        if(type === 'minus') setNum(num - 1);
        else if(type === 'plus') setNum(num + 1);
    }

    const handleAddCart = () => {
        let oldItems = (cookies.get('cart') != null) ? cookies.get('cart') : [];
        console.log(oldItems);
        const duplicate = oldItems.find(item => item.id === product.id);
        console.log(duplicate);
        if(duplicate == null) {
            let newItem = {
                id: product.id,
                thumbnail: product.thumbnail,
                name: product.name,
                price: product.price,
                quantity: num,
                totalPrice: product.price * num
            }
            oldItems.push(newItem);
        } else {
            oldItems && oldItems.map((item, index) => {
                if(item.id === product.id) {
                    oldItems[index].quantity += num;
                    oldItems[index].totalPrice = oldItems[index].quantity * oldItems[index].price;
                }
            })
        }
        let d = new Date();
        d.setTime(d.getTime() + (720*60*1000));
        console.log(oldItems);
        cookies.set('cart', oldItems, {path: "/", expires: d});
        setNum(1);
    }

    useEffect(() => {
        GetDetail().then(res => {
            setProduct(res.data);
            setIsLoading(false);
        })
    }, [])

    return (
        <div>
            <Heading />
            <Nav />
            {!isLoading ? (
                <DetailProductContent 
                    handleAddCart={handleAddCart}
                    handleChange={handleChange}
                    num={num}
                    product={product}
                />) : (
                <div className="col-md-12 info">
                    <ReactLoading className="loading" type="bubbles" color="#0000FF" height={100} width={50} />
                </div>
            )}
        </div>
    )
}

export default DetailProduct;