import { Card } from "antd";

export default function MovieCard({ movie }) {
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
      //   size="small"
    >
      <Card.Meta title="rating" description={movie.rating} />
    </Card>
  );
}
