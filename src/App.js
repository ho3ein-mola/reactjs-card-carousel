import React, { Component } from 'react';
import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.itemRef = React.createRef();
        this.state = {
            controler: true,
            start: 0,
            end: 4,
            step: 2,
            length: 0,
            data: [
                { id: 0, title: "next", image: 'https://images.unsplash.com/photo-1521723406950-a52d74607150?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5b5c757d3e42af445ea86eb4dd618b1c&auto=format&fit=crop&w=500&q=60'},
                { id: 1, title: "new",image: 'https://images.unsplash.com/photo-1536669919805-31599aa57aac?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=58e50e3e786751af9dce25bcc4681076&auto=format&fit=crop&w=500&q=60'},
                { id: 2, title: "new",image: 'https://images.unsplash.com/photo-1536653257039-e8194021b8a1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=072f2c1409689fba0ed91bdc4c29cf20&auto=format&fit=crop&w=500&q=60' },
                { id: 3, title: "new",image: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6419c61e5a4e8c48b0afc4245206c8a4&auto=format&fit=crop&w=500&q=60' },
            ],
        }
        this.forward = this.forward.bind(this);
        this.backward = this.backward.bind(this);
        this.handleController = this.handleController.bind(this);
    }
    componentDidMount() {
        let items = this.itemRef;
        let pages = (items.current.scrollWidth - items.current.clientWidth) / items.current.offsetWidth;
        this.setState(() => {
            return {
                pages: Math.round(pages),
                length: this.state.data.length,
                controler: !this.state.controler,
            };
        });
    }
    handleController() {
        this.setState(() => {
            return { controler: !this.state.controler }
        },
            () => {
                console.log(this.state.controler);
            }
        );
    }
    forward() {
        this.setState((prevState) => {
            // console.log(prevState.length);
            return {
                start: (this.state.start + this.state.step >= this.state.length) ? prevState.start : prevState.start + this.state.step,
                end: (this.state.end > this.state.length) ? prevState.end : prevState.end + this.state.step,
            };
        });
    }
    backward() {
        // console.log(this.state.length);
        this.setState((prevState) => {
            return {
                start: ((this.state.start - this.state.step) <= 0) ? 0 : prevState.start - this.state.step,
                end: (this.state.end - this.state.step <= 0) ? prevState.end : prevState.end - this.state.step,
            };
        });
    }
    render() {
        let items = this.state.data.slice(this.state.start, this.state.end + 2).map(item => {
            return (
                <div key={item.id} className="item" onClick={this.handleController} >
                    <div className="row">
                        <div className="col l11 s12 m10">
                            <div className="card">
                                <div className="card-image" >
                                    <img alt="test" src={item.image} />
                                </div>
                                <div className="card-content">
                                    <span className="card-title right-align">{item.id}</span>
                                    <p className="right-align">{item.title}</p>
                                </div>
                                <div className="card-action">
                                    <a href="https://a.com">This is a link</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
        return (
            <div>
                <div id="items" className="items" ref={this.itemRef} >
                    <div className="row valign-wrapper">
                        <div className="col l1 s1 m1"  >
                            <div className="backward" hidden={this.state.controler}>
                                <a className="btn-floating btn-large waves-effect waves-light white" onClick={this.backward}><i className="material-icons black-text">arrow_back</i></a>
                            </div>
                        </div>
                        <div className="col l11 s11 m12 push-m1  ">
                            <h3 className="right-align">ورزشی</h3>
                            {items}
                        </div>
                        <div className="col l1 s1 m1" >
                            <div className="forward " hidden={this.state.controler}>
                                <a className="btn-floating btn-large waves-effect waves-light white" onClick={this.forward}><i className="material-icons black-text">arrow_forward</i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
