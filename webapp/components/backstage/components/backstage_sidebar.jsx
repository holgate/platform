// Copyright (c) 2016 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import React from 'react';

import TeamStore from 'stores/team_store.jsx';

import BackstageCategory from './backstage_category.jsx';
import BackstageSection from './backstage_section.jsx';
import {FormattedMessage} from 'react-intl';

export default class BackstageSidebar extends React.Component {
    static get propTypes() {
        return {
            team: React.PropTypes.object.isRequired,
            user: React.PropTypes.object.isRequired
        };
    }

    renderCustomEmoji() {
        if (window.mm_config.EnableCustomEmoji !== 'true') {
            return null;
        }

        return (
            <BackstageCategory
                name='emoji'
                parentLink={'/' + this.props.team.name}
                icon='fa-smile-o'
                title={
                    <FormattedMessage
                        id='backstage_sidebar.emoji'
                        defaultMessage='Custom Emoji'
                    />
                }
            />
        );
    }

    renderIntegrations() {
        if (window.mm_config.EnableIncomingWebhooks !== 'true' &&
            window.mm_config.EnableOutgoingWebhooks !== 'true' &&
            window.mm_config.EnableCommands !== 'true') {
            return null;
        }

        if (window.mm_config.RestrictCustomEmojiCreation !== 'all' && !TeamStore.isTeamAdmin(this.props.user.id, this.props.team.id)) {
            return null;
        }

        let incomingWebhooks = null;
        if (window.mm_config.EnableIncomingWebhooks === 'true') {
            incomingWebhooks = (
                <BackstageSection
                    name='incoming_webhooks'
                    title={(
                        <FormattedMessage
                            id='backstage_sidebar.integrations.incoming_webhooks'
                            defaultMessage='Incoming Webhooks'
                        />
                    )}
                />
            );
        }

        let outgoingWebhooks = null;
        if (window.mm_config.EnableOutgoingWebhooks === 'true') {
            outgoingWebhooks = (
                <BackstageSection
                    name='outgoing_webhooks'
                    title={(
                        <FormattedMessage
                            id='backstage_sidebar.integrations.outgoing_webhooks'
                            defaultMessage='Outgoing Webhooks'
                        />
                    )}
                />
            );
        }

        let commands = null;
        if (window.mm_config.EnableCommands === 'true') {
            commands = (
                <BackstageSection
                    name='commands'
                    title={(
                        <FormattedMessage
                            id='backstage_sidebar.integrations.commands'
                            defaultMessage='Slash Commands'
                        />
                    )}
                />
            );
        }

        return (
            <BackstageCategory
                name='integrations'
                parentLink={'/' + this.props.team.name}
                icon='fa-link'
                title={
                    <FormattedMessage
                        id='backstage_sidebar.integrations'
                        defaultMessage='Integrations'
                    />
                }
            >
                {incomingWebhooks}
                {outgoingWebhooks}
                {commands}
            </BackstageCategory>
        );
    }

    render() {
        return (
            <div className='backstage-sidebar'>
                <ul>
                    {this.renderCustomEmoji()}
                    {this.renderIntegrations()}
                </ul>
            </div>
        );
    }
}
