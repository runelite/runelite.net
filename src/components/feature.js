import React from 'react'
import { Col, Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap'

const Feature = ({ image, title, description, link }) => (
  <Col xl='3' lg='3' md='4' sm='6' xs='12' style={{ marginBottom: 15 }}>
    <Card style={{height: '100%' }}>
      <CardImg top src={image} />
      <CardBody>
        <CardTitle>
          { link ? (<a href={link} alt='View on Wiki'>{title}</a>) : title }
        </CardTitle>
        <CardText>{description}</CardText>
      </CardBody>
    </Card>
  </Col>
)

export default Feature
