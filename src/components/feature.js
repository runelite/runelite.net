import React from 'react'
import { Col, Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap'

const Feature = ({ image, title, description }) => (
  <Col md={4} style={{ marginBottom: 15 }}>
    <Card>
      <CardImg top src={image} />
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardText>{description}</CardText>
      </CardBody>
    </Card>
  </Col>
)

export default Feature
