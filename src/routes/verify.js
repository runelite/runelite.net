import './verify.css'
import Layout from '../components/layout'
import hero from '../_data/hero'
import { h, Component, Fragment } from 'preact'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchHashes, getFileNames, getHashes } from '../modules/git'
import prepare from '../components/prepare'
import { digest } from '../util'
import Meta from '../components/meta'

const FILE_STATE = Object.freeze({
  NONE: Symbol('NONE'),
  LAUNCHER: Symbol('LAUNCHER'),
  SHORTCUT: Symbol('SHORTCUT'),
  INVALID: Symbol('INVALID'),
  VALID: Symbol('VALID')
})

// Hardcoded sha256sums of launcher executables and pre-installer launchers
const LAUNCHER_HASHES = [
  '020004743a7e0bf6d257ef0833b9ed229204a0112e80a05adfed36d73d7c3d5e',
  '07c658c06b48637409a27fa299dbb447ea2a047db46fa726ea208fda5b8e4cef',
  '2cea36b447a507c793367111a6d891de6fa028440daba22aa24a504034816fbd',
  '36da47090fa642a4ae9bdc28f7ba00fda16dbf363064c96a5132a3f00fe4685d',
  '3e4d8ba370c6369962279d88de7371f9a285a5c1eeced2f3f0507acd8265850a',
  '49ab6cb2e916b1dd62db1f52f1223bc47226a226abd7f1e3d0c9a34351eb23d0',
  '7b6a27fcae09b79db920a402be8d8f69249257b2cc491fb1372b2852aaf67341',
  '8715ddf633d4e4fe9f928cec84b20df1eedb630ef6e3b5d826039f3cbd9268a2',
  '8865dd1b9c902e89a1906159ed097242a49786652dc5a0407d8316e4ef56369b',
  '8edf21633c91a2a360cb3433f9322d3e3cd1fc2f198dc95f64d2e7ea8ff147e9',
  '9041dcc4ebeb326e02744e10391e90fe96d7fb56c9824fa283ec55321cf22455',
  '96bd4957980d4cebee1c5978ce301e5950a50a6dfb40f191d91bc61a6777cd20',
  'a202dea75936f16e11507ec6a666fc86c8d4ac9dec971be5930c470cd090bf23',
  'b590edee17e2a4236b5a179d35f5934ddf9c9075fb09e93a7408f63242394a5f',
  'bf7d1894f90d849619aab940c8d639340c2e745c1411e55d7735ac31398bc384'
]

const noop = e => {
  e.preventDefault()
  e.stopPropagation()
}

