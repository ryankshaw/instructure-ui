import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CustomPropTypes from '../../../util/CustomPropTypes'
import themeable from '../../../themeable'
import { omitProps } from '../../../util/passthroughProps'

import styles from './styles.css'
import theme from './theme'

import FormFieldMessage from '../FormFieldMessage'

/**
  A FormFieldMessages component

  ```jsx_example
  <FormFieldMessages messages={[
    { text: 'Invalid name', type: 'error' },
    { text: 'Good job!', type: 'success' },
    { text: 'Full name, first and last', type: 'hint' },
  ]} />
  ```
**/
@themeable(theme, styles)
export default class FormFieldMessages extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    /**
    * object with shape: `{
    * text: PropTypes.string,
    * type: PropTypes.oneOf(['error', 'hint', 'success', 'screenreader-only'])
    *   }`
    */
    messages: PropTypes.arrayOf(CustomPropTypes.message)
  };
  /* eslint-enable react/require-default-props */

  render () {
    const {messages} = this.props
    /* eslint-disable react/no-array-index-key */
    return messages && messages.length > 0 ? (
      <span className={styles.root} {...omitProps(this.props, FormFieldMessages.propTypes)}>
        {
          messages.map((msg, i) => {
            return (
              <span key={`error${i}`} className={styles.message}>
                <FormFieldMessage variant={msg.type}>
                  {msg.text}
                </FormFieldMessage>
              </span>
            )
          })
        }
      </span>
    ) : null
    /* eslint-enable react/no-array-index-key */
  }
}
