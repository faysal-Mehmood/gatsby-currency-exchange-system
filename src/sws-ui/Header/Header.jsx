import { Link, useStaticQuery, graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import { default as GatsbyImage } from "gatsby-image";

import { Navigation } from 'src/sws-ui';

const Header = ({ homepage, showAd, ad }) => {
	const data = useStaticQuery(graphql`
		query {
			logoImage: file(relativePath: { eq: "sw-coloured-horizontal.png" }) {
				childImageSharp {
					fluid(maxWidth: 200) {
						...GatsbyImageSharpFluid
					}
				}
			}
		}
	`);

	return (
		<header>
			{/* Logo link to homepage, link functionality part of Image? */}
			<Link to={typeof window !== 'undefined' && window.location.href.includes('/THI') ? '/THI' : '/'}>
				<GatsbyImage
					objectFit='contain'
					fluid={data.logoImage.childImageSharp.fluid}
					style={{ width: 200 }}
					imgStyle={{ objectFit: 'contain' }}
					placeholderStyle={{
						filter: 'blur(15px)',
					}}
				/>
			</Link>
			<Navigation homepage={homepage} showAd={showAd} ad={ad}/>
			{/* Locale, Login/Register */}
		</header>
	);
}

Header.propTypes = {
	siteTitle: PropTypes.string,
}

Header.defaultProps = {
	siteTitle: ``,
}

export default Header