class Verify extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dragging: false,
      fileName: null,
      fileState: FILE_STATE.NONE
    }

    this.reset = this.reset.bind(this)
    this.inputHandler = this.inputHandler.bind(this)
    this.dropHandler = this.dropHandler.bind(this)
    this.dragOver = this.dragOver.bind(this)
    this.dragLeave = this.dragLeave.bind(this)
    this.checkFile = this.checkFile.bind(this)
    this.fileHandler = this.fileHandler.bind(this)
  }

  checkFile(sha256) {
    const name = this.state.fileName

    let fileState = FILE_STATE.INVALID
    if (name == null) {
      fileState = FILE_STATE.NONE
    } else if (name.match(/.*runelite.*\.lnk/i)) {
      fileState = FILE_STATE.SHORTCUT
    } else if (LAUNCHER_HASHES.includes(sha256)) {
      fileState = FILE_STATE.LAUNCHER
    } else if (!!this.props.hashes[sha256]) {
      fileState = FILE_STATE.VALID
    }

    this.setState({
      fileState
    })
  }

  reset() {
    this.setState({
      dragging: false,
      fileName: null,
      fileState: FILE_STATE.NONE
    })
  }

  fileHandler(files) {
    if (!files || files.length === 0) {
      this.reset()
      return
    }

    const file = files[0]

    this.setState({
      fileName: file.name
    })

    const reader = new FileReader()
    reader.onload = e => digest(e.target.result, this.checkFile)
    reader.readAsArrayBuffer(file)
    window.scrollTo(0, 0)
  }

  inputHandler(evt) {
    noop(evt)
    this.fileHandler(evt.target.files)
  }

  dropHandler(evt) {
    this.dragLeave(evt)
    this.fileHandler(evt.dataTransfer.files)
  }

  dragOver(evt) {
    noop(evt)
    this.setState({ dragging: true })
  }

  dragLeave(evt) {
    noop(evt)
    this.setState({ dragging: false })
  }

  createInput() {
    return (
      <Fragment>
        <div class="card-body">
          <div
            class={`drag-drop-zone ${this.state.dragging ? 'dragging' : ''}`}
            onDrop={this.dropHandler}
            onDragOver={this.dragOver}
            onDragEnter={this.dragOver}
            onDragLeave={this.dragLeave}
            onDragEnd={this.dragLeave}
          >
            <p>
              Drag and drop your RuneLite setup file here or manually select
              file below
            </p>
          </div>
        </div>
        <div class="card-footer">
          <div class="input-group mb-1">
            <div class="custom-file">
              <input
                type="file"
                class="custom-file-input"
                id="inputGroupFile"
                onChange={this.inputHandler}
                onClick={e => (e.target.value = '')}
                accept=".dmg,.jar,.exe,.AppImage"
              />
              <label class="custom-file-label" for="inputGroupFile">
                Choose file
              </label>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }

  createMsg(name, fileState) {
    if (fileState === FILE_STATE.NONE) {
      return null
    }

    if (fileState === FILE_STATE.VALID) {
      return (
        <Fragment>
          <div class="card-header bg-primary">
            <button class="btn btn-dark float-right" onClick={this.reset}>
              <i class="fa fa-fw fa-times" />
            </button>
          </div>
          <div class="card-body">
            <p class="text-center mt-5 mb-5">
              <h3>
                <i class="fa fa-fw fa-check-circle text-success" />{' '}
                <b>{name}</b> is from{' '}
                <a href="https://runelite.net">https://runelite.net</a>
              </h3>
            </p>
          </div>
        </Fragment>
      )
    }

    if (fileState === FILE_STATE.SHORTCUT) {
      return (
        <Fragment>
          <div class="card-header bg-warning">
            <button class="btn btn-dark float-right" onClick={this.reset}>
              <i class="fa fa-fw fa-times" />
            </button>
          </div>
          <div class="card-body text-center">
            <p>
              <b>{name}</b> is the desktop shortcut for RuneLite.
            </p>
            <p>Please drag and drop the setup file that you downloaded.</p>
          </div>
        </Fragment>
      )
    }

    if (fileState === FILE_STATE.LAUNCHER) {
      return (
        <Fragment>
          <div class="card-header bg-warning">
            <button class="btn btn-dark float-right" onClick={this.reset}>
              <i class="fa fa-fw fa-times" />
            </button>
          </div>
          <div class="card-body text-center">
            <p>
              <b>{name}</b> is the launcher for RuneLite.
            </p>
            <p>Please drag and drop the setup file that you downloaded.</p>
          </div>
        </Fragment>
      )
    }

    return (
      <Fragment>
        <div class="card-header bg-danger">
          <button class="btn btn-dark float-right" onClick={this.reset}>
            <i class="fa fa-fw fa-times" />
          </button>
        </div>
        <div class="card-body">
          <p class="text-center mt-5 mb-5">
            <h3>
              <i class="fa fa-fw fa-times-circle text-danger" /> <b>{name}</b>{' '}
              is not from{' '}
              <a href="https://runelite.net">https://runelite.net</a>
            </h3>
          </p>

          {name.match(/.*runelite.*(dmg|jar|exe|appimage)/i) && (
            <>
              <h5>
                You've downloaded a fake client, and your account has been
                compromised. Remove the fake as soon as possible to minimise
                further damage.
              </h5>
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
                You might also want to change any email password if you reused
                the same as your RuneScape account password.
              </p>

              <p>
                Once your computer is secure, you should download RuneLite from{' '}
                <a href="https://runelite.net">https://runelite.net</a>.
              </p>
            </>
          )}
        </div>
      </Fragment>
    )
  }

  render() {
    return (
      <Layout>
        <Meta
          title={`Verify RuneLite setup - ${hero.title}`}
          description="Verify your RuneLite setup files here"
        />
        <section id="verify" class="dark-card">
          <div class="content-section">
            <div class="card mb-3">
              {this.createMsg(this.state.fileName, this.state.fileState)}
            </div>
            <div class="card">{this.createInput()}</div>
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
