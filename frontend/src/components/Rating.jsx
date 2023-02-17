import React from "react";
import PropTypes from "prop-types";

const Rating = ({ value, text, color }) => {
	return (
		<div className="rating py-2">
			<span>
				<i
					style={{ color }}
					className={
						value >= 1
							? "fas fa-star"
							: value >= 0.5
							? "fas fa-star-half-alt"
							: "far fa-star"
					}
				></i>
			</span>
			<span>
				<i
					style={{ color }}
					className={
						value >= 2
							? "fas fa-star"
							: value >= 1.5
							? "fas fa-star-half-alt"
							: "far fa-star"
					}
				></i>
			</span>
			<span>
				<i
					style={{ color }}
					className={
						value >= 3
							? "fas fa-star"
							: value >= 2.5
							? "fas fa-star-half-alt"
							: "far fa-star"
					}
				></i>
			</span>
			<span>
				<i
					style={{ color }}
					className={
						value >= 4
							? "fas fa-star"
							: value >= 3.5
							? "fas fa-star-half-alt"
							: "far fa-star"
					}
				></i>
			</span>
			<span>
				<i
					style={{ color }}
					className={
						value >= 5
							? "fas fa-star"
							: value >= 4.5
							? "fas fa-star-half-alt"
							: "far fa-star"
					}
				></i>
			</span>
			<span className="mx-2">{text && text}</span>
		</div>
	);
};

Rating.defaultProps = {
	color: "#ffbd00",
};

Rating.propTypes = {
	value: PropTypes.number,
	text: PropTypes.string,
	color: PropTypes.string,
};

export default Rating;

// for (let i = 1; i <= 5; i++) {
// 	return (
// 		<div key={i}>
// 			<span>
// 				<i
// 					className={
// 						value >= i
// 							? "fa fas-star"
// 							: value >= 1 - i + 0.5
// 							? "fa fas-star-half-alt"
// 							: "fa-light fa-star"
// 					}
// 				/>
// 			</span>
// 			<span>{text && text}</span>
// 		</div>
// 	);
// }

/*<span>
				<i
					style={{ color }}
					className={
						value >= 2
							? "fa fas-star"
							: value >= 1.5
							? "fa fas-star-half-alt"
							: "fa-light fa-star"
					}
				></i>
			</span>
			<span>
				<i
					style={{ color }}
					className={
						value >= 3
							? "fa fas-star"
							: value >= 2.5
							? "fa fas-star-half-alt"
							: "fa-light fa-star"
					}
				></i>
			</span>
			<span>
				<i
					style={{ color }}
					className={
						value >= 4
							? "fa fas-star"
							: value >= 3.5
							? "fa fas-star-half-alt"
							: "fa-light fa-star"
					}
				/>
			</span>
			<span>
				<i
					style={{ color }}
					className={
						value >= 5
							? "fa fas-star"
							: value >= 4.5
							? "fa fas-star-half-alt"
							: "fa-light fa-star"
					}
				></i>
			</span>
			 */
