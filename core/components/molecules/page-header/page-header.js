import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Automation from '../../_helpers/automation-attribute'

import { spacing } from '@auth0/cosmos-tokens'

import Heading, { StyledHeading } from '../../atoms/heading'
import Description, { StyledParagraph as DescriptionParagraph } from './description'

import Button from '../../atoms/button'
import ButtonGroup, { StyledButtonGroup } from '../../molecules/button-group'
import { actionShapeWithRequiredIcon } from '@auth0/cosmos/_helpers/action-shape'
import { descriptionIsObject } from '../../_helpers/page-header'

const StyledPageHeader = styled.div`
  display: grid;
  /* Placeholder width media feature until we have global variables for breakpoints */
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "title"
    "subtitle"
    "actions";
  grid-row-gap: ${spacing.small};

  @media (min-width: 768px) {
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
    grid-template-areas:
      "title actions"
      "subtitle subtitle";
    grid-column-gap: ${spacing.xsmall};
    grid-row-gap: ${spacing.large};
  }
  /* 
  Components should not have margin by default.
  We'll remove this margin eventually
  */
  margin-bottom: ${spacing.large};

  ${StyledButtonGroup} {
    grid-area: actions;
  }

  ${StyledHeading[1]} {
    grid-area: title;
    /* 
    Components should not have margin by default.
    We'll remove this margin reset when we remove margins from headers
    */
    margin: 0;
  }
`

const SoftDescription = ({ description, learnMore }) => {
  if (!description) return null

  if (descriptionIsObject(description)) {
    return <Description>{description}</Description>
  }

  let descriptionCompat = { text: description, learnMore }

  return <Description>{descriptionCompat}</Description>
}

const PageHeader = props => {
  return (
    <StyledPageHeader {...Automation('page-header')}>
      <Heading size={1}>{props.title}</Heading>
      <SoftDescription {...props} />
      <ButtonGroup>
        {props.secondaryAction && (
          <Button
            size="large"
            appearance="secondary"
            icon={props.secondaryAction.icon}
            onClick={props.secondaryAction.handler}
          >
            {props.secondaryAction.label}
          </Button>
        )}
        {props.primaryAction && (
          <Button
            size="large"
            appearance="cta"
            icon={props.primaryAction.icon}
            onClick={props.primaryAction.handler}
          >
            {props.primaryAction.label}
          </Button>
        )}
      </ButtonGroup>

    </StyledPageHeader>
  )
}

PageHeader.displayName = 'Page Header'

PageHeader.propTypes = {
  /** Page title of the section */
  title: PropTypes.string.isRequired,
  /** Description to give more information to the user */
  description: PropTypes.oneOfType([
    PropTypes.shape({
      text: PropTypes.string,
      learnMore: PropTypes.string
    }),
    PropTypes.node
  ]),
  /** URL to be used as the target of the 'Learn more' link */
  learnMore: PropTypes.string,
  /** Actions to be attached on top */
  primaryAction: actionShapeWithRequiredIcon,
  secondaryAction: actionShapeWithRequiredIcon
}

PageHeader.defaultProps = {
  title: ''
}

export default PageHeader
export { StyledPageHeader }
