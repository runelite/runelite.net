import React from 'react'
import { Col, Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap'

const Feature = ({ image, title, description, link }) => (
  <Col xl='3' lg='3' md='4' sm='6' xs='12' style={{ marginBottom: 15 }}>
    <Card>
      <CardImg top src={image} />
      <CardBody>
        <CardTitle><a href={link}>{title}</a></CardTitle>
        <CardText>{description}</CardText>
      </CardBody>
    </Card>
  </Col>
)

export default Feature
