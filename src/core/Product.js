import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProduct, relatedList } from "./apiCore";
import Card from "./Card";

const Product = props => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [relatedProducts, setRelatedProducts] = useState([]);

    const loadSingleProduct = productId => {
        
        getProduct(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                relatedList(data._id)
                    .then(relatedData => {
                        if(relatedData.error){
                            setError(relatedData.error)
                        }else{
                                setRelatedProducts(relatedData)
                        }
                    })
            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.ProductId;        
        loadSingleProduct(productId);
    }, [props]);

    return (
        <Layout
            title={product && product.name}
            description={
                product &&
                product.description &&
                product.description.substring(0, 100)
            }
            className="container-fluid"
        >
            <div className="row">
                <div className="col-8">
                    {product && product.description && (
                        <Card product={product} showViewProductButton={false} />
                    )}
                </div>
                <div className="col-4">
                    <h2>Related Products.</h2>
                    {relatedProducts.map((relatedProduct,index) => (
                        <div className="mb-3">
                            <Card key={index} product={relatedProduct} />
                            </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Product;
