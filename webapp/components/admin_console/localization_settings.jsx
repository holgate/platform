// Copyright (c) 2015 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import React from 'react';

import * as I18n from 'i18n/i18n.jsx';

import AdminSettings from './admin_settings.jsx';
import {FormattedMessage} from 'react-intl';
import SettingsGroup from './settings_group.jsx';
import DropdownSetting from './dropdown_setting.jsx';
import MultiSelectSetting from './multiselect_settings.jsx';

export default class LocalizationSettings extends AdminSettings {
    constructor(props) {
        super(props);

        this.getConfigFromState = this.getConfigFromState.bind(this);

        this.renderSettings = this.renderSettings.bind(this);
        this.canSave = this.canSave.bind(this);

        const locales = I18n.getAllLanguages();

        this.state = Object.assign(this.state, {
            hasErrors: false,
            defaultServerLocale: props.config.LocalizationSettings.DefaultServerLocale,
            defaultClientLocale: props.config.LocalizationSettings.DefaultClientLocale,
            availableLocales: props.config.LocalizationSettings.AvailableLocales ? props.config.LocalizationSettings.AvailableLocales.split(',') : [],
            languages: Object.keys(locales).map((l) => {
                return {value: locales[l].value, text: locales[l].name};
            })
        });
    }

    canSave() {
        return this.state.availableLocales.join(',').indexOf(this.state.defaultClientLocale) !== -1 || this.state.availableLocales.length === 0;
    }

    getConfigFromState(config) {
        config.LocalizationSettings.DefaultServerLocale = this.state.defaultServerLocale;
        config.LocalizationSettings.DefaultClientLocale = this.state.defaultClientLocale;
        config.LocalizationSettings.AvailableLocales = this.state.availableLocales.join(',');

        return config;
    }

    renderTitle() {
        return (
            <h3>
                <FormattedMessage
                    id='admin.general.title'
                    defaultMessage='General Settings'
                />
            </h3>
        );
    }

    renderSettings() {
        return (
            <SettingsGroup
                header={
                    <FormattedMessage
                        id='admin.general.localization'
                        defaultMessage='Localization'
                    />
                }
            >
                <DropdownSetting
                    id='defaultServerLocale'
                    values={this.state.languages}
                    label={
                        <FormattedMessage
                            id='admin.general.localization.serverLocaleTitle'
                            defaultMessage='Default Server Language:'
                        />
                    }
                    value={this.state.defaultServerLocale}
                    onChange={this.handleChange}
                    helpText={
                        <FormattedMessage
                            id='admin.general.localization.serverLocaleDescription'
                            defaultMessage='Default language for system messages and logs. Changing this will require a server restart before taking effect.'
                        />
                    }
                />
                <DropdownSetting
                    id='defaultClientLocale'
                    values={this.state.languages}
                    label={
                        <FormattedMessage
                            id='admin.general.localization.clientLocaleTitle'
                            defaultMessage='Default Client Language:'
                        />
                    }
                    value={this.state.defaultClientLocale}
                    onChange={this.handleChange}
                    helpText={
                        <FormattedMessage
                            id='admin.general.localization.clientLocaleDescription'
                            defaultMessage="Default language for newly created users and pages where the user hasn't logged in."
                        />
                    }
                />
                <MultiSelectSetting
                    id='availableLocales'
                    values={this.state.languages}
                    label={
                        <FormattedMessage
                            id='admin.general.localization.availableLocalesTitle'
                            defaultMessage='Available Languages:'
                        />
                    }
                    selected={this.state.availableLocales}
                    onChange={this.handleChange}
                    helpText={
                        <FormattedMessage
                            id='admin.general.localization.availableLocalesDescription'
                            defaultMessage='Determines which languages are available for users in Account Settings. (Leave it blank to have all supported languages available)'
                        />
                    }
                    noResultText={
                        <FormattedMessage
                            id='admin.general.localization.availableLocalesNoResults'
                            defaultMessage='No results found'
                        />
                    }
                    notPresent={
                        <FormattedMessage
                            id='admin.general.localization.availableLocalesNotPresent'
                            defaultMessage='The default client language must be included in the available list'
                        />
                    }
                />
            </SettingsGroup>
        );
    }
}
