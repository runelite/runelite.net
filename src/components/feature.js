import { h } from 'preact'
import './feature.scss'

const Feature = ({ image, title, description, link, linkAlt }) => (
  <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-2">
    <div class="card">
      <img class="card-img-top" alt={title} src={image} fetchpriority="low" />
      <div class="card-body">
        <h5 class="card-title">
          {link ? (
            <a href={link} alt={linkAlt}>
              {title}
            </a>
          ) : (
            title
          )}
        </h5>
        <p class="card-text">{description}</p>
      </div>
    </div>
  </div>
)

export default Feature
