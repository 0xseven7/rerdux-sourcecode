import React from 'react';

class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            num : 0
        }
    }
    render () {
        return (
        <div>
            <button>-</button>
            <span>{this.state.num}</span>
            <button>+</button>
        </div>    
    )}
}
export default App;