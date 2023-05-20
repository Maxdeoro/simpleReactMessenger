import React,{Component} from "react";
import AppHeader from "../app-header/app-header";
import SearchPanel from "../search-panel/search-panel";
import PostStatusFilter from "../post-status-filter/post-status-filter";
import PostList from "../post-list/post-list";
import PostAddForm from "../post-add-form/post-add-form";

import "./app.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {label: 'Donde estas?', important: false, id: 1, like: false},
                {label: 'Hi, Eva!', important: false, id: 2, like: false},
                {label: 'How are you?', important: false, id: 3, like: false},
                {label: "I'm fine, thank you.", important: false, id: 4, like: false}
            ],
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.maxId = 5;
    }

    deleteItem(id) {
        this.setState(({data}) => {
            const index = data.findIndex((elem) => elem.id===id);
            const before = data.slice(0, index);
            const after = data.slice(index+1);
            const newArr = [...before, ...after];
            return {
                data: newArr
            }
        })
    }

    addItem(body) {
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        };
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    onToggleImportant(id) {
        this.setState(({data}) => {
            const index = data.findIndex((elem) => elem.id ===id);
            const old = data[index];
            const newItem = {...old, important: !old.important};
            const before = data.slice(0, index);
            const after = data.slice(index+1);
            const newArr = [...before, newItem, ...after];
            return {
                data: newArr
            }
        })
    }

    onToggleLiked(id) {
        this.setState(({data}) => {
            const index = data.findIndex((elem) => elem.id===id);
            const old = data[index];
            const newItem = {...old, like: !old.like};
            const before = data.slice(0, index);
            const after = data.slice(index+1);
            const newArr = [...before, newItem, ...after];
            return {
                data: newArr
            }
        })
    }

    render() {
        const {data} = this.state;
        const liked = data.filter((item) => item.like).length;  //счётчик лайков
        const allPosts = data.length;        //счётчик постов
        return (    
            <div className="app">
                <AppHeader 
                liked={liked} 
                allPosts={allPosts}/>
                <div className="search-panel d-flex">
                    <SearchPanel/>
                    <PostStatusFilter/>
                </div>
                <PostList posts={this.state.data} 
                          onDelete={this.deleteItem} 
                          onToggleImportant={this.onToggleImportant} 
                          onToggleLiked={this.onToggleLiked}/>
                <PostAddForm 
                onAdd={this.addItem}/>
            </div>
            )
        }
}

export default App;