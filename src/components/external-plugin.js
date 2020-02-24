import { h } from 'preact'
import './external-plugin.scss'

const ExternalPlugin = ({
  displayName,
  author,
  description,
  support,
  imageUrl
}) => (
  <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-2">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          <div class="img-container">
            <img class="card-img-top" alt="" src={imageUrl} />
          </div>
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
          Made by <b>{author}</b>
        </h6>
        {/* Removes any tags from the description that are used for formatting inside the client, excluding br tags */}
        <p
          class="card-text"
          innerText={description
            .replace(/<br\/?>/g, '\n')
            .replace(/<[^>]+>/g, '')}
        ></p>
      </div>
    </div>
  </div>
)

export default ExternalPlugin
