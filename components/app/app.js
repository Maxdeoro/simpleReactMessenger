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
                {label: 'Donde estas?', important: false, id: 1},
                {label: 'Hi, Eva!', important: false, id: 2},
                {label: 'How are you?', important: true, id: 3},
                {label: "I'm fine, thank you.", important: false, id: 4}
            ],
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
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

    render() {
        return (    
            <div className="app">
                <AppHeader/>
                <div className="search-panel d-flex">
                    <SearchPanel/>
                    <PostStatusFilter/>
                </div>
                <PostList posts={this.state.data} 
                          onDelete={this.deleteItem}/>
                <PostAddForm 
                onAdd={this.addItem}/>
            </div>
            )
        }
}

export default App;