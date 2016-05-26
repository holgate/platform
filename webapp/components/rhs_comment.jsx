// Copyright (c) 2015 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import UserProfile from './user_profile.jsx';
import FileAttachmentList from './file_attachment_list.jsx';
import PendingPostActions from './pending_post_actions.jsx';

import TeamStore from 'stores/team_store.jsx';
import UserStore from 'stores/user_store.jsx';

import * as GlobalActions from 'actions/global_actions.jsx';

import * as TextFormatting from 'utils/text_formatting.jsx';
import * as Utils from 'utils/utils.jsx';
import Client from 'utils/web_client.jsx';

import Constants from 'utils/constants.jsx';

import {FormattedMessage, FormattedDate} from 'react-intl';

import loadingGif from 'images/load.gif';

import React from 'react';

export default class RhsComment extends React.Component {
    constructor(props) {
        super(props);

        this.handlePermalink = this.handlePermalink.bind(this);

        this.state = {};
    }
    handlePermalink(e) {
        e.preventDefault();
        GlobalActions.showGetPostLinkModal(this.props.post);
    }
    shouldComponentUpdate(nextProps) {
        if (!Utils.areObjectsEqual(nextProps.post, this.props.post)) {
            return true;
        }

        return false;
    }
    createDropdown() {
        var post = this.props.post;

        if (post.state === Constants.POST_FAILED || post.state === Constants.POST_LOADING || post.state === Constants.POST_DELETED) {
            return '';
        }

        const isOwner = this.props.currentUser.id === post.user_id;
        var isAdmin = TeamStore.isTeamAdminForCurrentTeam() || UserStore.isSystemAdminForCurrentUser();
        const isSystemMessage = post.type && post.type.startsWith(Constants.SYSTEM_MESSAGE_PREFIX);

        var dropdownContents = [];

        if (!Utils.isMobile()) {
            dropdownContents.push(
                <li
                    key='rhs-root-permalink'
                    role='presentation'
                >
                    <a
                        href='#'
                        onClick={this.handlePermalink}
                    >
                        <FormattedMessage
                            id='rhs_comment.permalink'
                            defaultMessage='Permalink'
                        />
                    </a>
                </li>
            );
        }

        if (isOwner && !isSystemMessage) {
            dropdownContents.push(
                <li
                    role='presentation'
                    key='edit-button'
                >
                    <a
                        href='#'
                        role='menuitem'
                        data-toggle='modal'
                        data-target='#edit_post'
                        data-refocusid='#reply_textbox'
                        data-title={Utils.localizeMessage('rhs_comment.comment', 'Comment')}
                        data-message={post.message}
                        data-postid={post.id}
                        data-channelid={post.channel_id}
                    >
                        <FormattedMessage
                            id='rhs_comment.edit'
                            defaultMessage='Edit'
                        />
                    </a>
                </li>
            );
        }

        if (isOwner || isAdmin) {
            dropdownContents.push(
                <li
                    role='presentation'
                    key='delete-button'
                >
                    <a
                        href='#'
                        role='menuitem'
                        onClick={() => GlobalActions.showDeletePostModal(post, 0)}
                    >
                        <FormattedMessage
                            id='rhs_comment.del'
                            defaultMessage='Delete'
                        />
                    </a>
                </li>
            );
        }

        if (dropdownContents.length === 0) {
            return '';
        }

        return (
            <div className='dropdown'>
                <a
                    href='#'
                    className='post__dropdown dropdown-toggle'
                    type='button'
                    data-toggle='dropdown'
                    aria-expanded='false'
                />
                <ul
                    className='dropdown-menu'
                    role='menu'
                >
                    {dropdownContents}
                </ul>
            </div>
            );
    }
    render() {
        var post = this.props.post;

        var currentUserCss = '';
        if (this.props.currentUser === post.user_id) {
            currentUserCss = 'current--user';
        }

        var timestamp = this.props.currentUser.update_at;

        let loading;
        let postClass = '';
        let message = (
            <div
                ref='message_holder'
                onClick={TextFormatting.handleClick}
                dangerouslySetInnerHTML={{__html: TextFormatting.formatText(post.message)}}
            />
        );

        if (post.state === Constants.POST_FAILED) {
            postClass += ' post-fail';
            loading = <PendingPostActions post={this.props.post}/>;
        } else if (post.state === Constants.POST_LOADING) {
            postClass += ' post-waiting';
            loading = (
                <img
                    className='post-loading-gif pull-right'
                    src={loadingGif}
                />
            );
        } else if (this.props.post.state === Constants.POST_DELETED) {
            message = (
                <FormattedMessage
                    id='post_body.deleted'
                    defaultMessage='(message deleted)'
                />
            );
        }

        var dropdown = this.createDropdown();

        var fileAttachment;
        if (post.filenames && post.filenames.length > 0) {
            fileAttachment = (
                <FileAttachmentList
                    filenames={post.filenames}
                    channelId={post.channel_id}
                    userId={post.user_id}
                />
            );
        }

        return (
            <div className={'post ' + currentUserCss}>
                <div className='post__content'>
                    <div className='post__img'>
                        <img
                            src={Client.getUsersRoute() + '/' + post.user_id + '/image?time=' + timestamp}
                            height='36'
                            width='36'
                        />
                    </div>
                    <div>
                        <ul className='post__header'>
                            <li className='col__name'>
                                <strong><UserProfile user={this.props.user}/></strong>
                            </li>
                            <li className='col'>
                                <time className='post__time'>
                                    <FormattedDate
                                        value={post.create_at}
                                        day='numeric'
                                        month='long'
                                        year='numeric'
                                        hour12={!Utils.isMilitaryTime()}
                                        hour='2-digit'
                                        minute='2-digit'
                                    />
                                </time>
                            </li>
                            <li className='col col__reply'>
                                {dropdown}
                            </li>
                        </ul>
                        <div className='post__body'>
                            <div className={postClass}>
                                {loading}
                                {message}
                            </div>
                            {fileAttachment}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

RhsComment.propTypes = {
    post: React.PropTypes.object,
    user: React.PropTypes.object.isRequired,
    currentUser: React.PropTypes.object.isRequired
};
