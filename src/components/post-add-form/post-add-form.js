import React from "react";
import "./post-add-form.css";

const PostAddForm = () => {
    return (
            <form className="bottom-panel d-flex">
                <input
                type="text"
                placeholder="What about do you think right now?"
                className="form-control new-post-label"
                />
                <button 
                className="btn btn-outline-secondary" 
                type="submit"
                >Add post</button>
            </form>

    )
}

export default PostAddForm;