// Copyright (c) 2015 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import React from 'react';

import AdminSettings from './admin_settings.jsx';
import BooleanSetting from './boolean_setting.jsx';
import {FormattedMessage} from 'react-intl';
import GeneratedSetting from './generated_setting.jsx';
import SettingsGroup from './settings_group.jsx';

export default class PublicLinkSettings extends AdminSettings {
    constructor(props) {
        super(props);

        this.getConfigFromState = this.getConfigFromState.bind(this);

        this.renderSettings = this.renderSettings.bind(this);

        this.state = Object.assign(this.state, {
            enablePublicLink: props.config.FileSettings.EnablePublicLink,
            publicLinkSalt: props.config.FileSettings.PublicLinkSalt
        });
    }

    getConfigFromState(config) {
        config.FileSettings.EnablePublicLink = this.state.enablePublicLink;
        config.FileSettings.PublicLinkSalt = this.state.publicLinkSalt;

        return config;
    }

    renderTitle() {
        return (
            <h3>
                <FormattedMessage
                    id='admin.security.title'
                    defaultMessage='Security Settings'
                />
            </h3>
        );
    }

    renderSettings() {
        return (
            <SettingsGroup
                header={
                    <FormattedMessage
                        id='admin.security.public_links'
                        defaultMessage='Public Links'
                    />
                }
            >
                <BooleanSetting
                    id='enablePublicLink'
                    label={
                        <FormattedMessage
                            id='admin.image.shareTitle'
                            defaultMessage='Share Public File Link: '
                        />
                    }
                    helpText={
                        <FormattedMessage
                            id='admin.image.shareDescription'
                            defaultMessage='Allow users to share public links to files and images.'
                        />
                    }
                    value={this.state.enablePublicLink}
                    onChange={this.handleChange}
                />
                <GeneratedSetting
                    id='publicLinkSalt'
                    label={
                        <FormattedMessage
                            id='admin.image.publicLinkTitle'
                            defaultMessage='Public Link Salt:'
                        />
                    }
                    helpText={
                        <FormattedMessage
                            id='admin.image.publicLinkDescription'
                            defaultMessage='32-character salt added to signing of public image links. Randomly generated on install. Click "Re-Generate" to create new salt.'
                        />
                    }
                    value={this.state.publicLinkSalt}
                    onChange={this.handleChange}
                />
            </SettingsGroup>
        );
    }
}