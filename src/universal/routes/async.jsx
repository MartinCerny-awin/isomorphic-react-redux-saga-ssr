import React from 'react';

function asyncRoute(getComponent) {
  return class AsyncComponent extends React.Component {
    state = {
      Component: null,
    };

    componentDidMount() {
      if (this.state.Component === null) {
        getComponent().then((Component) => {
          this.setState({ Component: Component.default });
        });
      }
    }

    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return <div>loading...</div>; // or <div /> with a loading spinner, etc..
    }
  };
}

export const Home = asyncRoute(() => System.import('components/Home/Home'));
export const Counter = asyncRoute(() => System.import('modules/counter/CounterContainer'));
export const Albums = asyncRoute(() => System.import('modules/album/Albums'));
export const AlbumsList = asyncRoute(() => System.import('modules/album/AlbumsListContainer'));
export const Photos = asyncRoute(() => System.import('modules/photo/PhotosContainer'));
