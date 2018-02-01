'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BurgerIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  getLineStyle(index) {
    return {
      position: 'absolute',
      height: '20%',
      left: 0,
      right: 0,
      top: 20 * (index * 2) + '%',
      opacity: this.state.hover ? 0.6 : 1
    };
  }

  render() {
    let icon;
    let buttonStyle = {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      padding: 0,
      border: 'none',
      opacity: 0,
      fontSize: 8,
      cursor: 'pointer'
    };

    if (this.props.customIcon) {
      let extraProps = {
        className: 'bm-icon',
        style: {
          ...{ width: '100%', height: '100%' },
          ...this.props.styles.bmIcon
        },
        'aria-hidden': 'true'
      };
      icon = React.cloneElement(this.props.customIcon, extraProps);
    } else {
      icon = (
        <span aria-hidden="true">
          {[0, 1, 2].map(bar => (
            <span
              key={bar}
              className={`bm-burger-bars ${this.props.barClassName}`.trim()}
              style={{
                ...this.getLineStyle(bar),
                ...this.props.styles.bmBurgerBars
              }}
            />
          ))}
        </span>
      );
    }

    return (
      <div
        className={`bm-burger-button ${this.props.className}`.trim()}
        style={{ ...{ zIndex: 1000 }, ...this.props.styles.bmBurgerButton }}
      >
        {icon}
        <button
          onClick={this.props.onClick}
          onMouseOver={() => this.setState({ hover: true })}
          onMouseOut={() => this.setState({ hover: false })}
          style={buttonStyle}
        >
          {this.props.altText ? this.props.altText : 'Open Menu'}
        </button>
      </div>
    );
  }
}

BurgerIcon.propTypes = {
  barClassName: PropTypes.string,
  altText: PropTypes.string,
  customIcon: PropTypes.element,
  styles: PropTypes.object
};

BurgerIcon.defaultProps = {
  barClassName: '',
  altText: '',
  className: '',
  styles: {}
};
