import RootLayout from "@/components/Layouts/RootLayout";
import { Col, Row } from "antd";
import {
	ArrowRightOutlined,
	CalendarOutlined,
	CommentOutlined,
	ProfileOutlined,
} from "@ant-design/icons"
import Image from "next/image";

const NewsDetailsPage = ({ news }) => {

	if (!news) {
		return <p>Loading.....</p>
	}

	return (
		<div>
			<Row
			style={{marginTop:"80px"}}
			gutter={{
				xs: 8,
				sm: 16,
				md: 24,
				lg: 32,
			}}
			>
			<Col className="gutter-row" span={12}>
				<div>
				<Image alt="news image" src={news?.image_url} width={500} height={300} responsive />
				</div>
			</Col>
			<Col className="gutter-row" span={12}>
				<div>
				<h1 style={{fontSize:"25px"}}>{news?.title}</h1>
				<div className='line'
				style={{
					height: "5px",
					margin: "20 px 0",
					background: "#000",
					width: "100%"
				}}
				></div>
				
				<p
				style={{
					display: "flex",
					justifyContent: "space-between",
					width: "100%",
					color: "gray",
					margin: "10px 0px",
					fontSize: '12px',
				}}
				>
					<span>
						<CalendarOutlined /> {news?.release_date}
					</span>
					<span>
						<CalendarOutlined /> {news?.comment_count} COMMENTS
					</span>
					<span>
						<ProfileOutlined /> {news?.release_date}
					</span>
				</p>

				<p style={{ fontSize: "20px" }}>
					{news?.description}
				</p>
				<p 
				style={{
					fontSize: "15px",
					marginTop: "20px",
					backgroundColor: "black",
					color: "white",
					width: "100%",
				}}>
				</p>
				</div>
			</Col>
			</Row>
		</div>
	);
};

export default NewsDetailsPage;

NewsDetailsPage.getLayout = function getLayout(page) {
	return <RootLayout>{page}</RootLayout>;
};

// export const getStaticPaths = async () => {
// 	const res = await fetch("http://localhost:5000/news");
// 	const newses = await res.json();

// 	const paths = newses.map((news) => ({
// 		params: { newsId: news.id},
// 	}));
// 	return { paths, fallback: false };
// };

export const getServerSideProps = async (context) => {
	const { params } = context
	const res = await fetch(`http://localhost:5000/news/${params.newsId}`);
	const data = await res.json();

	return {
		props: {
			news: data,
		}
	}
};