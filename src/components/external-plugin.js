import { h, Fragment } from 'preact'
import './feature.scss'
import './tooltip.css'
import { numberWithCommas } from '../util'

const ExternalPlugin = ({
  displayName,
  author,
  description,
  internalName,
  imageUrl,
  installed,
  count,
  working,
  unavailableReason
}) => (
  <div class="col-md-4 col-sm-6 col-xs-12 mb-2">
    <div class="card">
      <div class="card-body d-flex align-self-stretch">
        <div className="mr-2 d-flex align-items-start">
          <img
            width="36"
            alt=""
            src={imageUrl ? imageUrl : '/img/plugin-hub/missingicon.png'}
          />
        </div>
        <div>
          <h5 class="card-title">
            <a href={`/plugin-hub/show/${internalName}`}>{displayName}</a>
          </h5>
          <h6 class="card-subtitle mb-2 text-muted">
            <a href={`/plugin-hub/${author}`}>{author}</a>
          </h6>
          <p class="card-text">
            {count > 0 && (
              <Fragment>
                <span class="badge badge-primary">
                  {numberWithCommas(count)}{' '}
                  {count > 1 ? 'active installs' : 'active install'}
                </span>{' '}
              </Fragment>
            )}
            {installed && (
              <Fragment>
                <span class="badge badge-success">installed</span>{' '}
              </Fragment>
            )}
            {!working && (
              <div className="tooltip-tag">
                <div className="tooltip-tag-text tooltip-tag-text-simple">
                  {unavailableReason ? (
                    <Fragment>{unavailableReason}</Fragment>
                  ) : (
                    <Fragment>
                      The plugin is incompatible with the latest RuneLite
                      version, and requires its author to update it.
                    </Fragment>
                  )}
                </div>
                <div>
                  <span className="badge badge-danger">unavailable</span>
                </div>
              </div>
            )}
          </p>
          <p class="card-text">{description}</p>
        </div>
      </div>
    </div>
  </div>
)

export default ExternalPlugin
