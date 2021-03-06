import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import themeable from '../../themeable'
import { omitProps } from '../../util/passthroughProps'

import CustomPropTypes from '../../util/CustomPropTypes'
import Container from '../Container'

import styles from './styles.css'
import theme from './theme'

/**
  A `<ContextBox/>` is a container component that displays contextual information. It may or may not
  be displayed as on overlay using a [Popover](#Popover).

  `<ContextBox/>` defaults to no padding around its content. To add padding, use the `padding` prop.

  Use the `textAlign` prop to change the alignment of the text inside `<ContextBox />`.

  In use cases where `<ContextBox/>` is not absolutely positioned, use the `margin` prop to set margin
  around the component.

  ```jsx_example
  <div>
    <ContextBox padding="small" margin="0 large 0 0">
      <Heading level="h3">Hello World</Heading>
    </ContextBox>
    <ContextBox
      margin="0 large 0 0"
      padding="small"
      placement="top"
    >
      <Heading level="h3">Hello World</Heading>
      <Typography size="small">Some informational text that is helpful</Typography>
    </ContextBox>
    <ContextBox
      margin="0 large 0 0"
      padding="small"
      textAlign="end"
      placement="start"
    >
      <Heading level="h3">Hello World</Heading>
      <Typography size="small">This ContextBox is end-text-aligned</Typography>
    </ContextBox>
    <ContextBox
      placement="bottom"
      padding="medium"
      variant="inverse"
      size="small"
      margin="x-large 0 0"
    >
      <Typography size="small">
        This ContextBox uses the inverse variant and medium padding. Its size prop is set to small,
        which causes long strings like this to wrap. It also has top margin to separate it from
        the ContextBoxes about it.
      </Typography>
    </ContextBox>
  </div>
  ```
 **/
@themeable(theme, styles)
export default class ContextBox extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    children:  PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['default', 'inverse']),
    withArrow: PropTypes.bool,
    arrowOffsetStart: PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ]),
    arrowOffsetTop: PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ]),
    placement: CustomPropTypes.placement,
    positionStart: PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ]),
    positionTop: PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ]),
    /**
    * Valid values are `0`, `none`, `auto`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `margin="small auto large"`.
    */
    margin: CustomPropTypes.spacing,
    /**
    * Valid values are `0`, `none`, `xxx-small`, `xx-small`, `x-small`,
    * `small`, `medium`, `large`, `x-large`, `xx-large`. Apply these values via
    * familiar CSS-like shorthand. For example: `padding="small x-large large"`.
    */
    padding: CustomPropTypes.spacing,
    textAlign: PropTypes.oneOf(['start', 'center', 'end']),
    /**
    * Component will expand to fit the width of its contents by default,
    * unless size is specified
    */
    size: PropTypes.oneOf(['small', 'medium', 'large'])
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    variant: 'default',
    placement: 'center end',
    withArrow: true
  }

  render () {
    const {
      style, // eslint-disable-line react/prop-types
      className, // eslint-disable-line react/prop-types
      padding,
      margin,
      size,
      textAlign,
      variant,
      children,
      withArrow,
      positionStart,
      positionTop,
      arrowOffsetTop,
      arrowOffsetStart,
      placement
    } = this.props

    const classes = {
      [styles.root]: true,
      [styles[variant]]: true,
      [styles['with-arrow']]: withArrow,
      [className]: className,
      [styles[`positioned--${placement.replace(' ', '-')}`]]: true
    }

    const containerStyle = {
      position: (positionTop || positionStart) ? 'absolute' : (style && style.position),
      left: positionStart || (style && style.left),
      top: positionTop || (style && style.top),
      ...style
    }

    const arrowStyle = {
      left: arrowOffsetStart,
      top: arrowOffsetTop
    }

    return (
      <Container
        {...omitProps(this.props, ContextBox.propTypes)}
        style={containerStyle}
        className={classnames(classes)}
        margin={margin}
        size={size}
      >
        <Container
          className={styles.content}
          padding={padding}
          textAlign={textAlign}
        >
          {withArrow && <span className={styles.arrow} style={arrowStyle} />}
          {children}
        </Container>
      </Container>
    )
  }
}
