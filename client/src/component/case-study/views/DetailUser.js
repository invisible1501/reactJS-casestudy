import React from "react";
import Heading from "../utils_component/Heading";
import Nav from "../utils_component/Nav";
import ReactLoading from "react-loading";
import axios from "axios";
import URL from "../redux/url";
import Cookies from 'universal-cookie';
import { useState } from "react";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import Input from "../utils_component/Input";
import { useDispatch } from "react-redux";
import { changeProfile } from "../redux/actions";
import { useSelector } from "react-redux";
import HeadingDetailUser from "../utils_component/H-Detail-User";
const cookies = new Cookies();

function DetailUser(props) {
    const message = useSelector(state => state.message);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [info, setInfo] = useState([]);
    const [user, setUser] = useState({});
    const [isChangeProfile, setIsChangeProfile] = useState(false);

    const handleSubmit = (res) => {
        dispatch(changeProfile(res));
        setIsLoading(true);
    }

    useEffect(() => {
        if(message === 'Your profile is updated!' || message === 'Your username is invalid!') {
            if(message === 'Your username is invalid!') window.location.reload();
            setIsLoading(false);
            setIsChangeProfile(false);
        }
    }, [message])

    const handleChange= (evt) => {
        setIsChangeProfile(!isChangeProfile);
    }

    const GetUser = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        return await axios.get(`${URL.baseURL}/api/users`);
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            username: '',
            password: '',
            address: '',
            id: '',
            age: '',
            phone: ''
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Required!').max(50, 'Your Name is at most 50 characters!'),
            username: Yup.string().required('Required!').max(20, 'Username is at most 15 characters!'),
            password: Yup.string()
                .required('Required!')
                .min(8, 'Password is at least 8 characters!')
                .max(40, 'Password is at most 40 characters!'),
            address: Yup.string().required('Required!'),
            age: Yup.string(),
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
        GetUser().then((res) => {
            console.log(res);
            setInfo(JSON.parse(JSON.stringify(res.data)));
            setIsLoading(false);
        })
        /* return () => {

        } */
    }, [])

    useEffect(() => {
        info.find(item => {
            const username = cookies.get('username');
            if(item.username === username) {
                setUser(item);
                console.log(item);
                formik.setValues(item);
            }
        });
    }, [info]);

    const handleLogOut = () => {
        cookies.remove('username');
        cookies.remove('password');
        cookies.remove('cart');
        window.location = '/';
    }

    return (
        <div className="wrapper-detail">
            <Heading />
            <Nav />
            <div className="container">
                <div className="row row-1">
                    <HeadingDetailUser handleChange={handleChange}/>
                    {!isLoading ? (
                        <div className="col-md-9 info">
                                <h4>Hồ sơ của tôi</h4>
                                <button onClick={handleLogOut}>Log out</button>
                                <hr/>
                                {(JSON.parse(JSON.stringify(user)) !== {}) ? (
                                <form onSubmit={formik.handleSubmit}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Tên đăng nhập</th>
                                                <td>
                                                    <Input 
                                                        type='text'
                                                        name='username'
                                                        value={formik.values.username}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        disable={!isChangeProfile}
                                                    />
                                                </td>
                                                <td>
                                                    {formik.touched.username && formik.errors.username ? (
                                                        <p>{formik.errors.username}</p>
                                                    ) : (
                                                        <p></p>
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Mật khẩu</th>
                                                <td>
                                                    <Input 
                                                        type='text'
                                                        name='password'
                                                        value={formik.values.password}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        disable={!isChangeProfile}
                                                    />    
                                                </td>
                                                <td>
                                                    {formik.touched.password && formik.errors.password ? (
                                                        <p>{formik.errors.password}</p>
                                                    ) : (
                                                        <p></p>
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>ID</th>
                                                <td>
                                                    <Input 
                                                        type='text'
                                                        name='id'
                                                        value={formik.values.id}
                                                        disable={true}
                                                    />
                                                </td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <th>Tên</th>
                                                <td>
                                                    <Input 
                                                        type='text'
                                                        name='name'
                                                        value={formik.values.name}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        disable={!isChangeProfile}
                                                    />
                                                </td>
                                                <td>
                                                    {formik.touched.name && formik.errors.name ? (
                                                        <p>{formik.errors.name}</p>
                                                    ) : (
                                                        <p></p>
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Địa chỉ</th>
                                                <td>
                                                    <Input 
                                                        type='text'
                                                        name='address'
                                                        value={formik.values.address}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        disable={!isChangeProfile}
                                                    />
                                                </td>
                                                <td>
                                                    {formik.touched.address && formik.errors.address ? (
                                                        <p>{formik.errors.address}</p>
                                                    ) : (
                                                        <p></p>
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Tuổi</th>
                                                <td>
                                                    <Input 
                                                        type='text'
                                                        name='age'
                                                        value={formik.values.age}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        disable={!isChangeProfile}
                                                    />
                                                </td>
                                                <td>
                                                    {formik.touched.age && formik.errors.age ? (
                                                        <p>{formik.errors.age}</p>
                                                    ) : (
                                                        <p></p>
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Số điện thoại</th>
                                                <td>
                                                    <Input 
                                                        type='text'
                                                        name='phone'
                                                        value={formik.values.phone}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        disable={!isChangeProfile}
                                                    />
                                                </td>
                                                <td>
                                                    {formik.touched.phone && formik.errors.phone ? (
                                                        <p>{formik.errors.phone}</p>
                                                    ) : (
                                                        <p></p>
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th colSpan='2'>
                                                    <Input 
                                                        type='submit'
                                                        value='Lưu'
                                                    />
                                                </th>
                                                <td></td>
                                            </tr>
                                        </thead>
                                    </table>
                                </form>) : (
                                    <div>Invalid User</div>
                                )}
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

export default DetailUser;