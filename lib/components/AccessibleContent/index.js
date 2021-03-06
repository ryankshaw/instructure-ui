import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CustomPropTypes from '../../util/CustomPropTypes'
import { omitProps } from '../../util/passthroughProps'
import getElementType from '../../util/getElementType'

import PresentationContent from '../PresentationContent'
import ScreenReaderContent from '../ScreenReaderContent'

/**
---
category: utilities
---
  An AccessibleContent component

  Note the caveats on hiding content from screen readers.
  (see [PresentationContent](#PresentationContent))

  ```jsx_example
  <AccessibleContent alt="Alternative text for a screenreader only">
    <Typography>
      Presentational content goes here
    </Typography>
  </AccessibleContent>
  ```
**/
class AccessibleContent extends Component {
  /* eslint-disable react/require-default-props */
  static propTypes = {
    alt: PropTypes.string,
    children: PropTypes.node,
    /**
    * the element type to render the screen reader content as
    */
    as: CustomPropTypes.elementType
  }
  /* eslint-enable react/require-default-props */

  static defaultProps = {
    as: 'span'
  }

  render () {
    const props = { ...omitProps(this.props, AccessibleContent.propTypes) }
    const ElementType = getElementType(AccessibleContent, this.props)

    return (
      <ElementType {...props}>
        <ScreenReaderContent>{this.props.alt}</ScreenReaderContent>
        <PresentationContent>
          {this.props.children}
        </PresentationContent>
      </ElementType>
    )
  }
}

export default AccessibleContent
