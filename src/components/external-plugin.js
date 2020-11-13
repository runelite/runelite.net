import { h } from 'preact'
import './feature.scss'
import { numberWithCommas } from '../util'

const ExternalPlugin = ({
  displayName,
  author,
  description,
  support,
  imageUrl,
  installed,
  internalName,
  count,
  update,
  showInstall
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
            <a href={`/plugin-hub/${author}`}>{author}</a>
          </h6>
          {count > 0 && (
            <p class="card-text">
              <span class="badge badge-primary">
                {numberWithCommas(count)}{' '}
                {count > 1 ? 'active installs' : 'active install'}
              </span>{' '}
              {showInstall &&
                (installed ? (
                  <button
                    class="badge badge-danger btn"
                    onClick={() => update(installed, internalName)}
                  >
                    uninstall
                  </button>
                ) : (
                  <button
                    class="badge badge-success btn"
                    onClick={() => update(installed, internalName)}
                  >
                    install
                  </button>
                ))}
            </p>
          )}
          <p class="card-text">
            {description.replace(/<br\/?>/g, '\n').replace(/<[^>]+>/g, '')}
          </p>
        </div>
      </div>
    </div>
  </div>
)

export default ExternalPlugin
