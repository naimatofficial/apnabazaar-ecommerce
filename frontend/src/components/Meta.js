import { Helmet } from "react-helmet";

const Meta = ({ title, keywords, description }) => {
	return (
		<Helmet>
			<title>Apna Bazaar - {title} </title>
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:url" content="https://apnabazaar.com" />
			<meta property="og:type" content="website" />
		</Helmet>
	);
};

Meta.defaultProps = {
	title: "Online Store",
	keywords:
		"e-commerce, online shopping, products, electronic products, new technology",
	description: `Welcome to Apna Bazaar - your one-stop online shopping destination for all your needs! 
      We offer a wide range of products, from groceries and household essentials to fashion and
      electronics, all at affordable prices. Our user-friendly website makes it easy for you to
      find what you're looking for, and our fast and reliable shipping ensures that your order will
      be delivered to you in no time. With a dedicated customer support team available to assist you
      with any questions or concerns, shopping at Apna Bazaar is a hassle-free experience. Shop with
      us today and discover the convenience of online shopping!`,
};

export default Meta;
