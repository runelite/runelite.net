import { h } from 'preact'
import './feature.scss'

const ExternalPlugin = ({
  displayName,
  author,
  description,
  support,
  imageUrl
}) => (
  <div class="col-md-4 col-sm-6 col-xs-12 mb-2">
    <div class="card">
      <div class="card-body d-flex align-self-stretch">
        <div class="m-2">
          <img
            width="36"
            alt=""
            src={imageUrl ? imageUrl : '/img/plugin-hub/missingicon.png'}
          />
        </div>
        <div>
          <h5 class="card-title">
            {support ? (
              <a
                href={support}
                alt="Support link"
                rel="noopener noreferrer"
                target="_blank"
              >
                {displayName}
              </a>
            ) : (
              displayName
            )}
          </h5>
          <h6 class="card-subtitle mb-2 text-muted">
            <b>{author}</b>
          </h6>
          <p class="card-text">
            {description.replace(/<br\/?>/g, '\n').replace(/<[^>]+>/g, '')}
          </p>
        </div>
      </div>
    </div>
  </div>
)

export default ExternalPlugin
