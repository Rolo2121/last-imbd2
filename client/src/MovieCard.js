import { Button, Card } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function MovieCard({ movie }) {
	const navigate = useNavigate();
	async function addToWatchlist() {
		try {
			const response = await axios.post('/api/user/watchlist/' + movie._id);
		} catch (error) {
			navigate('/login');
		}
	}
	return (
		<Card
			hoverable
			style={{
				width: '100%',
				borderRadius: '10px',
			}}
			cover={<img src={movie.poster} />}
			extra={movie.genre}
			title={movie.title}
			actions={[
				<Button onClick={addToWatchlist}>
					<HeartOutlined />
				</Button>,
			]}
			//   size="small"
		>
			<Card.Meta title="rating" description={movie.rating} />
		</Card>
	);
}
