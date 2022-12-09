import { useState, useEffect } from "react"
import { ProductForm } from "./productForm"
import "./postForm.css"
import { TextForm } from "./textForm"

export const PostForm = () => {

    //creating a variable to store the value of product
    let [product, setProduct] = useState()

    const handleChange = () => {
        if(product){
            setProduct(false)
        } else {
            setProduct(true)
        }
    }

    return  <><div className="titleContainer"><h2 className="postForm__title">Create A Post</h2></div>
{           product
                ?
            <>
            <div className="titleContainer">
            <h2 className="sliderLabel">Product</h2>
            <label className="switch">
            <input type="checkbox" 
            onClick={() => handleChange()}/>
            <span className="slider round"></span>
            </label><h2 className="sliderLabel">Text</h2></div>
            < TextForm />
            </>
            : <>
            <div className="titleContainer">
            <h2 className="sliderLabel">Product</h2>
            <label className="switch">
            <input type="checkbox" 
            onClick={() =>handleChange()}/>
             <span className="slider round"></span>
            </label><h2 className="sliderLabel">Text</h2></div>
            < ProductForm />
            </>

}
        </>
}