// Copyright (c) 2015 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

const NavbarDropdown = require('./navbar_dropdown.jsx');
const TutorialTip = require('./tutorial/tutorial_tip.jsx');

const UserStore = require('../stores/user_store.jsx');
const PreferenceStore = require('../stores/preference_store.jsx');

const Utils = require('../utils/utils.jsx');
const Constants = require('../utils/constants.jsx');
const Preferences = Constants.Preferences;
const TutorialSteps = Constants.TutorialSteps;

const Tooltip = ReactBootstrap.Tooltip;
const OverlayTrigger = ReactBootstrap.OverlayTrigger;

export default class SidebarHeader extends React.Component {
    constructor(props) {
        super(props);

        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.onPreferenceChange = this.onPreferenceChange.bind(this);

        this.state = this.getStateFromStores();
    }
    componentDidMount() {
        PreferenceStore.addChangeListener(this.onPreferenceChange);
    }
    componentWillUnmount() {
        PreferenceStore.removeChangeListener(this.onPreferenceChange);
    }
    getStateFromStores() {
        const tutorialPref = PreferenceStore.getPreference(Preferences.TUTORIAL_STEP, UserStore.getCurrentId(), {value: '0'});

        return {showTutorialTip: parseInt(tutorialPref.value, 10) === TutorialSteps.MENU_POPOVER};
    }
    onPreferenceChange() {
        this.setState(this.getStateFromStores());
    }
    toggleDropdown(e) {
        e.preventDefault();
        if (this.refs.dropdown.blockToggle) {
            this.refs.dropdown.blockToggle = false;
            return;
        }
        console.log(this.refs.tip);
        this.refs.tip.toggle();
        $('.team__header').find('.dropdown-toggle').dropdown('toggle');
    }
    createTutorialTip() {
        const screens = [];

        let teamSettingsLink = <strong>{'Team Settings'}</strong>;
        if (Utils.isAdmin(UserStore.getCurrentUser().roles)) {
            teamSettingsLink = (
                <a
                    href='#'
                    data-toggle='modal'
                    data-target='#team_settings'
                >
                    {'Team Settings'}
                </a>
            );
        }

        screens.push(
            <div>
                <h4><strong>{'Sending Messages'}</strong></h4>
                {'The '}<strong>{'Main Menu'}</strong>{' is where you can '}
                <a
                    href='#'
                    data-toggle='modal'
                    data-target='#invite_member'
                >
                    {'Invite New Members'}
                </a>
                {', access your '}
                <a
                    href='#'
                    data-toggle='modal'
                    data-target='#user_settings'
                >
                    {'Account Settings'}
                </a>
                {', and set your '}<strong>{'Theme Color'}</strong>{'.'}
                <br/><br/>
                {'Team administrators can also access their '}{teamSettingsLink}{' from this menu.'}
            </div>
        );

        return (
            <div
                onClick={this.toggleDropdown}
            >
                <TutorialTip
                    ref='tip'
                    placement='right'
                    screens={screens}
                />
            </div>
        );
    }
    render() {
        var me = UserStore.getCurrentUser();
        var profilePicture = null;

        if (!me) {
            return null;
        }

        if (me.last_picture_update) {
            profilePicture = (
                <img
                    className='user__picture'
                    src={'/api/v1/users/' + me.id + '/image?time=' + me.update_at + '&' + Utils.getSessionIndex()}
                />
            );
        }

        let tutorialTip = null;
        if (this.state.showTutorialTip) {
            tutorialTip = this.createTutorialTip();
        }

        return (
            <div className='team__header theme'>
                {tutorialTip}
                <a
                    href='#'
                    onClick={this.toggleDropdown}
                >
                    {profilePicture}
                    <div className='header__info'>
                        <div className='user__name'>{'@' + me.username}</div>
                        <OverlayTrigger
                            trigger={['hover', 'focus']}
                            delayShow={1000}
                            placement='bottom'
                            overlay={<Tooltip id='team-name__tooltip'>{this.props.teamDisplayName}</Tooltip>}
                            ref='descriptionOverlay'
                        >
                        <div className='team__name'>{this.props.teamDisplayName}</div>
                        </OverlayTrigger>
                    </div>
                </a>
                <NavbarDropdown
                    ref='dropdown'
                    teamType={this.props.teamType}
                    teamDisplayName={this.props.teamDisplayName}
                    teamName={this.props.teamName}
                />
            </div>
        );
    }
}

SidebarHeader.defaultProps = {
    teamDisplayName: global.window.mm_config.SiteName,
    teamType: ''
};
SidebarHeader.propTypes = {
    teamDisplayName: React.PropTypes.string,
    teamName: React.PropTypes.string,
    teamType: React.PropTypes.string
};
