import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
const Footer = () => {
    return (
        <footer className="footer text-center">
			<div className="container pt-4">
				<div className="row">
					<div className="col-lg-4 mb-5 mb-lg-0 text-center">
						<h4 className="heading mb-3">SMAUGS NFT</h4>

						<p className="mt-4 text-sm opacity-8 pr-lg-4">
							Smaugs Marketplace is a complete custom DeFi, governance, and NFT ecosystem + marketplace.
						</p>
						<div className="mt-4">
							
							<a href="https://t.me/smaugscommunity" target="_blank" className="social-icon">
								<FontAwesomeIcon icon={["fab", "telegram"]} />
							</a>
							
							<a href="https://twitter.com/smaugsnft" target="_blank" className="social-icon">
								<FontAwesomeIcon icon={["fab", "twitter"]} />
							</a>
							<a href="https://github.com/smaugsnft" target="_blank" className="social-icon">
								<FontAwesomeIcon icon={["fab", "github"]} />
							</a>
							<a href="https://discord.gg/v7ZmDYsQ" target="_blank" className="social-icon">
								<FontAwesomeIcon icon={["fab", "discord"]} />
							</a>
							<a href="mailto:info@smaugs.com" target="_blank" className="social-icon">
								<FontAwesomeIcon icon="envelope" />
							</a>

						</div>
					</div>
					<div className="col-lg-3 col-6 col-sm-6 ml-lg-auto mb-5 mb-lg-0">
						<h5 className="heading mb-3">Useful Links</h5>
						<ul className="list-unstyled">
							<li>
								<a href="https://exchange.pancakeswap.finance/#/swap?inputCurrency=0x6bfd576220e8444ca4cc5f89efbd7f02a4c94c16">
									Buy Smaugs Token
								</a>
							</li>
							<li>
								<a href="https://smaugs.com/smaugs-roadmap.png">
									Roadmap
								</a>
							</li>
							<li>
								<a href="https://smaugs.com/smaugs-whitepaper.pdf">
									WhitePaper English
								</a>
							</li>
							<li>
								<a href="https://smaugs.com/smaugs-whitepaper-tr.pdf">
									WhitePaper Turkish
								</a>
							</li>
						</ul>
					</div>
					<div className="col-lg-3 col-6 col-sm-6 mb-5 mb-lg-0">
						<h5 className="heading mb-3">About Smaugs NFT</h5>
						<ul className="list-unstyled">
							<li className="nav-item nav-item-spaced dropdown dropdown-animate">
								<a className="nav-link" target="_blank" href="https://smaugs-nft.nolt.io/">
									Suggestions
								</a>
							</li>
							<li>
								<a href="https://bscscan.com/token/0x6bfd576220e8444ca4cc5f89efbd7f02a4c94c16">
									BSCSCAN
								</a>
							</li>
							<li>
								<a href="https://t.me/smaugscommunity">
									Global Community
								</a>
							</li>
							<li>
								<a href="https://t.me/smaugscommunity_tr">
									Turkish Community
								</a>
							</li>
					
						</ul>
					</div>
				</div>
				<div className="py-4"></div>
				<div className="row align-items-center justify-content-md-between pb-4">
					<div className="col-md-6">
						<div className="copyright text-sm font-weight-bold text-center text-md-left">
							© 2021 <a href="" className="font-weight-bold" target="_blank">SMAUGS NFT</a>. All rights reserved
						</div>
					</div>
				</div>
			</div>
		</footer>
    );
  };
  
  export default Footer;
  