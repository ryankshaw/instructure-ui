import React, { Component } from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'
import classnames from 'classnames'
import IconArrowOpenRightSolid from 'instructure-icons/lib/Solid/IconArrowOpenRightSolid'
import IconArrowOpenDownSolid from 'instructure-icons/lib/Solid/IconArrowOpenDownSolid'
import themeable from '../../themeable'

import styles from './styles.css'
import theme from './theme'

/**
---
category: navigation
---
  The ToggleDetails component can be used to show/hide content in response to user action.

  By default, ToggleDetails content is hidden. To override, pass in the `expanded` prop.

  ```jsx_example
  <ToggleDetails
    summary={<Typography color="primary">Click to hide me!</Typography>}
    expanded
  >
    <Typography>
      <b>I am expanded!</b>&nbsp;{lorem.paragraph()}
    </Typography>
  </ToggleDetails>
  ```

  ToggleDetails can be set to `filled` and will force the width to 100%.

  ```jsx_example
  <ToggleDetails
    variant="filled"
    summary={<Typography color="primary">Click to expand me!</Typography>}
  >
    <Typography>
      <b>I am expanded!</b>&nbsp;{lorem.paragraph()}
    </Typography>
  </ToggleDetails>
  ```
  ### Icon size / summary text formatting
  Icon size can be adjusted using the `size` prop with small, medium, and large options

  The `summary` prop accepts any node, allowing you to format the summary text as
  you see fit. In these examples, we are formatting it with the
  [Typography](#Typography) component.

  ```jsx_example
  <div>
    <ToggleDetails
      size="small"
      summary={<Typography size="small">Small icon</Typography>}
    >
      <Typography>
        {lorem.paragraph()}
      </Typography>
    </ToggleDetails>

    <br />

    <ToggleDetails summary={<Typography size="medium">Medium icon</Typography>}>
      <Typography>
        {lorem.paragraph()}
      </Typography>
    </ToggleDetails>

    <br />

    <ToggleDetails
      size="large"
      summary={<Typography size="large">Large icon</Typography>}>
      <Typography>
        {lorem.paragraph()}
      </Typography>
    </ToggleDetails>
  </div>
  ```

  ### Icon positioning and block display
  The `iconPosition` prop determines if the icon comes before or after the summary

  When the `fluidWidth` prop is set, the summary fills the width of its
  container.

  ```jsx_example
  <ToggleDetails
    summary={
      <Typography
        size="medium"
        weight="bold"
      >
        Block display
      </Typography>
    }
    iconPosition="end"
    expanded
    fluidWidth
  >
    <Typography>
      {lorem.paragraph()}
    </Typography>
  </ToggleDetails>
  ```
**/
@themeable(theme, styles)
class ToggleDetails extends Component {
  static propTypes = {
    variant: PropTypes.oneOf(['default', 'filled']),
    /**
    * The summary that displays and can be interacted with
    */
    summary: PropTypes.node.isRequired,
    /**
    * Whether the content is initially expanded or hidden
    */
    expanded: PropTypes.bool,
    /**
    * The icon to display next to the summary text when content is hidden
    */
    icon: PropTypes.func,
    /**
    * The icon to display when content is expanded
    */
    iconExpanded: PropTypes.func,
    /**
    * Icon position at the start or end of the summary text
    */
    iconPosition: PropTypes.oneOf(['start', 'end']),
    /**
    * should the the summary fill the width of its container
    */
    fluidWidth: PropTypes.bool,
    /**
    * The toggleable content passed inside the ToggleDetails component
    */
    children: PropTypes.node.isRequired,
    /**
    * Choose a size for the expand/collapse icon
    */
    size: PropTypes.oneOf(['small', 'medium', 'large'])
  }

  static defaultProps = {
    variant: 'default',
    size: 'medium',
    expanded: false,
    fluidWidth: false,
    icon: IconArrowOpenRightSolid,
    iconExpanded: IconArrowOpenDownSolid,
    iconPosition: 'start'
  }

  constructor (props) {
    super()
    this.state = {
      expanded: props.expanded,
      shouldAnimateContent: false
    }

    this._contentId = `ToggleDetails__${shortid.generate()}`
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      expanded: nextProps.expanded,
      shouldAnimateContent: true
    })
  }

  handleClick = () => {
    this.toggleExpanded()
  }

  toggleExpanded () {
    this.setState({
      expanded: !this.state.expanded,
      shouldAnimateContent: true
    })
  }

  renderToggle () {
    const {
      variant,
      summary,
      iconPosition
    } = this.props

    const classes = {
      [styles.toggle]: true,
      [styles.fluidWidth]: this.props.fluidWidth,
      [styles[variant]]: true
    }
    return (
      <button
        type="button"
        aria-controls={this._contentId}
        aria-expanded={this.state.expanded}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        className={classnames(classes)}
      >
        <span className={styles.summary}>
          {iconPosition === 'start' && this.renderIcon()}
          {summary}
          {iconPosition === 'end' && this.renderIcon()}
        </span>
      </button>
    )
  }

  renderIcon () {
    const {
      size,
      iconPosition
    } = this.props
    const Icon = this.state.expanded ? this.props.iconExpanded : this.props.icon
    const classes = {
      [styles.icon]: true,
      [styles[size]]: size,
      [styles.iconStart]: iconPosition === 'start',
      [styles.iconEnd]: iconPosition === 'end'
    }
    return (
      <span className={classnames(classes)}>
        <Icon />
      </span>
    )
  }

  renderDetails () {
    const {
      size,
      iconPosition
    } = this.props
    const classes = {
      [styles.details]: true,
      [styles[size]]: size,
      [styles.hiddenDetails]: !this.state.expanded,
      [styles.expandedDetails]: this.state.expanded,
      [styles.indentDetails]: iconPosition === 'start'
    }
    return (
      <div id={this._contentId} className={classnames(classes)}>
        { this.renderContent() }
      </div>
    )
  }

  renderContent () {
    const classes = {
      [styles.content]: this.state.shouldAnimateContent
    }
    return this.state.expanded && (
      <div className={classnames(classes)}>{this.props.children}</div>
    )
  }

  render () {
    const classes = {
      [styles.root]: true,
      [styles[this.props.size]]: true
    }

    return (
      <div className={classnames(classes)}>
        { this.renderToggle() }
        { this.renderDetails() }
      </div>
    )
  }
}

export default ToggleDetails
