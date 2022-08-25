import { Button, Card } from "antd";
import { HeartOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie, type, onRemove, onAdd }) {
  const navigate = useNavigate();
  async function addToWatchlist() {
    try {
      const response = await axios.post("/api/user/watchlist/" + movie._id);
      onAdd(movie._id);
    } catch (error) {
      if (error.status === 403) {
        navigate("/login");
      }
    }
  }
  async function deleteFromWatchlist() {
    try {
      const response = await axios.delete("/api/user/watchlist/" + movie._id);
      onRemove(movie._id);
    } catch (error) {
      if (error.status === 403) {
        navigate("/login");
      }
    }
  }
  return (
    <Card
      hoverable
      onClick={() => {
        navigate("/movie/" + movie.tmdbId);
      }}
      style={{
        width: "100%",
        borderRadius: "10px",
      }}
      cover={<img src={movie.poster} />}
      extra={movie.genre}
      title={movie.title}
      actions={[
        type === "watchlist" ? (
          <Button onClick={deleteFromWatchlist}>
            <DeleteOutlined />
          </Button>
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
