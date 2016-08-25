import React, { Component, PropTypes } from 'react'
import themeable from '../../util/themeable'
import shortid from 'shortid'
import classnames from 'classnames'
import CustomPropTypes from '../../util/CustomPropTypes'
import { pickProps, omitProps } from '../../util/passthroughProps'
import FormField from '../FormField'

import IconArrowDown from './IconArrowDown'

import styles from './styles.css'
import theme from './theme.js'

/**
  An accessible and easily stylable select component.

  ### Select size variants

  Default is `medium`.

  ```jsx_example
  <div>
  <Select size="small" label="Small">
    <option value="foo">Foo</option>
    <option disabled value="bar">Bar</option>
  </Select>
  <br />
  <Select label="Medium">
    <option value="foo">Foo</option>
    <option disabled value="bar">Bar</option>
  </Select>
  <br />
  <Select size="large" label="Large">
    <option value="foo">Foo</option>
    <option disabled value="bar">Bar</option>
  </Select>
  </div>
  ```

  ### Select with an error message

  ```jsx_example
  <Select label="What would you like for a snack?" messages={[{ text: 'You need to make a selection', type: 'error' }]}>
    <option value="apples">Apples</option>
    <option value="oranges">Oranges</option>
    <option value="bananas">Bananas</option>
    <option value="candy" disabled>Candy</option>
  </Select>
  ```

  ### Select with the label visible only to screenreaders

  ```jsx_example
  <Select label={<ScreenReaderContent>What would you like for a snack?</ScreenReaderContent>}>
    <option value="apples">Apples</option>
    <option value="oranges">Oranges</option>
    <option value="bananas">Bananas</option>
    <option value="candy" disabled>Candy</option>
  </Select>
  ```
**/
@themeable(theme, styles)
class Select extends Component {
  static propTypes = {
    /**
    * Children must be option tags.
    */
    children: CustomPropTypes.validChildren(['option']),
    label: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    /**
    * object with shape: `{
    * text: PropTypes.string,
    * type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
    *   }`
    */
    messages: PropTypes.arrayOf(CustomPropTypes.formFieldMessage),
    id: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    required: PropTypes.bool,
    isBlock: PropTypes.bool
  };

  static defaultProps = {
    disabled: false,
    size: 'medium',
    isBlock: true
  };

  constructor (props) {
    super()

    this.defaultId = 'Select__' + shortid.generate()
  }

  get id () {
    return this.props.id || this.defaultId
  }

  get invalid () {
    return this.props.messages && this.props.messages.find((message) => { return message.type === 'error' })
  }

  render () {
    const {
      size,
      children
    } = this.props

    const props = omitProps(this.props, Select.propTypes)

    const classes = {
      [styles.root]: true,
      [styles[size]]: size
    }

    return (
      <FormField
        {...pickProps(this.props, FormField.propTypes)}
        id={this.id}
      >
        <span className={classnames(classes)}>
          <select
            {...props}
            id={this.id}
            className={styles.select}
            aria-invalid={this.invalid ? 'true' : null}
          >
            {children}
          </select>
          <IconArrowDown className={styles.arrow} />
        </span>
      </FormField>
    )
  }
}

export default Select