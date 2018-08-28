import React from 'react'

const Feature = ({ image, title, description, link }) => (
  <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12' style={{ marginBottom: 15 }}>
    <div className='card'>
      <img className='card-img-top' alt={title} src={image} />
      <div className='card-body'>
        <h5 className='card-title'>
          { link ? (<a href={link} alt='View on Wiki'>{title}</a>) : title }
        </h5>
        <p className='card-text'>{description}</p>
      </div>
    </div>
  </div>
)

export default Feature
