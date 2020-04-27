import React, { createContext, useState, lazy, Suspense, Component} from 'react';
import './App.css';

let About = lazy(() => import(/* webpackChunkName: "about" */'./About.jsx'))

class App extends Component {
    state = {
        load: false,
        error: false,
    }
    // 手动触发异步组件的加载
    load = () => {
        this.setState({ load: true });
    }
    // 加载失败后，点击重试
    retry = () => {
        About = lazy(() => import(/* webpackChunkName: "about" */'./About.jsx'));
        this.setState({ error: false });
    }
    // ErrorBoundary 的关键，无需再实现 componentDidCatch
    static getDerivedStateFromError(e) {
        return { error: e }
    }
    render() {
        const { load, error } = this.state;

        // 显然错误页
        if (error) {
            return (<div>
                <p>{error.message}</p>
                <button onClick={this.retry}>retry</button>
            </div>);
        }

        return (
            <div>
                <button type="button" onClick={this.load}>load</button>
                <Suspense fallback={<div>loading</div>}>
                    {
                        load && (

                            <About />

                        )
                    }
                </Suspense>
            </div>
        );
    }
}

export default App;
