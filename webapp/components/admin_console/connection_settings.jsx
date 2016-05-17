// Copyright (c) 2015 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import React from 'react';

import * as Utils from 'utils/utils.jsx';

import AdminSettings from './admin_settings.jsx';
import BooleanSetting from './boolean_setting.jsx';
import {FormattedMessage} from 'react-intl';
import SettingsGroup from './settings_group.jsx';
import TextSetting from './text_setting.jsx';

export default class ConnectionSettings extends AdminSettings {
    constructor(props) {
        super(props);

        this.getConfigFromState = this.getConfigFromState.bind(this);

        this.renderSettings = this.renderSettings.bind(this);

        this.state = Object.assign(this.state, {
            allowCorsFrom: props.config.ServiceSettings.AllowCorsFrom,
            enableInsecureOutgoingConnections: props.config.ServiceSettings.EnableInsecureOutgoingConnections
        });
    }

    getConfigFromState(config) {
        config.ServiceSettings.AllowCorsFrom = this.state.allowCorsFrom;
        config.ServiceSettings.EnableInsecureOutgoingConnections = this.state.enableInsecureOutgoingConnections;

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
                        id='admin.security.connection'
                        defaultMessage='Connections'
                    />
                }
            >
                <TextSetting
                    id='allowCorsFrom'
                    label={
                        <FormattedMessage
                            id='admin.service.corsTitle'
                            defaultMessage='Allow Cross-origin Requests from:'
                        />
                    }
                    placeholder={Utils.localizeMessage('admin.service.corsEx', 'http://example.com')}
                    helpText={
                        <FormattedMessage
                            id='admin.service.corsDescription'
                            defaultMessage='Enable HTTP Cross origin request from a specific domain. Use "*" if you want to allow CORS from any domain or leave it blank to disable it.'
                        />
                    }
                    value={this.state.allowCorsFrom}
                    onChange={this.handleChange}
                />
                <BooleanSetting
                    id='enableInsecureOutgoingConnections'
                    label={
                        <FormattedMessage
                            id='admin.service.insecureTlsTitle'
                            defaultMessage='Enable Insecure Outgoing Connections: '
                        />
                    }
                    helpText={
                        <FormattedMessage
                            id='admin.service.insecureTlsDesc'
                            defaultMessage='When true, any outgoing HTTPS requests will accept unverified, self-signed certificates. For example, outgoing webhooks to a server with a self-signed TLS certificate, using any domain, will be allowed. Note that this makes these connections susceptible to man-in-the-middle attacks.'
                        />
                    }
                    value={this.state.enableInsecureOutgoingConnections}
                    onChange={this.handleChange}
                />
            </SettingsGroup>
        );
    }
}