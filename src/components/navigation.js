import React from 'react'
import { NavLink as ActiveLink } from 'redux-first-router-link'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import hero from '../_data/hero'
import links from '../_data/links'
import {stargazersSelector} from '../redux/modules/git'
import {connect} from 'react-redux'

class Navigation extends React.Component {
  constructor (props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = { isOpen: false }
  }

  toggle () {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render () {
    return (
      <Navbar color='white' light expand='md' fixed='top'>
        <NavbarBrand tag={ActiveLink} to='/'><img src={hero.logo} alt='Logo' width='30' height='30' /> Home</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink tag={ActiveLink} to='/features'><i className='fas fa-cogs' /> Features</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ActiveLink} to='/blog'><i className='fas fa-newspaper' /> Blog</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='https://github.com/runelite/runelite/wiki'><i className='fas fa-file-alt' /> Wiki</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret><i className='fas fa-font' /> API</DropdownToggle>
              <DropdownMenu >
                <DropdownItem href='https://static.runelite.net/api/runelite-api/'>RuneLite API</DropdownItem>
                <DropdownItem href='https://static.runelite.net/api/runelite-client/'>RuneLite Client API</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink href={links.discord}><i className='fab fa-discord' /> Discord</NavLink>
            </NavItem>
          </Nav>
          <Nav navbar className='ml-auto'>
            <NavItem>
              <NavLink href={links.patreon}><i className='fab fa-patreon' /> Become a patron</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='https://github.com/runelite'><i className='fab fa-github' /> GitHub</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='https://github.com/runelite/runelite/stargazers'>
                <i className='fas fa-star' /> {this.props.stars} Stargazers
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

export default connect(
  (state, props) => ({
    stars: stargazersSelector(state, props)
  })
)(Navigation)
