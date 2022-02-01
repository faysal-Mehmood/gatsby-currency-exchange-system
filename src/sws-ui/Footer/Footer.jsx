import React from 'react';
import { useStaticQuery, graphql  } from 'gatsby';
import { default as GatsbyImage } from 'gatsby-image';
import translate from 'src/helpers/language';
import { Heading, LinkHandler } from 'src/sws-ui';

import facebook from 'src/images/icons/facebook.png';
import twitter from 'src/images/icons/twitter.png';
import linkedin from 'src/images/icons/linkedin.png';
import youtube from 'src/images/icons/youtube.png';

const Footer = () => {
	const data = useStaticQuery(graphql`
		query {
			logoImage: file(relativePath: { eq: "sw-reversed-moon.png" }) {
				childImageSharp {
					fluid(maxWidth: 259) {
						...GatsbyImageSharpFluid
					}
				}
			}
		}
	`);

	return (
		<footer>
			<div className="footer__content">
				<div className="footer__contact">
					<div className="footer__header">
						<GatsbyImage
							fluid={data.logoImage.childImageSharp.fluid}
							placeholderStyle={{
								filter: 'blur(15px)',
							}}
							style={{
								width: 'inherit',
							}}
							imgStyle={{
								height: 'inherit',
								width: '100%',
								top: 'auto',
								bottom: 0,
							}}
						/>

						<div className="footer__socials--mobile">
							<img src={facebook} alt="facebook-icon" />
							<img src={twitter} alt="twitter-icon" />
							<img src={linkedin} alt="linkedin-icon" />
							<img src={youtube} alt="youtube-icon" />
						</div>
					</div>


					<Heading size="3">{translate('Get In Touch','ได้รับการติดต่อ')}</Heading>
					<a className="footer__contact__method" href="mailto:support@smartwaysystem.com.au">support@smartwaysystem.com.au</a>
					<a className="footer__contact__method" href="tel:+61287552628">+61287552628</a>

					<div className="footer__socials">
						<a href="https://www.facebook.com/SmartwaySystem" target="_blank">
							<img src={facebook} alt="facebook-icon" />
						</a>
						<a href="https://twitter.com/smartwaysystem" target="_blank">
							<img src={twitter} alt="twitter-icon" />
						</a>
						<a href="https://www.linkedin.com/company/67877811/admin/" target="_blank">
							<img src={linkedin} alt="linkedin-icon" />
						</a>
						<a href="https://www.youtube.com/channel/UC535Zcl_UV3IJBmbEkTR9ww/featured" target="_blank">
							<img src={youtube} alt="youtube-icon" />
						</a>
					</div>
				</div>
				<div className="footer__navigation">
					<LinkHandler linkUrl={typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/about-us' : '/en/about-us'}>{translate('About Us','เกี่ยวกับเรา')}</LinkHandler>
					<LinkHandler linkUrl={typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/faqs': '/en/faqs'}>{translate('Help & FAQs','ความช่วยเหลือและคำถามที่พบบ่อย')}</LinkHandler>
					<LinkHandler linkUrl={typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/money_transfer': '/en/money_transfer'}>{translate('Transfer Money','โอนเงิน')}</LinkHandler>
					<LinkHandler linkUrl={typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/contact': '/en/contact'}>{translate('Contact Us','ติดต่อเรา')}</LinkHandler>
					<LinkHandler linkUrl={typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/blog': '/en/blog'}>{translate('Blog','บล็อก')}</LinkHandler>
					<LinkHandler linkUrl={typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/news': '/en/news'}>{translate('News','ข่าว')}</LinkHandler>
					<LinkHandler linkUrl="/">Testimonials</LinkHandler>
					<LinkHandler linkUrl={typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/security': '/en/security'}>{translate('Security','ความปลอดภัย')}</LinkHandler>
				</div>
			</div>
			<hr />
			<div className="footer__base">
				<p>© {new Date().getFullYear()} Smartway System</p>
				<p>
					<LinkHandler linkUrl={typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/privacy': '/en/Privacy'}>{translate('Privacy','ความเป็นส่วนตัว')}</LinkHandler>
					{' '}
					<LinkHandler linkUrl={typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/terms': '/en/terms'}>{translate('Terms & Conditions','ข้อตกลงและเงื่อนไข')}</LinkHandler>
				</p>
			</div>
		</footer>
	);
}

export default Footer;