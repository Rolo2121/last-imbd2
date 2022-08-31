import { Avatar, Button, Comment, Form, Input, List } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined, DeleteOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { GET_COMMENTS, } from '../utils/queries';
import { COMMENT_MUTATION } from '../utils/mutations';
const { TextArea } = Input;

const CommentList = ({ }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const {data} = useQuery(GET_COMMENTS)
  const comments = data?.comments || []

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
  const actions = [

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
        <span className='comment-action'><DeleteOutlined /></span>
      </span>

];console.log(comments)
  return comments &&(
    
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={(props) =>   <Comment
      actions={actions}
      datetime={ <span>{moment().fromNow()}</span>}
       author={<span>Han Solo</span>}
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Jazelle Pearce" />}
        content={
          <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully
          and efficiently.
        </p>
        }
      />}
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


  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');


  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setValue('');
     /* setComments([
        ...comments,
        {
          author: 'Han Solo',
          avatar: 'https://joeschmoe.io/api/v1/random',
          content: <p>{value}</p>,
          datetime: moment().fromNow(),
        },
      ]);*/
    }, 1000);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      { <CommentList  />}
    
                <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
    </>
  );
};

export default App;