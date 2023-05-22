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
            term: '',                       //строка поиска
            filter: 'all',                     //фильтрация постов
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.filterPosts = this.filterPosts.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
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

    searchPosts(items, term) {
        if(term.length===0) {
            return items;                   //items - посты
        }

        return items.filter((item) => {
            return item.label.indexOf(term) > -1;    //вернуть посты с содержанием term
        })
    }

    onUpdateSearch(term) {
        this.setState({
            term: term
        })
    }

    filterPosts(items, filter) {
        if(filter==='like') {
            return items.filter(item => item.like) //вернуть посты где like===true)
        } else {
            return items;
        }
    }

    onFilterSelect(filter) {
        this.setState({
            filter: filter,
        })
    }

    render() {
        const {data, term, filter} = this.state;
        const liked = data.filter((item) => item.like).length;  //счётчик лайков
        const allPosts = data.length;        //счётчик постов
        const visiblePosts = this.filterPosts(this.searchPosts(data, term), filter);
        return (    
            <div className="app">
                <AppHeader 
                liked={liked} 
                allPosts={allPosts}/>
                <div className="search-panel d-flex">
                    <SearchPanel 
                    onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter 
                        filter={filter} 
                        onFilterSelect={this.onFilterSelect}/>       
                </div>
                <PostList posts={visiblePosts} 
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