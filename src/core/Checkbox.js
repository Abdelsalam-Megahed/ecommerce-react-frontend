import React, { useState } from "react";

const Checkbox = ({ categories, handleFilters }) => {
    const [checked, setChecked] = useState([])

    const handleToggle = (categoryId) => () => {
        const currentCategoryId = checked.indexOf(categoryId);
        const newCheckedCategoryId = [...checked]

        if(currentCategoryId === -1){
            newCheckedCategoryId.push(categoryId)
        }else{
            newCheckedCategoryId.splice(currentCategoryId, 1)
        }
        setChecked(newCheckedCategoryId)
        handleFilters(newCheckedCategoryId)
    }

    return categories.map((category, index) => (
        <li key={index} className="list-unstyled">
            <input onChange={handleToggle(category._id)} type="checkbox" className="form-check-input" />
            <label className="form-check-label">{category.name}</label>
        </li>
    ));
};

export default Checkbox;
