import React from 'react'
import { Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap'

const Feature = ({ image, title, subtitle, description }) => (
  <Col md={4} style={{ marginBottom: 15 }}>
    <Card>
      <CardImg left src={image} />
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardSubtitle>{subtitle}</CardSubtitle>
        <CardText>{description}</CardText>
      </CardBody>
    </Card>
  </Col>
)

export default Feature
