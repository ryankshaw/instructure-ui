import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import IconXSolid from 'instructure-icons/lib/Solid/IconXSolid'
import themeable from '../../themeable'
import { omitProps } from '../../util/passthroughProps'
import CustomPropTypes from '../../util/CustomPropTypes'
import isActiveElement from '../../util/dom/isActiveElement'
import Container from '../Container'

import styles from './styles.css'
import theme from './theme'

/**
### Use `<Tag />` to represent a category or group in a form

Tag can be static (informational only) or clickable (when the `onClick` prop is
supplied). When the `dismissible` prop is added to a clickable Tag, the button
renders an X/close icon (the Tag should be dismissed via the `onClick` prop).

  ```jsx_example
    <div>
      <Tag text="Static" margin="0 xx-small 0 0" />
      <Tag
        text="Clickable"
        margin="0 xx-small 0 0"
        onClick={function () {
          alert("This Tag was clicked")
        }}
      />
      <Tag
        text="Dismissible"
        dismissible
        margin="0 xxSmall 0 0"
        onClick={function () {
          alert("This Tag was dismissed")
        }}
      />
      <Tag
        disabled
        text="Disabled clickable"
        onClick={function () {
          alert("This Tag was clicked")
        }}
      />
    </div>
  ```
  ### Sizes
  `medium` is the default Tag size.
  ```jsx_example
  <div>
    <Tag text="Small" size="small" margin="0 xx-small 0 0" />
    <Tag text="Medium" margin="0 xx-small 0 0" />
    <Tag text="Large" size="large" margin="0 xx-small 0 0" />
  </div>
  ```
  ### Max-width
  ```jsx_example
    <Tag
      text="Long string of text designed to trigger overflow"
    />
  ```
**/

@themeable(theme, styles)
class Tag extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    className: PropTypes.string,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    dismissible: PropTypes.bool,
    /**
    * Valid values are `0`, `none`, `auto`, `xxxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: CustomPropTypes.spacing,
    /**
    * If you add an onClick prop, Tag renders as a clickable button
    */
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['small', 'medium', 'large'])
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    size: 'medium',
    dismissible: false
  }

  get focused () {
    return isActiveElement(this._container)
  }

  focus = () => {
    this._container && this._container.focus()
  }

  handleClick = (e) => {
    const {
      disabled,
      onClick
    } = this.props

    if (disabled) {
      e.preventDefault()
      e.stopPropagation()
    } else if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  handleRef = (node) => {
    this._container = node
  }

  render () {
    const {
      className,
      dismissible,
      disabled,
      size,
      text,
      title,
      onClick,
      margin
    } = this.props

    const props = omitProps(this.props, Tag.propTypes, ['padding'])

    const classes = {
      [styles.root]: true,
      [styles[size]]: size,
      [styles.dismissible]: dismissible,
      [styles.button]: onClick
    }

    return (
      <Container
        {...props}
        ref={this.handleRef}
        className={classNames(className, classes)}
        as={(onClick) ? 'button' : 'span'}
        margin={margin}
        type={(onClick) ? 'button' : null}
        onClick={(onClick) ? this.handleClick : null}
        aria-disabled={(onClick && disabled) ? 'true' : null}
        display={null}
        title={title || (typeof text === 'string') ? text : null}
      >
        <span className={styles.text}>
          {text}
        </span>
        {(onClick && dismissible)
          ? <IconXSolid className={styles.icon} /> : null
        }
      </Container>
    )
  }
}

export default Tag
