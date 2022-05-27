import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { payment } from "../redux/actions";
import { useSelector } from "react-redux";
import Cookies from 'universal-cookie';
const cookies = new Cookies(); 

function CartContent(props) {
    const {cart, user} = props;
    const [total, setTotal] = useState(0);
    const dispatch = useDispatch();
    const message = useSelector(state => state.message);
    let ship = 20000;
    let _total = 0;
    const [result, setResult] = useState('');

    const handleSubmit = (res) => {
        console.log(res);
        dispatch(payment({...res, id: user.id, things: result, cost: total + ship}));
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            address: '',
            phone: ''
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Required!').max(50, 'Your Name is at most 50 characters!'),
            address: Yup.string().required('Required!').max(250, 'Max is 250 characters!'),
            phone: Yup.string()
                .required('Required!')
                .min(9, 'Length of phone number is between 9-11')
                .max(11, 'Length of phone number is between 9-11')
        }),
        onSubmit: (res) => {
            handleSubmit(res);
        }
    })

    useEffect(() => {
        formik.setValues({name: user.name, address: user.address, phone: user.phone})
    }, [user]);

    useEffect(() => {
        if(message === 'Your order is updated!') {
            window.location = '/';
        }
    }, [message])

    useEffect(() => {
        let temp = '';
        cart && cart.forEach(item => {
            _total += item.totalPrice
            temp = temp.concat(item.name + '-' + item.quantity , "; ");
        })
        console.log(temp);
        setResult(temp);
        setTotal(_total);
    }, [cart])

    return (
        <section className="h-100 h-custom" style={{ "backgroundColor": "#eee" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        <div className="card">
                            <div className="card-body p-4">
                                <div className="row">
                                    <div className="col-lg-7">
                                        <h5 className="mb-3"><a href="/" className="text-body"><i
                                            className="fas fa-long-arrow-alt-left me-2"></i>Continue shopping</a></h5>
                                        <hr />

                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <div>
                                                <p className="mb-1">Shopping cart</p>
                                                <p className="mb-0">You have {cart.length} items in your cart</p>
                                            </div>
                                            <div>
                                                <p className="mb-0"><span className="text-muted">Sort by:</span> <a href="#!"
                                                    className="text-body">price <i className="fas fa-angle-down mt-1"></i></a></p>
                                            </div>
                                        </div>

                                        {cart && cart.map(item => {
                                            return (
                                                <div className="card mb-3" key={item.id}>
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-between">
                                                            <div className="d-flex flex-row align-items-center">
                                                                <div>
                                                                    <img src={item.thumbnail} className="img-fluid rounded-3" alt="Shopping item" style={{ "width": "65px" }} />
                                                                </div>
                                                                <div className="ms-3">
                                                                    <h5>{item.name}</h5>
                                                                    <p className="small mb-0">256GB, Navy Blue</p>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex flex-row align-items-center">
                                                                <div style={{ "width": "50px" }}>
                                                                    <h5 className="fw-normal mb-0">{item.quantity}</h5>
                                                                </div>
                                                                <div style={{ "width": "80px" }}>
                                                                    <h5 className="mb-0">{item.totalPrice}</h5>
                                                                </div>
                                                                <a href="#!" style={{ "color": "#cecece" }}><i className="fas fa-trash-alt"></i></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="col-lg-5">

                                        <div className="card bg-primary text-white rounded-3">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-center mb-4">
                                                    <h5 className="mb-0">Detail User</h5>
                                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                                        className="img-fluid rounded-3" style={{ "width": "45px", "alt": "Avatar" }} />
                                                </div>

                                                <p className="small mb-2">Card type</p>
                                                <a href="#!" type="submit" className="text-white"><i
                                                    className="fab fa-cc-mastercard fa-2x me-2"></i></a>
                                                <a href="#!" type="submit" className="text-white"><i
                                                    className="fab fa-cc-visa fa-2x me-2"></i></a>
                                                <a href="#!" type="submit" className="text-white"><i
                                                    className="fab fa-cc-amex fa-2x me-2"></i></a>
                                                <a href="#!" type="submit" className="text-white"><i className="fab fa-cc-paypal fa-2x"></i></a>

                                                <form className="mt-4" onSubmit={formik.handleSubmit}>
                                                    <div className="form-outline form-white mb-4">
                                                        <input type="text" id="typeName" name="name" className="form-control form-control-lg"
                                                            value={formik.values.name ?? ""} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                                                        <label className="form-label" htmlFor="typeName">Full Name</label>
                                                    </div>

                                                    <div className="form-outline form-white mb-4">
                                                        <input type="text" id="typeTextNum" name="address" className="form-control form-control-lg"
                                                            value={formik.values.address ?? ""} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                                                        <label className="form-label" htmlFor="typeText">Address</label>
                                                    </div>

                                                    <div className="row mb-4">
                                                        <div className="col-md-6">
                                                            <div className="form-outline form-white">
                                                                <input type="number" name="age" id="typeExp" className="form-control form-control-lg"
                                                                    defaultValue={user.age} disabled/>
                                                                <label className="form-label" htmlFor="typeExp">Age</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-outline form-white">
                                                                <input type="text" id="typeText" name="phone" className="form-control form-control-lg"
                                                                    value={formik.values.phone ?? ""} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                                                                <label className="form-label" htmlFor="typeText">Phone</label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <hr className="my-4" />

                                                    <div className="d-flex justify-content-between">
                                                        <p className="mb-2">Subtotal</p>
                                                        <p className="mb-2">${total}</p>
                                                    </div>

                                                    <div className="d-flex justify-content-between">
                                                        <p className="mb-2">Shipping</p>
                                                        <p className="mb-2">${ship}</p>
                                                    </div>

                                                    <div className="d-flex justify-content-between mb-4">
                                                        <p className="mb-2">Total</p>
                                                        <p className="mb-2">${total + ship}</p>
                                                    </div>

                                                    <button type="submit" className="btn btn-info btn-block btn-lg">
                                                        <div className="d-flex justify-content-between">
                                                            <span>Payment <i className="fas fa-long-arrow-alt-right ms-2"></i></span>
                                                            <span>${total + ship}</span>
                                                        </div>
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CartContent;