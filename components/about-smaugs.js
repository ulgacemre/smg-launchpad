import React, {useRef} from "react"
import { Row, Col } from 'react-bootstrap'

const AboutSmaugs = ({info}) => {
    const refSummary = useRef(null)
    const gotoSummary = () => {
        refSummary.current.scrollIntoView();
    }
    return (
	    <Row className="">
			<Col lg={4}>
                <h4 className="mb-3">Table of Contents</h4>
                <ul className="about-smaugs-list">
                    <li>
                        <a onClick={gotoSummary}>1. Summary</a>
                    </li>
                    <li>
                        <a href="#features">2. Key Features</a>
                    </li>
                    <li>
                        <a href="#roadmap">3. Roadmap</a>
                    </li>
                    <li>
                        <a href="#tokenomics">4. Tokenomics</a>
                    </li>
                </ul>
            </Col>
           
            <Col lg={8}>
  
                <div className="about-smaugs-content">
                    <img className="w-100" src={info.aboutProject.banner} />
                    <h4 ref={refSummary} id="summary" className="my-3">Summary</h4>
                    <p className="content">
                        {info.aboutProject.summary}
                    </p>
                    <h4 id="features" className="my-3">Key Features</h4>
                    <p className="content">
                        <ul>
                            {info.aboutProject.keyFeatures.map((feature, index) => (
                            <li key={`about-keyfeature-${index}`}>
                                - {feature}
                            </li>
                            ))}
                        </ul>
                    </p>
                    <h4 id="roadmap" className="my-3">Roadmap</h4>
                    <p className="content">
                        <img className="w-100" src={info.roadmap} />
                    </p>
                    <h4 id="tokenomics" className="my-3">Tokenomics</h4>
                    <p className="content">
                        <img className="w-100" src={info.tokenomics} />
                    </p>
                </div>
            </Col>
		</Row>
    );
  };
  
  export default AboutSmaugs;
  