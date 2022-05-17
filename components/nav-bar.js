import React, {useState} from "react"
import { Navbar as B4Navbar, Nav,NavDropdown,Button } from 'react-bootstrap'
import Link from "next/link";
import ConnectWallet from "./connect-wallet";
import logo from '../assets/img/logo.png'
import Allocation from './my-allocation';
import Solana from './sol-address';
const NavBar = () => {    

    const [modalVisible, setModalAllocationVisible] = useState(false)
    const [modalVisible2, setModalAllocationVisible2] = useState(false)
    return (


        <B4Navbar collapseOnSelect expand="md" className="land-nav navbar-default">
            <div className="navbar-header">
                <B4Navbar.Brand href="/">
                    <img src={logo} alt="image" />
                </B4Navbar.Brand>

               
                <Solana show={modalVisible2} onClose={() => setModalAllocationVisible2(false)} />
                
                <div className="d-flex">
                    <B4Navbar.Toggle aria-controls="responsive-navbar-nav" className="justify-content-end" >
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </B4Navbar.Toggle>
                </div>
            </div>

            <B4Navbar.Collapse id="responsive-navbar-nav" >
                <Nav className="nav navbar-nav" bg="dark" variant="dark" as="ul" style={{"marginLeft":"10px", "marginTop":"8px"}}>

     
                  
                    <Nav.Item as="li">
                        <Link href="/">Home</Link>
                    </Nav.Item>

                    <NavDropdown  as="li"title="Stake Pools"  className="nav navbar-nav"  id="basic-nav-dropdown">
                  <NavDropdown.Item href="/stake-pools/0xC090f7D3368a36b20b2B2553386f4E5E184cecb9">  <Link href="/stake-pools/0xC090f7D3368a36b20b2B2553386f4E5E184cecb9">20 days Stake</Link></NavDropdown.Item>
                     <NavDropdown.Item href="/stake-pools/0xbE140E29d5bD66a3755Aaac4B7507BA40cE6B7FE"> <Link href="/stake-pools/0xbE140E29d5bD66a3755Aaac4B7507BA40cE6B7FE">45 days Stake</Link></NavDropdown.Item>
                     <NavDropdown.Item href="/stake-pools/0x4632125F84545c5C1144775755C6936eFBBe95b7"> <Link href="/stake-pools/0x4632125F84545c5C1144775755C6936eFBBe95b7">365 days Stake</Link></NavDropdown.Item>

                     <NavDropdown.Item href="/pools/0x9f9c798763e8bACC8ef5E8446178211F865ED7CB"> <Link href="/pools/0x9f9c798763e8bACC8ef5E8446178211F865ED7CB">DeuxPad Stake</Link></NavDropdown.Item>
                     <NavDropdown.Item href="/pools/metap"> <Link href="/pools/metap">Metap Stake</Link></NavDropdown.Item>

 {/* Comment   */}
                   
                    
                    <NavDropdown.Item href="/pools/metaverse"> <Link href="/pools/metaverse">Metaverse Stake(Raca)</Link></NavDropdown.Item>
                    <NavDropdown.Item href="/pools/staratlas"> <Link href="/pools/staratlas">Metaverse Stake(Atlas)</Link></NavDropdown.Item>

                    <NavDropdown.Item href="/stake">  <Link href="/stake">Old Stake</Link></NavDropdown.Item>
   
                     </NavDropdown>

                     <Nav.Item as="li">
                     <Link href="/farming/0x04bCc2bC583d7a139Be71C9f8b2e441Ce749B093">Farming</Link>
                    </Nav.Item>

                    <NavDropdown  as="li"title="Airdrops"  className="nav navbar-nav"  id="basic-nav-dropdown">
                    <NavDropdown.Item as="li">
                        <Link href="/airdrops/bsc">BSC Airdrops</Link>
                        </NavDropdown.Item>
                       <NavDropdown.Item as="li">
                        <Link href="/airdrops/avalanche">Avalanche Airdrops</Link>
                        </NavDropdown.Item>

                    </NavDropdown>
                    <Nav.Item as="li">
                    <Link href="/my-allocation">Calculator</Link>
                    </Nav.Item>

                   
                    <NavDropdown  as="li"title="Toolkit"  className="nav navbar-nav"  id="basic-nav-dropdown">
                    <NavDropdown.Item target="_blank"  href="https://smaugs.com/#">  <a target="_blank" href="https://smaugs.com/#">Main Website</a></NavDropdown.Item>
                  <NavDropdown.Item >    <div onClick={() => setModalAllocationVisible2(true)}>Solana Address</div></NavDropdown.Item>
                     <NavDropdown.Item target="_blank" href="https://bit.ly/32nkj0P">   <a href="https://bit.ly/32nkj0P" target="_blank">Buy Now</a></NavDropdown.Item>
                   
                    <NavDropdown.Item href="https://docs.google.com/forms/d/e/1FAIpQLSfmiXaVb_jshOIfifzaoFtooO5JdK0swKEqbKjpQIF2e1p_DQ/viewform" target="_blank"> <a href="https://docs.google.com/forms/d/e/1FAIpQLSfmiXaVb_jshOIfifzaoFtooO5JdK0swKEqbKjpQIF2e1p_DQ/viewform" target="_blank">Apply for Launch</a>
</NavDropdown.Item>
                  
   
                     </NavDropdown>


                
                  
                    <Nav.Item as="li">
                    </Nav.Item>
                    <Nav.Item as="li" className="d-md-none">
                        <ConnectWallet className="btn-primary" />
                    </Nav.Item>
                </Nav>
            </B4Navbar.Collapse>
            
            <a href="#" className="d-none d-md-block">
                <ConnectWallet className="btn-primary"/>
            </a>
        </B4Navbar>
    );
  };
  
  export default NavBar;
  