import { h } from 'preact'
import { getBaseUrl } from '../util'

const Footer = () => (
  <section>
    <div class="content-section">
      <footer>
        <hr />
        Developed with <i class="fas fa-heart" /> and{' '}
        <i class="fas fa-coffee" /> using{' '}
        <a href="https://getbootstrap.com/">Bootstrap</a>,{' '}
        <a href="https://reactjs.org/">React</a> and{' '}
        <a href="https://fontawesome.com/">Font Awesome</a>
        <a href={`${getBaseUrl()}/atom.xml`} class="float-right">
          <i class="fas fa-rss" /> Subscribe via RSS
        </a>
      </footer>
    </div>
  </section>
)

export default Footer
