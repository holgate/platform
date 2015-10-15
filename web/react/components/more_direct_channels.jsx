// Copyright (c) 2015 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

const AsyncClient = require('../utils/async_client.jsx');
const ChannelStore = require('../stores/channel_store.jsx');
const Constants = require('../utils/constants.jsx');
const Client = require('../utils/client.jsx');
const Modal = ReactBootstrap.Modal;
const PreferenceStore = require('../stores/preference_store.jsx');
const TeamStore = require('../stores/team_store.jsx');
const UserStore = require('../stores/user_store.jsx');
const Utils = require('../utils/utils.jsx');

export default class MoreDirectChannels extends React.Component {
    constructor(props) {
        super(props);

        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.handleShowDirectChannel = this.handleShowDirectChannel.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);

        this.createRowForUser = this.createRowForUser.bind(this);

        this.state = {
            users: this.getUsersFromStore(),
            filter: '',
            loadingDMChannel: -1
        };
    }

    getUsersFromStore() {
        const currentId = UserStore.getCurrentId();
        const profiles = UserStore.getProfiles();
        const users = [];

        for (const id in profiles) {
            if (id !== currentId) {
                users.push(profiles[id]);
            }
        }

        users.sort((a, b) => a.username.localeCompare(b.username));

        return users;
    }

    componentDidMount() {
        UserStore.addChangeListener(this.handleUserChange);
    }

    componentWillUnmount() {
        UserStore.addChangeListener(this.handleUserChange);
    }

    handleFilterChange() {
        const filter = ReactDOM.findDOMNode(this.refs.filter).value;

        if (filter !== this.state.filter) {
            this.setState({filter});
        }
    }

    handleHide() {
        if (this.props.onModalDismissed) {
            this.props.onModalDismissed();
        }

        this.setState({filter: ''});
    }

    handleShowDirectChannel(teammate, e) {
        if (this.state.loadingDMChannel !== -1) {
            return;
        }

        e.preventDefault();

        const channelName = Utils.getDirectChannelName(UserStore.getCurrentId(), teammate.id);
        let channel = ChannelStore.getByName(channelName);

        const preference = PreferenceStore.setPreference(Constants.Preferences.CATEGORY_DIRECT_CHANNEL_SHOW, teammate.id, 'true');
        AsyncClient.savePreferences([preference]);

        if (channel) {
            Utils.switchChannel(channel);

            this.handleHide();
        } else {
            this.setState({loadingDMChannel: teammate.id});

            channel = {
                name: channelName,
                last_post_at: 0,
                total_msg_count: 0,
                type: 'D',
                display_name: teammate.username,
                teammate_id: teammate.id,
                status: UserStore.getStatus(teammate.id)
            };

            Client.createDirectChannel(
                channel,
                teammate.id,
                (data) => {
                    this.setState({loadingDMChannel: -1});

                    AsyncClient.getChannel(data.id);
                    Utils.switchChannel(data);

                    this.handleHide();
                },
                () => {
                    this.setState({loadingDMChannel: -1});
                    window.location.href = TeamStore.getCurrentTeamUrl() + '/channels/' + channelName;
                }
            );
        }
    }

    handleUserChange() {
        this.setState({users: this.getUsersFromStore()});
    }

    createRowForUser(user) {
        const details = [];

        const fullName = Utils.getFullName(user);
        if (fullName) {
            details.push(
                <span
                    key={`${user.id}__full-name`}
                    className='full-name'
                >
                    {fullName}
                </span>
            );
        }

        if (user.nickname) {
            const separator = fullName ? ' - ' : '';
            details.push(
                <span
                    key={`${user.nickname}__nickname`}
                    className='nickname'
                >
                    {separator + user.nickname}
                </span>
            );
        }

        let joinButton;
        if (this.state.loadingDMChannel === user.id) {
            joinButton = (
                <img
                    className='channel-loading-gif'
                    src='/static/images/load.gif'
                />
            );
        } else {
            joinButton = (
                <button
                    type='button'
                    className='btn btn-primary btn-message'
                    onClick={this.handleShowDirectChannel.bind(this, user)}
                >
                    {'Message'}
                </button>
            );
        }

        return (
            <li
                key={user.id}
                className='direct-channel'
            >
                <div className='col-xs-1 image-div'>
                    <img
                        className='profile-image'
                        src={`/api/v1/users/${user.id}/image?time=${user.update_at}`}
                    />
                </div>
                <div className='col-xs-9'>
                    <div className='username'>
                        {user.username}
                    </div>
                    <div>
                        {details}
                    </div>
                </div>
                <div className='col-xs-2 btn-div'>
                    {joinButton}
                </div>
            </li>
        );
    }

    render() {
        if (!this.props.show) {
            return null;
        }

        let users = this.state.users;
        if (this.state.filter !== '') {
            users = users.filter((user) => {
                return user.username.indexOf(this.state.filter) !== -1 ||
                    user.first_name.indexOf(this.state.filter) !== -1 ||
                    user.last_name.indexOf(this.state.filter) !== -1 ||
                    user.nickname.indexOf(this.state.filter) !== -1;
            });
        }

        const userEntries = users.map(this.createRowForUser);

        if (userEntries.length === 0) {
            userEntries.push(<li key='no-users-found'>{'No users found :('}</li>);
        }

        let memberString = 'Member';
        if (users.length !== 1) {
            memberString += 's';
        }

        let count;
        if (users.length === this.state.users.length) {
            count = `${users.length} ${memberString}`;
        } else {
            count = `${users.length} ${memberString} of ${this.state.users.length} Total`;
        }

        return (
            <Modal
                className='modal-direct-channels'
                show={this.props.show}
                bsSize='large'
                onHide={this.handleHide}
            >
                <Modal.Header closeButton={true}>
                    <Modal.Title>{'More Direct Messages'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <input
                            ref='filter'
                            className='form-control filter-textbox'
                            placeholder='Search members'
                            onInput={this.handleFilterChange}
                            style={{width: '200px', display: 'inline'}}
                        />
                        <span className='member-count pull-right'>{count}</span>
                    </div>
                    <ul className='user-list'>
                        {userEntries}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type='button'
                        className='btn btn-default'
                        onClick={this.handleHide}
                    >
                        {'Close'}
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

MoreDirectChannels.propTypes = {
    show: React.PropTypes.bool.isRequired,
    onModalDismissed: React.PropTypes.func
};
