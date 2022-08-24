import MovieCard from '../MovieCard';
import Nav from './Nav';

import {
	PageHeader,
	Breadcrumb,
	Layout,
	Menu,
	Col,
	Row,
	TimePicker,
	Form,
	Input,
	Button,
	Space,
	Card,
} from 'antd';

const { Header, Content, Footer } = Layout;
export default function WatchList({ watchlist, onRemove }) {
	return (
		<Layout className="layout">
			<Nav />
			<Content
				style={{
					padding: '0 50px',
				}}>
				<div className="site-layout-content">
					<Row gutter={[16, 16]}>
						{watchlist.map((movie) => (
							<Col xs={24} sm={12} md={8} lg={6} xlg={4}>
								<MovieCard movie={movie} type="watchlist" onRemove={onRemove} />
							</Col>
						))}
					</Row>
				</div>
			</Content>
			<Footer
				style={{
					textAlign: 'center',
				}}>
				last-imdb 2022
			</Footer>
		</Layout>
	);
}
