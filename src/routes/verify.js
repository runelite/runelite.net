import './verify.css'
import Layout from '../components/layout'
import { h, Component, Fragment } from 'preact'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchHashes, getFileNames, getHashes } from '../modules/git'
import prepare from '../components/prepare'
import Popup from '../components/popup'
import { isIE11 } from '../util'

const FILE_STATE = Object.freeze({
  NONE: Symbol('NONE'),
  INVALID: Symbol('INVALID'),
  VALID: Symbol('VALID')
})

const bytesToHexString = bytes => {
  if (!bytes) return null

  const uint = new Uint8Array(bytes)
  const hexBytes = []
  for (let i = 0; i < uint.length; ++i) {
    let byteString = uint[i].toString(16)

    if (byteString.length < 2) byteString = '0' + byteString

    hexBytes.push(byteString)
  }

  return hexBytes.join('')
}

const noop = e => {
  e.preventDefault()
  e.stopPropagation()
}

class Verify extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hashes: props.hashes,
      fileNames: props.fileNames,
      popupMsg: null,
      dragging: false
    }
  }

  checkFile(name, sha256) {
    const found = !!this.state.hashes[sha256]
    this.setState({
      popupMsg: this.createMsg(
        name,
        found ? FILE_STATE.VALID : FILE_STATE.INVALID
      )
    })
  }

  createMsg(name, valid) {
    if (valid === FILE_STATE.VALID) {
      return (
        <Fragment>
          <h2 style={{ color: 'blue' }}>OK</h2>

          <p>
            {name} is from{' '}
            <a href="https://runelite.net">https://runelite.net</a>.
          </p>
        </Fragment>
      )
    }

    return (
      <Fragment>
        <h2 style={{ color: 'red' }}>WARNING</h2>

        <p>
          {name} is <b>NOT</b> from{' '}
          <a href="https://runelite.net">https://runelite.net</a>.
        </p>

        {name.match(/.*runelite.*(dmg|jar|exe|appimage)/i) && (
          <>
            <h4>
              You've downloaded a fake client, and your account has been
              compromised. Remove the fake as soon as possible to minimise
              further damage.
            </h4>
            <p>
              The following actions should be performed from a secure computer
              or secure mobile device:
            </p>
            <ul>
              <li>Change your RuneScape password</li>
              <li>Remove and re-add Authenticator to RuneScape</li>
              <li>Change your RuneScape bank PIN</li>
              <li>Change your email's password</li>
              <li>Add 2FA to your email if you haven't got it enabled</li>
              <li>
                Check for any linked accounts by accessing the{' '}
                <a href="https://www.runescape.com/account_settings">
                  account settings page
                </a>
              </li>
            </ul>

            <p>
              Some fake clients also install malware, only a fresh install of
              your operating system can guarantee the total removal of any
              unwanted software.
            </p>
            <p>
              You might also want to change any email password if you reused the
              same as your RuneScape account password.
            </p>

            <p>
              Once your computer is secure, you should download RuneLite from{' '}
              <a href="https://runelite.net">https://runelite.net</a>.
            </p>
          </>
        )}
      </Fragment>
    )
  }

  msDigest(name) {
    return e => {
      window.msCrypto.subtle.digest(
        {
          name: 'SHA-256'
        },
        e.target.result
      ).oncomplete = e => {
        const sha256 = bytesToHexString(e.target.result)
        this.checkFile(name, sha256)
      }
    }
  }

  digest(name) {
    return e => {
      window.crypto.subtle
        .digest(
          {
            name: 'SHA-256'
          },
          e.target.result
        )
        .then(hash => {
          const sha256 = bytesToHexString(hash)
          this.checkFile(name, sha256)
        })
    }
  }

  dropHandler(evt) {
    this.dragLeave(evt)

    if (evt.dataTransfer.files && evt.dataTransfer.files.length === 0) {
      this.setState({ popupMsg: 'Please select a file' })
      return
    }

    const file = evt.dataTransfer.files[0]

    const name = file.name
    const reader = new FileReader()
    reader.onload = !isIE11 ? this.digest(name) : this.msDigest(name)

    reader.readAsArrayBuffer(file)
  }

  dragOver(evt) {
    noop(evt)
    this.setState({ dragging: true })
  }

  dragLeave(evt) {
    noop(evt)
    this.setState({ dragging: false })
  }

  render() {
    return (
      <Layout>
        <section id="verify">
          <div class="content-section">
            {this.state.popupMsg && (
              <Popup handleClose={() => this.setState({ popupMsg: null })}>
                {this.state.popupMsg}
              </Popup>
            )}
            <div
              class={`drag-drop-zone ${this.state.dragging ? 'dragging' : ''}`}
              onDrop={this.dropHandler.bind(this)}
              onDragOver={this.dragOver.bind(this)}
              onDragEnter={this.dragOver.bind(this)}
              onDragLeave={this.dragLeave.bind(this)}
              onDragEnd={this.dragLeave.bind(this)}
            >
              <p>Drag and drop your RuneLite launcher file here...</p>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  hashes: getHashes(state),
  fileNames: getFileNames(state)
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchHashes
    },
    dispatch
  )

const prepareComponentData = async ({ fetchHashes }) => {
  await fetchHashes()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(prepare(prepareComponentData)(Verify))
