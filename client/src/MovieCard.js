import { Button, Card } from "antd";
import { HeartOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { UPDATE_WATCHLIST, DELETE_WATCHLIST } from "./utils/mutations";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function MovieCard({ movie, type, onRemove }) {
  console.log(movie);
  const navigate = useNavigate();
  const [mutateFunction, { data: updatedWatchlist }] = useMutation(UPDATE_WATCHLIST);
  const [deleteFunction] = useMutation(DELETE_WATCHLIST);
  function addToWatchlist(event) {
    event.preventDefault();
    event.stopPropagation();
    try {
      mutateFunction({ variables: { movieId: movie._id } });
    } catch (error) {
      if (error.status === 403) {
        navigate("/login");
      }
    }
  }
  /*async function deleteFromWatchlist() {
		try {
			const axios = await axios.delete('/api/user/watchlist/' + movie._id);
			onRemove(movie._id);
			deleteFunction({ variables: { movieId: movie._id } });
		} catch (error) {
			if (error.status === 403) {
				navigate('/login');
			}
		}
	}*/
  return (
    <Card
      hoverable
      style={{
        width: "100%",
        borderRadius: "10px",
      }}
      cover={<img src={movie.poster} />}
      extra={movie.genre}
      title={movie.title}
      onClick={() => {
        navigate(`/movie/${movie.id}`);
      }}
      actions={[
        type === "watchlist" ? (
          //<Button onClick={deleteFromWatchlist}>
          //	<DeleteOutlined />
          //</Button>
          <></>
        ) : (
          <Button onClick={addToWatchlist}>
            <HeartOutlined />
          </Button>
        ),
      ]}
      //   size="small"
    >
      <Card.Meta title="rating" description={movie.rating} />
    </Card>
  );
}
