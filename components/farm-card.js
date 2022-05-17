import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from "next/link";

const FarmCard = () => {
    return (
        <div className="section-top">
            <div className="section section-farm-panel text-white">
                <div className="container py-8 px-6 py-16">
                    <div className="">
                        <div className="offset-md-3 offset-lg-4 col-md-6 col-lg-4 col-12 text-center">
                            <div className="v-sheet v-sheet--outlined theme--dark rounded-xl p-2"
                                    style={{'backgroundColor': 'transparent', 'cursor': 'default'}}>
                                <h4 className="text-center">SMG/BNB</h4>
                                <div className="p-2">                                        
                                    <div className="d-flex justify-space-between">
                                        <div>APR</div>
                                        <div>42%</div>
                                    </div>
                                    <div className="d-flex justify-space-between">
                                        <div>Total Liquidity</div>
                                        <div>$124,283.74</div>
                                    </div>
                                </div>
                                <div className="p-2">
                                    <div className="p-3 v-sheet v-sheet--outlined no-hover theme--dark rounded-xl" style={{'backgroundColor': 'transparent', 'cursor': 'default'}}>
                                        <div className="text-left">REWARD EARNED</div>
                                        <div className="d-flex justify-space-between align-center pt-2">
                                            <div>
                                                0
                                            </div>
                                            <div style={{flex: '0 0 auto'}}>
                                                <span className="v-span-rounded-2">Harvest</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2">
                                    <div className="p-3 v-sheet v-sheet--outlined no-hover theme--dark rounded-xl" style={{'backgroundColor': 'transparent'}}>
                                        <div className="text-left mb-3">SMG - BNB LP Staked</div>
                                        <a href="/#" className="btn btn-block v-btn--rounded btn-primary">Approve Contract</a>
                                    </div>
                                </div>
                                <div className="p-2">
                                    <div className="theme--dark v-divider my-2"></div>
                                </div>
                                <div className="p-2">
                                    <div className="text-left">Farm Detail</div>
                                    <div className="d-flex justify-space-between align-center pt-2" style={{'color': '#808080'}}>
                                        <div>
                                            <a href="#">
                                                Get SMG <FontAwesomeIcon icon='external-link-alt' className="ml-1 mb-1" style={{width: '16px'}}/>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="#">
                                                View Contract <FontAwesomeIcon icon='external-link-alt' className="ml-1 mb-1" style={{width: '16px'}}/>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-space-between align-center pt-2" style={{'color': '#808080'}}>
                                        <div>
                                            <a href="#">
                                                Get SMG - BNB LP <FontAwesomeIcon icon='external-link-alt' className="ml-1 mb-1" style={{width: '16px'}}/>
                                            </a>
                                        </div>
                                        <div>
                                            <a href="#">
                                                See Pair Info <FontAwesomeIcon icon='external-link-alt' className="ml-1 mb-1" style={{width: '16px'}}/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FarmCard;