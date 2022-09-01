import { Avatar, Button, Comment, Form, Input, List } from 'antd';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined, DeleteOutlined } from '@ant-design/icons';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_COMMENTS, } from '../utils/queries';
import { COMMENT_MUTATION,  COMMENT_DELETE_MUTATION } from '../utils/mutations';


import { useParams } from 'react-router-dom';
const { TextArea } = Input;

const CommentList = ({ loading }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const [GetComments, {data, refetch, called}] = useLazyQuery(GET_COMMENTS)
  const [deleteComment, {data: deleteData, loading: deleteLoading}] = useMutation(COMMENT_DELETE_MUTATION)
  const comments = data?.comments || []
  const {id } = useParams()
  useEffect(() => {
    if (!loading &&!called){
    GetComments({variables: {postId: id, writer: JSON.parse(localStorage.getItem('user')).id }})}else if(!deleteLoading) {
      refetch()
    }
  }, [loading, called, deleteLoading])
  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };

  return comments &&(
    
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={(props) =>   {


    return <Comment

      actions={[

        <span onClick={like}>
          {React.createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
          <span className="comment-action">{likes}</span>
        </span>
      ,
    
        <span onClick={dislike}>
          {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
          <span 
          className="comment-action">
          {dislikes}</span> </span>,
          <span>
            <span 
            onClick={() => {
              deleteComment({variables: {id: props.id}})
            }}
            className='comment-action'><DeleteOutlined /></span> 
          </span>
    
    ]}

      datetime={ <span>{moment(props.date).fromNow()}</span>}
       author={<span>{props.writer.username}</span>}
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Jazelle Pearce" />}
        content={
          <p>
            {props.content}
        </p>
        }
      />}}
  />
)};

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const App = () => {
const [CommentMutation, {loading, data}] = useMutation(COMMENT_MUTATION)
const { id } = useParams()

  const [value, setValue] = useState('');


  const handleSubmit = () => {
    if (!value) return;
    CommentMutation({variables:{ content: value, postId: id, writer: JSON.parse(localStorage.getItem('user')).id}})
    setValue('')
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      { <CommentList loading={loading}  />}
    
                <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={loading}
            value={value}
          />
    </>
  );
};

export default App;