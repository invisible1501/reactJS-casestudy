import './App.css';
import { Route, Routes,  } from "react-router-dom";
/* import Post from './component/api/create-mockapi/component/Post';
import Users from './component/mockapi-axios/user';
import UserDetails from './component/mockapi-axios/userDetail'; */
import Login from './component/case-study/views/Login';
import SignUp from './component/case-study/views/SignUp';
import HomePage from './component/case-study/views/HomePage';
import './component/case-study/views/HomePage.css';
import DetailUser from './component/case-study/views/DetailUser';
import DetailProduct from './component/case-study/views/DetailProduct';
import Cart from './component/case-study/views/Cart';
import DetailOrder from './component/case-study/views/DetailOrder';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import AdminProducts from './component/case-study/views/AdminPage-Products';
import AdminUsers from './component/case-study/views/AdminPage-Users';
import ViewOrder from './component/case-study/views/ViewOrder';
const history = createBrowserHistory();

function App() {
    return (
        <Routes history={history}>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/sign_up" element={<SignUp />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/detail" element={<DetailUser />} />
            <Route exact path="/detail/goods/:id" element={<DetailProduct />} />
            <Route exact path="/detail/order" element={<DetailOrder />} />
            <Route exact path="/admin/products" element={<AdminProducts />} />
            <Route exact path="/admin/users" element={<AdminUsers />} />
            <Route exact path="/admin/:username/orders" element={<ViewOrder />} />
        </Routes>
    )
}

export default App;
