import React,{Component} from "react";
import "./post-status-filter.css";

class PostStatusFilter extends Component {
    constructor(props) {
        super(props);
        this.buttons = [
            {name: 'all', label: 'All posts'},
            {name: 'like', label: 'Liked posts'}
        ];
    }
    render() {
        const buttons = this.buttons.map(({name, label}) => {
            const active = this.props.filter===name;
            const clazz = active ? 'btn-info' : 'btn-outline-secondary';
            return (
                <button 
                    key={name} 
                    type='button' 
                    className={`btn ${clazz}`}
                    onClick={() => this.props.onFilterSelect(name)}
                >{label}</button>
            )
        })
        return (
            <div className="btn-group">
                {buttons}
                {/* <button type='button' className="btn btn-info">All posts</button>
                <button type='button' className="btn btn-outline-secondary">Liked posts</button> */}
            </div>
        )
    }
}

export default PostStatusFilter;