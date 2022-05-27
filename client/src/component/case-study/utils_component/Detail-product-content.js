import React from "react";
import Cookies from 'universal-cookie';
const cookies = new Cookies(); 

function DetailProductContent(props) {
    const {handleAddCart, handleChange, num, product} = props;
    
    return (
        <section aria-label="Main content" role="main" className="product-detail">
            <div itemScope itemType="http://schema.org/Product">
                <meta itemProp="url" content="http://html-koder-test.myshopify.com/products/tommy-hilfiger-t-shirt-new-york" />
                <meta itemProp="image" content={product.thumbnail} />
                <div className="shadow">
                    <div className="_cont detail-top">
                        <div className="cols">
                            <div className="left-col">
                                <div className="thumbs">
                                    <a className="thumb-image active" href={product.thumbnail} data-index="0">
                                        <span><img src={product.thumbnail} alt="Tommy Hilfiger T-Shirt New York" /></span>
                                    </a>
                                    <a className="thumb-image" href={product.thumbnail} data-index="1">
                                        <span><img src={product.thumbnail} alt="Tommy Hilfiger T-Shirt New York" /></span>
                                    </a>
                                    <a className="thumb-image" href={product.thumbnail} data-index="2">
                                        <span><img src={product.thumbnail} alt="Tommy Hilfiger T-Shirt New York" /></span>
                                    </a>
                                    <a className="thumb-image" href={product.thumbnail} data-index="3">
                                        <span><img src={product.thumbnail} alt="Tommy Hilfiger T-Shirt New York" /></span>
                                    </a>
                                </div>
                                <div className="big">
                                    <span id="big-image" className="img" quickbeam="image" style={{ "backgroundImage": `url(${product.thumbnail})`, "dataSrc": "//cdn.shopify.com/s/files/1/1047/6452/products/product_1024x1024.png?v=1446769025" }}></span>
                                    <div id="banner-gallery" className="swipe">
                                        <div className="swipe-wrap">
                                            <div style={{ "backgroundImage": "url('//cdn.shopify.com/s/files/1/1047/6452/products/product_large.png?v=1446769025')" }}></div>
                                            <div style={{ "backgroundImage": "url('//cdn.shopify.com/s/files/1/1047/6452/products/tricko1_large.jpg?v=1447104179')" }}></div>
                                            <div style={{ "backgroundImage": "url('//cdn.shopify.com/s/files/1/1047/6452/products/tricko2_large.jpg?v=1447104180')" }}></div>
                                            <div style={{ "backgroundImage": "url('//cdn.shopify.com/s/files/1/1047/6452/products/tricko3_large.jpg?v=1447104182')" }}></div>
                                        </div>
                                    </div>
                                    <div className="detail-socials">
                                        <div className="social-sharing" data-permalink="http://html-koder-test.myshopify.com/products/tommy-hilfiger-t-shirt-new-york">
                                            <a target="_blank" className="share-facebook" title="Share"></a>
                                            <a target="_blank" className="share-twitter" title="Tweet"></a>
                                            <a target="_blank" className="share-pinterest" title="Pin it"></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="right-col">
                                <h1 itemProp="name">{product.name}</h1>
                                <div itemProp="offers" itemScope itemType="http://schema.org/Offer">
                                    <meta itemProp="priceCurrency" content="USD" />
                                    <link itemProp="availability" href="https://schema.org/InStock" />
                                    <div className="price-shipping">
                                        <div className="price" id="price-preview" quickbeam="price" quickbeam-price="800">
                                            ${product.price}
                                        </div>
                                        <a>{product.quantity} remain</a>
                                    </div>
                                    <div className="swatches">
                                        <div className="swatch clearfix" data-option-index="0">
                                            <div className="header">Size</div>
                                            <div data-value="M" className="swatch-element plain m available">
                                                <input id="swatch-0-m" type="radio" name="option-0" defaultChecked />
                                                <label htmlFor="swatch-0-m">
                                                    M
                                                    <img className="crossed-out" src="//cdn.shopify.com/s/files/1/1047/6452/t/1/assets/soldout.png?10994296540668815886" />
                                                </label>
                                            </div>
                                            <div data-value="L" className="swatch-element plain l available">
                                                <input id="swatch-0-l" type="radio" name="option-0" />
                                                <label htmlFor="swatch-0-l">
                                                    L
                                                    <img className="crossed-out" src="//cdn.shopify.com/s/files/1/1047/6452/t/1/assets/soldout.png?10994296540668815886" />
                                                </label>
                                            </div>
                                            <div data-value="XL" className="swatch-element plain xl available">
                                                <input id="swatch-0-xl" type="radio" name="option-0" />
                                                <label htmlFor="swatch-0-xl">
                                                    XL
                                                    <img className="crossed-out" src="//cdn.shopify.com/s/files/1/1047/6452/t/1/assets/soldout.png?10994296540668815886" />
                                                </label>
                                            </div>
                                            <div data-value="XXL" className="swatch-element plain xxl available">
                                                <input id="swatch-0-xxl" type="radio" name="option-0" />
                                                <label htmlFor="swatch-0-xxl">
                                                    XXL
                                                    <img className="crossed-out" src="//cdn.shopify.com/s/files/1/1047/6452/t/1/assets/soldout.png?10994296540668815886" />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="swatch clearfix" data-option-index="1">
                                            <div className="header">Color</div>
                                            <div data-value="Blue" className="swatch-element color blue available">
                                                <div className="tooltip">Blue</div>
                                                <input quickbeam="color" id="swatch-1-blue" type="radio" name="option-1" defaultChecked />
                                                <label htmlFor="swatch-1-blue" style={{ "borderColor": "blue" }}>
                                                    <img className="crossed-out" src="//cdn.shopify.com/s/files/1/1047/6452/t/1/assets/soldout.png?10994296540668815886" />
                                                    <span style={{ "backgroundColor": "blue" }}></span>
                                                </label>
                                            </div>
                                            <div data-value="Red" className="swatch-element color red available">
                                                <div className="tooltip">Red</div>
                                                <input quickbeam="color" id="swatch-1-red" type="radio" name="option-1" />
                                                <label htmlFor="swatch-1-red" style={{ "borderColor": "red" }}>
                                                    <img className="crossed-out" src="//cdn.shopify.com/s/files/1/1047/6452/t/1/assets/soldout.png?10994296540668815886" />
                                                    <span style={{ "backgroundColor": "red" }}></span>
                                                </label>
                                            </div>
                                            <div data-value="Yellow" className="swatch-element color yellow available">
                                                <div className="tooltip">Yellow</div>
                                                <input quickbeam="color" id="swatch-1-yellow" type="radio" name="option-1" />
                                                <label htmlFor="swatch-1-yellow" style={{ "borderColor": "yellow" }}>
                                                    <img className="crossed-out" src="//cdn.shopify.com/s/files/1/1047/6452/t/1/assets/soldout.png?10994296540668815886" />
                                                    <span style={{ "backgroundColor": "yellow" }}></span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="guide">
                                            <a>Size guide</a>
                                        </div>
                                    </div>
                                    <select name="id" id="productSelect" quickbeam="product" className="product-single__variants" value="7924994501" onChange={handleChange}>
                                        <option data-sku="" value="7924994501">
                                            M / Blue - $800.00 USD
                                        </option>
                                        <option data-sku="" value="7924995077">
                                            M / Red - $850.00 USD
                                        </option>
                                        <option data-sku="" value="7924994437">
                                            L / Blue - $850.00 USD
                                        </option>
                                        <option data-sku="" value="7924994693">
                                            L / Yellow - $850.00 USD
                                        </option>
                                        <option data-sku="" value="7924995013">
                                            L / Red - $850.00 USD
                                        </option>
                                        <option data-sku="" value="7924994373">
                                            XL / Blue - $900.00 USD
                                        </option>
                                        <option data-sku="" value="7924994629">
                                            XL / Yellow - $850.00 USD
                                        </option>
                                        <option data-sku="" value="7924830021">
                                            XXL / Blue - $950.00 USD
                                        </option>
                                        <option data-sku="" value="7924994885">
                                            XXL / Red - $850.00 USD
                                        </option>
                                    </select>
                                    <div className="btn-and-quantity-wrap">
                                        <div className="btn-and-quantity">
                                            <div className="spinner">
                                                <span className="btn minus" data-id="2721888517" onClick={(num > 0) ? evt => handleChange(evt, 'minus') : undefined}></span>
                                                <input type="text" id="updates_2721888517" name="quantity" className="quantity-selector" value={num} onChange={handleChange} />
                                                <input type="hidden" id="product_id" name="product_id" />
                                                <span className="q"></span>
                                                <span className="btn plus" data-id="2721888517" onClick={(num < product.quantity) ? evt => handleChange(evt, 'plus') : undefined}></span>
                                            </div>
                                            <div id="AddToCart" quickbeam="add-to-cart">
                                                <span id="AddToCartText" onClick={(cookies.get('username') != null) ? handleAddCart : undefined}>Add to Cart</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tabs">
                                        <div className="tab-labels">
                                            <span data-id="1" className="active">Info</span>
                                            <span data-id="2">Brand</span>
                                        </div>
                                        <div className="tab-slides">
                                            <div id="tab-slide-1" itemProp="description" className="slide active">
                                                We open source it ReactJs for you https://selling-page.herokuapp.com/ if you want to use it on your ecommerce.
                                            </div>
                                            <div id="tab-slide-2" className="slide">
                                                Tony Hunfinger
                                            </div>
                                        </div>
                                    </div>
                                    <div className="social-sharing-btn-wrapper">
                                        <span id="social_sharing_btn">Share</span>
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

export default DetailProductContent;