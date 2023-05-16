import React from "react";
import "./post-add-form.css";

const PostAddForm = ({onAdd}) => {
    return (
            <div className="bottom-panel d-flex">
                <input
                type="text"
                placeholder="What about do you think right now?"
                className="form-control new-post-label"
                />
                <button 
                className="btn btn-outline-secondary" 
                type="submit" 
                onClick={() => onAdd('Hola')}
                >Add post</button>
            </div>

    )
}

export default PostAddForm;