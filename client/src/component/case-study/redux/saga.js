import { put, takeLatest } from "redux-saga/effects";
import { LOGIN, LOGIN_SUCCESS, SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAIL, LOGIN_FAIL, VIEW_HOMEPAGE, LOADING, VIEW_HOMEPAGE_SUCCESS, VIEW_HOMEPAGE_FAIL, CHANGE_PROFILE, CHANGE_PROFILE_SUCCESS, CHANGE_PROFILE_FAIL, PAYMENT, PAYMENT_SUCCESS } from "./actions";
import axios from 'axios';
import URL from "./url";
import { v4 as uuidv4 } from 'uuid';

function validateRouter(payload) {
    console.log(payload);
    const {name, username, password, address, age, phone, isSignUp, id} = payload;

    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
    };

    let body = {};

    if(id != null) {
        body = {
            'id': parseFloat(id),
            'name': name,
            'username': username,
            'password': password,
            'address': address,
            'age': parseFloat(age) || 0,
            'phone': phone,
        }

        return new Promise((resolve, reject) => {
            setTimeout(() => {        
                axios.put(`${URL.baseURL}/api/users`, body, config)
                    .then((res) => resolve(res))
                    .catch((err) => reject(err));
            }, 1500);
        })
    } else if(isSignUp === true) {
        body = {
            'name': name,
            'username': username,
            'password': password,
            'address': address,
            'age': parseFloat(age) || 0,
            'phone': phone,
            'orders': []
        }

        return new Promise((resolve, reject) => {
            setTimeout(() => {        
                axios.post(`${URL.baseURL}/api/users`, body, config)
                    .then((res) => resolve(res))
                    .catch((err) => reject(err));
            }, 1500);
        })
    } else if(isSignUp === false) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {        
                axios.get(`${URL.baseURL}/api/users`)
                    .then((res) => resolve(res))
                    .catch((err) => reject(err));
            }, 1500);
        })
    }
};

function payment(payload) {
    console.log(payload);
    const {name, address, phone, id, things, cost} = payload;

    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
    };

    const body = {
        'id': id,
        'oid': uuidv4(),
        'name': name,
        'things': things,
        'cost': cost,
        'address': address,
        'phone': phone,
    }

    return new Promise((resolve, reject) => {
        setTimeout(() => {        
            axios.post(`${URL.baseURL}/api/users/${id}`, body, config)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        }, 1500);
    })
}

function* handleSignUp({payload}) {
    let temp = {};
    yield put({type: LOADING, payload: true});
    yield validateRouter(payload)
        .then((res) => {
            temp = {...res};
            console.log(`${res.status} ${res.statusText}`);
            console.log(res.data);
            //put({type: SIGN_UP_SUCCESS, payload: {message: res.data.msg, isLoading: false, account: {username: payload.username, password: payload.password}, isSignUp: true}});
        })
        .catch((err) => {
            temp = {...err.response}
            console.log(err.response.data);
            //put({type: SIGN_UP_FAIL, payload: {message: err.response.data.msg, isLoading: false}})
        });
    if(temp.status == 200) yield put({type: SIGN_UP_SUCCESS, payload: {message: temp.data.msg, isLoading: false, account: {username: payload.username, password: payload.password}, isSignUp: true}}); 
    else if(temp.status == 400) yield put({type: SIGN_UP_FAIL, payload: {message: temp.data.msg, isLoading: false}});
};

function* handleLogin({payload}) {
    let temp = {};
    console.log(payload);
    yield put({type: LOADING, payload: true});
    yield validateRouter(payload)
        .then((res) => {
            temp = {...res};
            console.log(`${res.status} ${res.statusText}`);
            console.log(res.data);
        })
        /* .catch((err) => {
            temp = {...err.response};
            console.log(err.response.data)
            //put({type: LOGIN_FAIL, payload: {message: err.response.data.msg, isLoading: false}})
        }); */
    const duplicate = temp.data.find(item => item.username === payload.username && item.password === payload.password);
    if(duplicate != null) yield put({type: LOGIN_SUCCESS, payload: {message: `Successfully Login for ${payload.username}!`, isLoading: false, account: {username: payload.username, password: payload.password}, isSignUp: true}});
    else yield put({type: LOGIN_FAIL, payload: {message: `Username or Password is invalid`, isLoading: false}});
    /* yield () => {
        temp.data.map((item) => {
            if(item.username === payload.username && item.password === payload.password) {
                put({type: LOGIN_SUCCESS, payload: {message: `Successfully Login for ${payload.username}!`, isLoading: false, account: {username: payload.username, password: payload.password}, isSignUp: true}});
            }
        })
        put({type: LOGIN_FAIL, payload: {message: `Username or Password is invalid`, isLoading: false}});
    } */
};

function loading() {
    return new Promise((resovle, reject) => {
        setTimeout(() => {
            axios.get(`${URL.baseURL}/api/goods`)
                .then(res => resovle(res))
                .catch(err => reject(err))
        }, 1500);
    });
}

function *handleViewHomePage() {
    let temp = {};
    yield loading()
        .then(res => {
            temp = {...res};
            console.log(`${res.status} ${res.statusText}`);
            console.log(res.data);
        })
        .catch(err => {
            temp = {...err};
            console.log(temp.response);
            console.log(err.response.data)
        })
    if(temp.status == 200) yield put({type: VIEW_HOMEPAGE_SUCCESS, payload: {goods: temp.data, isLoading: false}});
    else if(temp.response.status == 400) yield put({type: VIEW_HOMEPAGE_FAIL, payload: {message: temp.response.msg, isLoading: false}});
}

function *handleChangeProfile({payload}) {
    let temp = {};
    yield put({type: LOADING, payload: true});
    yield validateRouter(payload)
        .then(res => {
            temp = {...res};
            console.log(`${res.status} ${res.statusText}`);
            console.log(res.data);
            //put({type: CHANGE_PROFILE_SUCCESS, payload: {message: res.data.msg, isLoading: false}});
        })
        .catch(err => {
            temp = {...err};
            console.log(temp.response);
            console.log(err.response.data)
        })
    if(temp.status == 200) yield put({type: CHANGE_PROFILE_SUCCESS, payload: {message: temp.data.msg, isLoading: false, account: {username: payload.username, password: payload.password}}});
    else if(temp.response.status == 400) yield put({type: CHANGE_PROFILE_FAIL, payload: {message: temp.response.data.msg, isLoading: false}});
}

function *handldPayment({payload}) {
    let temp = {};
    console.log(payload);
    yield put({type: LOADING, payload: true});
    yield payment(payload)
        .then(res => {
            temp = {...res};
            console.log(`${res.status} ${res.statusText}`);
            console.log(res.data);
            //put({type: CHANGE_PROFILE_SUCCESS, payload: {message: res.data.msg, isLoading: false}});
        })
        .catch(err => {
            temp = {...err};
            console.log(temp.response);
            console.log(err.response.data)
        })
    if(temp.status == 200) yield put({type: PAYMENT_SUCCESS, payload: {message: temp.data.msg, isLoading: false}});
    //else if(temp.response.status == 400) yield put({type: CHANGE_PROFILE_FAIL, payload: {message: temp.response.data.msg, isLoading: false}});
}

export default function* rootSaga() {
    yield takeLatest(SIGN_UP, handleSignUp);
    yield takeLatest(LOGIN, handleLogin);
    yield takeLatest(VIEW_HOMEPAGE, handleViewHomePage);
    yield takeLatest(CHANGE_PROFILE, handleChangeProfile);
    yield takeLatest(PAYMENT, handldPayment);
};