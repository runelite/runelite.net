import { h } from 'preact'

const TagForm = ({ setActiveTag, activeTag }) => (
  <form>
    <textarea
      rows="5"
      class="form-control"
      onChange={event => setActiveTag(event.target.value)}
    >
      {activeTag}
    </textarea>
    <a class="btn btn-block btn-success" href={`/tag/show/${activeTag}`}>
      Go
    </a>
  </form>
)

export default TagForm
