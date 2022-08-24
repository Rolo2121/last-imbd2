import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import './CreateAccount.js';
import Nav from './Nav';
import { useNavigate } from 'react-router-dom';
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
import { UserOutlined } from '@ant-design/icons';

import MovieCard from '../MovieCard';

const { Header, Content, Footer } = Layout;

const AppLayout = () => {
	const navigate = useNavigate();
	const onFinish = (values) => {
		navigate(`/movie/${values.movieName}`);
	};
	const onFinishFailed = (errorInfo) => {
		console.log(errorInfo);
	};
	const [form] = Form.useForm();
	const onFormLayoutChange = (fdata) => {};
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const getMovies = async () => {
			const response = await fetch('/api/movie');
			console.log(response);
			const data = await response.json();
			setMovies(data);
		};
		getMovies();
	}, []);
	return (
		<Layout className="layout">
			<Nav />
			<Content
				style={{
					padding: '0 50px',
				}}>
				<div className="site-layout-content">
					<Form
						layout="vertical"
						form={form}
						onValuesChange={onFormLayoutChange}
						className="margin-top-2"
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off">
						<Form.Item label="Enter Movie Name:" name="movieName">
							<Input placeholder="Find a Movie" />
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit">
								Submit
							</Button>
						</Form.Item>
					</Form>

					<Row gutter={[16, 16]}>
						{movies.map((movie) => (
							<Col xs={24} sm={12} md={8} lg={6} xlg={4}>
								<MovieCard movie={movie} />
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
};

export default AppLayout;
