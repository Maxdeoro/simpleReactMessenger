import React from "react";
import PostListItem from "../post-list-item/post-list-item";
import "./post-list.css";

const PostList = ({posts, onDelete, onToggleImportant, onToggleLiked}) => {
    const elements = posts.map((item) => {
        const {id, ...itemProps} = item;
        return (
            <li className="list-group-item" key={id}>
                <PostListItem {...itemProps} 
                onDelete={() => onDelete(id)} 
                onToggleImportant={() => onToggleImportant(id)} 
                onToggleLiked={() => onToggleLiked(id)}/>
            </li>
        )
    });
    return (
        <ul className="app-list list-group">
            {elements}
            {/* <PostListItem label={posts[0].label} important={posts[0].important}/> */}
            {/* <PostListItem label='How are you?' important/>
            <PostListItem label="I'm fine, thank you."/> */}
        </ul>
    )
}

export default PostList;