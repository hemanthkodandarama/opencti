import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { AccountCircle } from '@material-ui/icons';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import logo from '../../../resources/images/logo.png';
import inject18n from '../../../components/i18n';
import SearchInput from '../../../components/SearchInput';
import TopMenuDashboard from './TopMenuDashboard';
import TopMenuSearch from './TopMenuSearch';
import TopMenuExplore from './TopMenuExplore';
import TopMenuWorkspaces from './TopMenuWorkspaces';
import TopMenuWorkspace from './TopMenuWorkspace';
import TopMenuKnowledge from './TopMenuKnowledge';
import TopMenuThreatActor from './TopMenuThreatActor';
import TopMenuSector from './TopMenuSector';
import TopMenuIntrusionSet from './TopMenuIntrusionSet';
import TopMenuCampaign from './TopMenuCampaign';
import TopMenuIncident from './TopMenuIncident';
import TopMenuMalware from './TopMenuMalware';
import TopMenuReports from './TopMenuReports';
import TopMenuReport from './TopMenuReport';
import TopMenuCatalogs from './TopMenuCatalogs';
import TopMenuAttackPattern from './TopMenuAttackPattern';
import TopMenuTool from './TopMenuTool';
import TopMenuVulnerability from './TopMenuVulnerability';
import TopMenuSources from './TopMenuSources';
import TopMenuSettings from './TopMenuSettings';
import TopMenuProfile from './TopMenuProfile';
import { commitMutation } from '../../../relay/environment';

const styles = theme => ({
  appBar: {
    width: '100%',
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.header.background,
    color: theme.palette.header.text,
  },
  flex: {
    flexGrow: 1,
  },
  logoButton: {
    marginLeft: -23,
    marginRight: 20,
  },
  logo: {
    cursor: 'pointer',
    width: 35,
    height: 35,
  },
  progressBar: {
    height: 2,
  },
  menuContainer: {
    float: 'left',
  },
  searchContainer: {
    position: 'absolute',
    right: 80,
    top: 15,
  },
  menuButton: {
    position: 'absolute',
    right: 5,
    top: 0,
  },
});

const logoutMutation = graphql`
  mutation TopBarLogoutMutation {
    logout
  }
`;

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = { menuOpen: false };
  }

  handleOpenMenu(event) {
    event.preventDefault();
    this.setState({ menuOpen: true, anchorEl: event.currentTarget });
  }

  handleCloseMenu() {
    this.setState({ menuOpen: false });
  }

  handleLogout() {
    commitMutation({
      mutation: logoutMutation,
      variables: {},
      onCompleted: () => {
        this.props.history.push('/login');
      },
    });
  }

  handleSearch(keyword) {
    if (keyword.length > 0) {
      this.props.history.push(`/dashboard/search/${keyword}`);
    }
  }

  render() {
    const {
      t,
      classes,
      location,
      keyword,
    } = this.props;
    return (
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton classes={{ root: classes.logoButton }} color='inherit' aria-label='Menu' component={Link} to='/dashboard'>
            <img src={logo} alt='logo' className={classes.logo}/>
          </IconButton>
          <div className={classes.menuContainer}>
            {location.pathname === '/dashboard' || location.pathname === '/dashboard/entities' ? <TopMenuDashboard/> : ''}
            {location.pathname.includes('/dashboard/search/') ? <TopMenuSearch/> : ''}
            {location.pathname.includes('/dashboard/explore') ? <TopMenuExplore/> : ''}
            {location.pathname === '/dashboard/investigate' ? <TopMenuWorkspaces/> : ''}
            {location.pathname.includes('/dashboard/investigate/') ? <TopMenuWorkspace/> : ''}
            {location.pathname === '/dashboard/knowledge' || location.pathname.match('/dashboard/knowledge/[a-z_]+$') ? <TopMenuKnowledge/> : ''}
            {location.pathname.includes('/dashboard/knowledge/threat_actors/') ? <TopMenuThreatActor/> : ''}
            {location.pathname.includes('/dashboard/knowledge/sectors/') ? <TopMenuSector/> : ''}
            {location.pathname.includes('/dashboard/knowledge/intrusion_sets/') ? <TopMenuIntrusionSet/> : ''}
            {location.pathname.includes('/dashboard/knowledge/campaigns/') ? <TopMenuCampaign/> : ''}
            {location.pathname.includes('/dashboard/knowledge/incidents/') ? <TopMenuIncident/> : ''}
            {location.pathname.includes('/dashboard/knowledge/malwares/') ? <TopMenuMalware/> : ''}
            {location.pathname === '/dashboard/reports' || location.pathname.match('/dashboard/reports/[a-z_]+$') ? <TopMenuReports/> : ''}
            {location.pathname.includes('/dashboard/reports/all/') ? <TopMenuReport/> : ''}
            {location.pathname === '/dashboard/catalogs' || location.pathname.match('/dashboard/catalogs/[a-z_]+$') ? <TopMenuCatalogs/> : ''}
            {location.pathname.includes('/dashboard/catalogs/attack_patterns/') ? <TopMenuAttackPattern/> : ''}
            {location.pathname.includes('/dashboard/catalogs/tools/') ? <TopMenuTool/> : ''}
            {location.pathname.includes('/dashboard/catalogs/vulnerabilities/') ? <TopMenuVulnerability/> : ''}
            {location.pathname === '/dashboard/sources' || location.pathname.match('/dashboard/sources/[a-z_]+$') ? <TopMenuSources/> : ''}
            {location.pathname === '/dashboard/settings' || location.pathname.match('/dashboard/settings/[a-z_]+$') ? <TopMenuSettings/> : ''}
            {location.pathname === '/dashboard/profile' ? <TopMenuProfile/> : ''}
          </div>
          <div className={classes.searchContainer}>
            <SearchInput onSubmit={this.handleSearch.bind(this)} keyword={keyword}/>
          </div>
          <IconButton size='large' classes={{ root: classes.menuButton }} aria-owns={this.state.open ? 'menu-appbar' : null}
                      aria-haspopup='true' onClick={this.handleOpenMenu.bind(this)} color='inherit'>
            <AccountCircle color='inherit' style={{ fontSize: 35 }}/>
          </IconButton>
          <Menu
            id='menu-appbar'
            style={{ marginTop: 40, zIndex: 2100 }}
            anchorEl={this.state.anchorEl}
            open={this.state.menuOpen}
            onClose={this.handleCloseMenu.bind(this)}>
            <MenuItem component={Link} to='/dashboard/profile' onClick={this.handleCloseMenu.bind(this)}>{t('Profile')}</MenuItem>
            <MenuItem onClick={this.handleLogout.bind(this)}>{t('Logout')}</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    );
  }
}

TopBar.propTypes = {
  keyword: PropTypes.string,
  me: PropTypes.object,
  classes: PropTypes.object,
  location: PropTypes.object,
  t: PropTypes.func,
  history: PropTypes.object,
};

const TopBarFragment = createFragmentContainer(TopBar, {
  me: graphql`
      fragment TopBar_me on User {
          email
      }
  `,
});

export default compose(
  inject18n,
  withRouter,
  withStyles(styles),
)(TopBarFragment);
