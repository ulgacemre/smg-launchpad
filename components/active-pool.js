import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InputMax from './input-max';

const ActivePool = () => {
    
    return (
        <div className="section-top">
            <div className="section section-pool-panel text-white">
                <div className="container py-8 px-6 py-16">
                    <div className="mb-5">
                        <a href="/"
                            target="_blank"
                            className="v-btn v-btn--outlined v-btn--rounded theme--dark v-size--large primary--text v-float-right"
                        >
                            <span className="v-btn__content">Back to pool</span>
                        </a>
                    </div>

                    <div className="">
                        <div className="offset-md-3 offset-lg-4 col-md-6 col-lg-4 col-12 text-center">
                            <div className="v-sheet v-sheet--outlined theme--dark rounded-xl p-2"
                                    style={{'backgroundColor': 'transparent', 'cursor': 'default'}}>
                                <div className="v-card__title">Swap</div>
                                <div className="p-2">
                                    <div className="p-3 v-sheet v-sheet--outlined theme--dark rounded-xl" style={{'backgroundColor': 'transparent', 'cursor': 'default !important'}}>
                                        <div className="d-flex justify-space-between caption">
                                            <div style={{'fontSize': '1rem'}}>From</div>
                                            <div>Balance: 1000 BUSD</div>
                                        </div>
                                        <InputMax currency="BUSD" placeholder="Input Number" className="pt-2"/>
                                    </div>
                                </div>
                                <div className="p-2">
                                    <FontAwesomeIcon icon='arrow-down' style={{width: '20px'}}/>
                                </div>
                                <div className="p-2">
                                    <div className="p-3 v-sheet v-sheet--outlined theme--dark rounded-xl" style={{'backgroundColor': 'transparent'}}>
                                        <div className="d-flex justify-space-between caption">
                                            <div style={{'fontSize': '1rem'}}>To</div>
                                            <div>Remaining: 10000000 tokens</div>
                                        </div>
                                        <div className="d-flex justify-space-between caption pt-2">
                                            <div style={{'fontSize': '1rem'}}><input type="text" className="form-control v-input" placeholder="Input Number"/></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2">
                                    <a href="/" className="btn btn-block v-btn--rounded btn-primary">Swap</a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ActivePool;