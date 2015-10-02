// Copyright (c) 2015 Spinpunch, Inc. All Rights Reserved.
// See License.txt for license information.

var UserProfile = require('./user_profile.jsx');
var PostInfo = require('./post_info.jsx');

export default class PostHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        var post = this.props.post;

        let userProfile = <UserProfile userId={post.user_id} />;
        if (post.props && post.props.override_username) {
            userProfile = (
                <UserProfile
                    userId={post.user_id}
                    overwriteName={post.props.override_username}
                    disablePopover={true}
                />
            );
        }

        return (
            <ul className='post-header post-header-post'>
                <li className='post-header-col post-header__name'><strong>{userProfile}</strong></li>
                <li className='post-info--hidden'>
                    <PostInfo
                        post={post}
                        commentCount={this.props.commentCount}
                        handleCommentClick={this.props.handleCommentClick}
                        allowReply='true'
                        isLastComment={this.props.isLastComment}
                    />
                </li>
            </ul>
        );
    }
}

PostHeader.defaultProps = {
    post: null,
    commentCount: 0,
    isLastComment: false
};
PostHeader.propTypes = {
    post: React.PropTypes.object,
    commentCount: React.PropTypes.number,
    isLastComment: React.PropTypes.bool,
    handleCommentClick: React.PropTypes.func
};
