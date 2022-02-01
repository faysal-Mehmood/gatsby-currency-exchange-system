import React, { useEffect, useState } from 'react';
import { useWindowWidth } from 'src/helpers';
import { Link } from "gatsby";
import { useSelector, useDispatch } from "react-redux";
import dropdown from 'src/images/icons/dropdown.png';
import global from 'src/images/icons/global.png';
import translate from 'src/helpers/language';
import profileImage2 from "src/images/icons/profileImage.png";
import { navigate } from "gatsby"
import { Menu, Icon } from 'antd';
import { logout } from "../../state/action/login"
import { getAdvertize } from "../../state/action/currency"
import crossIcon from "src/images/icons/cross.png"
const { SubMenu } = Menu;


const Navigation = ({ homepage }) => {
	const allState = useSelector(state => state)

	const viewportWidth = useWindowWidth();
	const getProfileStatus = useSelector(state => state.profile?.profile)
	const mainImage = useSelector(state => state.profile?.mainImage)
	const [currentPage, setCurrentPage] = useState('home');
	const [localStoragecheck, setLocalStoragecheck] = useState('');
	const [imageProfile, setImageProfile] = useState("");
	const [currentLang, setCurrentLang] = useState("EN");
	const [ad, showAd] = useState(false)
	const dispatch = useDispatch()
	const adImg = allState.currency.getAdvertize;
  
	useEffect(() => {
	  dispatch(getAdvertize());
	  if (homepage) {showAd(true)}
	}, []);

	useEffect(() => {
		console.log(mainImage)
		if (mainImage) {
			setImageProfile(mainImage)
		} else {
			setImageProfile(getProfileStatus?.ProfileHyperLink)
		}

	}, [mainImage, getProfileStatus])




	useEffect(() => {
		if (typeof window !== 'undefined') {
			setLocalStoragecheck(!!localStorage.getItem("smartway_auth"))
		}
	}, [])
	const [defaulLang, setdefaulLang] = useState('EN');


	const handleClick = (e) => {
		setCurrentPage(e.key);
	}

	if (typeof window === `undefined`) {
		return(<></>);
	}

	const handleLogout = () => {
		console.log('logging out')
		dispatch(logout())
	}

	return viewportWidth > 1099 ? (
		<>
		<Menu className="navigation" selectedKeys={[currentPage]} mode="horizontal">

			<SubMenu
				key="home"
				title={<span><Link className="navigation__item" to={typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/about-us' : '/en/about-us'}>

					{translate('About Us', 'เกี่ยวกับ')}

				</Link><img src={dropdown} className="icon--dropdown"></img></span>}
				style={{ float: 'left' }}
			>
				<Menu.Item key="contact"><Link className="navigation__item" to={typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/contact' : '/en/contact'}>{translate('Contact', 'ตติดต่อ')}</Link></Menu.Item>
				<Menu.Item key="news"><Link className="navigation__item" to={typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/news' : '/en/news'}>{translate('News', 'ข่าว')}</Link></Menu.Item>
				<Menu.Item key="security"><Link className="navigation__item" to={typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/security' : '/en/security'}>{translate('Security', 'ความปลอดภัย')}</Link></Menu.Item>
			</SubMenu>
			<Menu.Item key="moneyTransfer" style={{ float: 'left' }}>
				<Link className="navigation__item" to={typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/money_transfer' : '/en/money_transfer'}>{translate('Money Transfer', 'การโอนเงิน')}</Link>
			</Menu.Item>
			<Menu.Item key="blogs" style={{ float: 'left' }}>
				<Link className="navigation__item" to={typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/blog' : '/en/blog'}>{translate('Blogs', 'บล็อก')}</Link>
			</Menu.Item>
			<Menu.Item key="helpFaq" style={{ float: 'left' }}>
				<Link className="navigation__item" to={typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/faqs' : '/en/faqs'}>{translate('Help', 'ช่วยด้วย')} &#38; {translate('FAQ', 'คำถามที่พบบ่อย')}</Link>
			</Menu.Item>
					

			{localStoragecheck ?
				<>
					<Menu.Item className="right__menu right__menu--register" key="register" style={{ float: 'right' }}>
						<span onClick={() => {
							localStorage.removeItem("smartway_auth")
							setLocalStoragecheck(false)
							navigate(translate('/en/login', '/th/login'))
							setImageProfile("")
							handleLogout()
						}} className="navigation__item navigation__item--register" >{translate('Logout', 'ออกจากระบบ')}</span>
					</Menu.Item>
				</>
				:
				(
					<>
						<Menu.Item className="right__menu right__menu--register" key="register" style={{ float: 'right' }}>
							<Link className="navigation__item navigation__item--register" to={typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/register' : '/en/register'}> {translate('Register', 'ลงทะเบียน')}</Link>
						</Menu.Item>
						<Menu.Item className="right__menu" key="login" style={{ float: 'right' }}>
							<Link className="navigation__item" to={typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/login' : '/en/login'}>{translate('Login', 'เข้าสู่ระบบ')}</Link>
						</Menu.Item>
					</>
				)
			}

			{homepage ?
				<SubMenu
					key="language"
					title={<span><img src={global} className="icon--global"></img><Link className="navigation__item" >{defaulLang}</Link><img src={dropdown} className="icon--dropdown"></img></span>}
					style={{ float: 'right' }}
					className="right__menu right__menu--language"
				>
					<Menu.Item key="thai"><Link className="navigation__item navigation__item--language" to={typeof window !== 'undefined' ? window.location.pathname.replace(window.location.pathname, '/th/') : ""}>TH</Link></Menu.Item>
					<Menu.Item key="thai"><Link className="navigation__item navigation__item--language" to={typeof window !== 'undefined' ? window.location.pathname.replace(window.location.pathname, '/') : ""}>EN</Link></Menu.Item>
				</SubMenu>
				:
				<SubMenu
					key="language"
					title={<span><img src={global} className="icon--global"></img><Link className="navigation__item" >{defaulLang}</Link><img src={dropdown} className="icon--dropdown"></img></span>}
					style={{ float: 'right' }}
					className="right__menu right__menu--language"
				>
					<Menu.Item key="thai"><Link onClick={() => setdefaulLang('TH')} className="navigation__item navigation__item--language" to={typeof window !== 'undefined' ? window.location.pathname.replace('/en/', '/th/') : ""}>TH</Link></Menu.Item>
					<Menu.Item key="thai"><Link onClick={() => setdefaulLang('EN')} className="navigation__item navigation__item--language" to={typeof window !== 'undefined' ? window.location.pathname.replace('/th/', '/en/') : ""}>EN</Link></Menu.Item>
				</SubMenu>
			}

			
			<Menu.Item className="right__menu" key="register" style={{ float: 'right' }} onClick={() => showAd(!ad)}>
				<div style={{borderRadius: '50%', width: '30px', height: '30px', display: 'inline-block', verticalAlign: 'middle', position: 'relative', backgroundColor: '#FFD747'}}>
					<span style={{color: '#45578C', fontWeight: 'bold', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '21px', paddingLeft: '2px', marginTop: '-1px', fontFamily: 'monospace'}}>i</span>
				</div>
			</Menu.Item>


			{localStoragecheck ?
				<Menu.Item className="right__menu right__menu--profile-image" key="register" style={{ float: 'right' }}>
					<Link className="navigation__item navigation__item" to={typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/profile' : '/en/profile'}>
						<div>
							<img src={imageProfile} style={{ width: '45px', height: '45px', borderRadius: '45px' }}></img>
						</div>
						<p>
							{translate('Welcome', 'ยินดีต้อนรับ')}, {translate(getProfileStatus?.FirstName, getProfileStatus?.FirstName)}
						</p>
					</Link>
				</Menu.Item>
				:
				(<></>)
			}
		</Menu>
		{ad && (
			<div className="transfer__modal">
			  <div className="transfer__modal--select-account" style={{width:'30%',  top:'400px', padding: '0'}}>
				<div
				  className="transfer__modal--cross"
				  onClick={() => showAd(false)}
				  style={{top: '10px', right: '10px'}} 
				>
				  <img src={crossIcon} className="transfer__modal--cross-img" style={{width: '15px'}}/>
				</div>
				<div className="account__select account__select--exist">
				  <img src={adImg} style={{maxWidth: '100%'}}></img>
				</div>
			  </div>
			</div>
		  )}
		  </>
	) : (
		<Menu
			defaultSelectedKeys={['1']}
			mode="inline"
		>
			<SubMenu
				key="mobileMenu"
				title={<Icon type="menu" />}
			>
				<SubMenu key="aboutUs" title="About Us" onTitleClick={
					navigate(typeof window !== "undefined" && window.location.href.includes("/th")
                    ? "/th/about-us"
                    : "/en/about-us")
				}>
					<Menu.Item key="contact"><Link className="navigation__item" to={typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/contact' : '/en/contact'}>Contact</Link></Menu.Item>
					<Menu.Item key="news"><Link className="navigation__item" to={typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/news' : '/en/news'}>News</Link></Menu.Item>
					<Menu.Item key="security"><Link className="navigation__item" to={typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/security' : '/en/security'}>Security</Link></Menu.Item>
				</SubMenu>
				<Menu.Item key="moneyTransfer"><Link className="navigation__item" to={typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/money_transfer' : '/en/money_transfer'}>Money Transfer</Link></Menu.Item>
				<Menu.Item key="blogs"><Link className="navigation__item" to={typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/blog' : '/en/blog'}>Blogs</Link></Menu.Item>
				<Menu.Item key="helpFaq"><Link className="navigation__item" to={typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/faqs' : '/en/faqs'}>Help &amp; FAQ</Link></Menu.Item>

				{homepage ?
					<SubMenu
						key="language"
						title={<span style={{ verticalAlign: 'middle' }}><img src={global} className="icon--global" style={{ verticalAlign: 'middle', width: '10px' }}></img><Link style={{ verticalAlign: 'middle' }}>{defaulLang}</Link></span>}
						className="right__menu right__menu--language"
					>

						<Menu.Item key="thai"><Link onClick={() => setdefaulLang('TH')} className="navigation__item--language" to={typeof window !== 'undefined' ? window.location.pathname.replace(window.location.pathname, '/th/') : ""}>TH</Link></Menu.Item>
						<Menu.Item key="thai"><Link onClick={() => setdefaulLang('EN')} className=" navigation__item--language" to={typeof window !== 'undefined' ? window.location.pathname.replace(window.location.pathname, '/') : ""}>en</Link></Menu.Item>
					</SubMenu>
					:
					<SubMenu
						key="language"
						title={<span style={{ verticalAlign: 'middle' }}><img src={global} className="icon--global" style={{ verticalAlign: 'middle', width: '10px' }}></img><Link style={{ verticalAlign: 'middle' }}>{defaulLang}</Link></span>}
						className="right__menu right__menu--language"
					>
						<Menu.Item key="thai"><Link className="navigation__item--language" to={typeof window !== 'undefined' ? window.location.pathname.replace('/en/', '/th/') : ""}>TH</Link></Menu.Item>
						<Menu.Item key="thai"><Link className="navigation__item--language" to={typeof window !== 'undefined' ? window.location.pathname.replace('/th/', '/en/') : ""}>en</Link></Menu.Item>
					</SubMenu>
				}
				<Menu.Item className="right__menu" key="login">
					<Link to={typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/login' : '/en/login'}>{translate('Login', 'เข้าสู่ระบบ')}</Link>
				</Menu.Item>
				<Menu.Item className="right__menu right__menu--register" key="register">
					<Link className="navigation__item--register" to={typeof window !== 'undefined' && window.location.href.includes('/th') ? '/th/register' : '/en/register'}>{translate('Register', 'ลงทะเบียน')}</Link>
				</Menu.Item>
			</SubMenu>
		</Menu>
	)
}

export default Navigation;