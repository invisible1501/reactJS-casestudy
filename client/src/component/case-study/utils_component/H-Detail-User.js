import React from "react";
import { Link } from "react-router-dom";

function HeadingDetailUser(props) {
    const {handleChange} = props;

    return (
        <div className="nav flex-column nav-pills col-md-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <div>
                <button onClick={evt => handleChange && handleChange(evt)}>Chỉnh sửa hồ sơ</button>
            </div>
            <Link to={'/detail'}><a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" role="tab" aria-controls="v-pills-home" aria-selected="true">Tài khoản của tôi</a></Link>
            <Link to={'/detail/order'}><a className="nav-link" id="v-pills-order-tab" data-toggle="pill" role="tab" aria-controls="v-pills-order" aria-selected="false">Đơn mua</a></Link>
            <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Thông báo</a>
        </div>
    )
}

export default HeadingDetailUser;