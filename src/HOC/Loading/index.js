import React from 'react';

export const Loaiding = LoadingComponent => Wrapped => {
  class Load extends React.Component {
    render() {
      if (this.props.status) {
        return <Wrapped><LoadingComponent /></Wrapped>
      } else {
        return <Wrapped children={this.props.children}/>
      }
    }
  }
  return Load;
};
