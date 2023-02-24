import {Component} from 'react'
import {v4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {
    username: '',
    comment: '',
    commentsList: [],
  }

  deleteComment = commentId => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  renderCommentsList = () => {
    const {commentsList} = this.state

    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {username, comment} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: v4(),
      name: username,
      comment,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      username: '',
      comment: '',
    }))
  }

  onChangeCommentInput = event => {
    this.setState({
      comment: event.target.value,
    })
  }

  onChangeNameInput = event => {
    this.setState({
      username: event.target.value,
    })
  }

  render() {
    const {username, comment, commentsList} = this.state

    return (
      <div className="background">
        <h1 className="heading">Comments</h1>
        <div className="container">
          <form className="form" onSubmit={this.onAddComment}>
            <p className="about">Say something about 4.0 Technologies</p>
            <div className="input-container">
              <input
                type="text"
                className="user-name"
                placeholder="Your Name"
                onChange={this.onChangeNameInput}
                value={username}
              />
              <textarea
                className="comment"
                rows="20"
                cols="50"
                placeholder="Your Comment"
                onChange={this.onChangeCommentInput}
                value={comment}
              />
            </div>
            <button className="add-btn" type="submit">
              Add Comment
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            className="comments-img"
            alt="comments"
          />
        </div>
        <hr className="horizontal-line" />
        <div className="count-container">
          <p className="count">{commentsList.length}</p>
          <p className="comments">Comments</p>
          <ul className="list-container">{this.renderCommentsList()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments
