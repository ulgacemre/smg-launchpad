import React, {Component} from 'react';
import Link from "next/link";

var classNames = require('classnames');

const Pool = ({info}) => {

    var statusBgClass = classNames({
        'd-flex py-1 px-2 rounded-pill align-center': true,
        'success-background': info.filled,
        'error-background': !info.filled,
    });
    var statusCircleClass = classNames({
        'rounded-circle': true,
        'green': info.filled,
        'red': !info.filled,
    });
    var statusTextClass = classNames({
        'ml-2 text-caption font-weight-medium': true,
        'green--text': info.filled,
        'red--text': !info.filled,
    });
    return (
        <div className="col-sm-6 col-md-4 col-12">
            <Link href={`/pool/details/${info.id}`}>
                <div className="v-sheet v-sheet--outlined theme--dark rounded-xl"
                        style={{'backgroundColor': 'transparent'}}>
                    <div className="v-card__title">
                        <img align="left"
                                src={info.img}
                                className="image" height="48"/>
                        <div className="spacer"></div>
                        <div className={statusBgClass}>
                            <div className={statusCircleClass} style={{width: '12px', height: '12px'}}></div>
                            <span
                                className={statusTextClass}>{info.filled ? 'Filled' : 'Ended'}</span>
                        </div>
                    </div>
                    <div className="v-card__title py-0">{info.name}</div>
                    <div
                        className="mx-4 overline success--text line-height-1">{info.ratioPerBUSD.currency} /
                        BUSD
                    </div>
                    <div className="v-card__subtitle pb-0">Ratio per 1 BUSD</div>
                    <div
                        className="v-card__title pt-0 primary--text">{info.ratioPerBUSD.price} {info.ratioPerBUSD.currency}</div>
                    <div className="v-card__subtitle pt-3 pb-0">Progress</div>
                    <div className="mx-4">
                        <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="70"
                                className="v-progress-linear v-progress-linear--rounded theme--dark"
                                style={{height: '12px'}}>
                            <div className="v-progress-linear__background primary"
                                    style={{opacity: 0.3, left: '100%', width: '0%'}}></div>
                            <div className="v-progress-linear__buffer"></div>
                            <div className="v-progress-linear__determinate primary"
                                    style={{width: info.progress.current / info.progress.total * 100 + '%'}}></div>
                        </div>
                    </div>
                    <div className="mx-4 d-flex justify-space-between caption">
                        <div> {parseInt(info.progress.current / info.progress.total * 100)} %</div>
                        <div
                            className="success--text">{info.progress.current} / {info.progress.total}</div>
                    </div>
                    <hr role="separator" aria-orientation="horizontal" className="mx-4 mt-4 v-divider theme--dark"/>
                    <div className="v-card__text">
                        <div className="d-flex justify-space-between">
                            <div>
                                <div className="caption">Participants</div>
                                <div className="text-h6">{info.participants}</div>
                            </div>
                            <div>
                                <div className="caption">Max BUSD</div>
                                <div className="text-h6">{info.maxBUSD}</div>
                            </div>
                            <div>
                                <div className="caption">Access</div>
                                <div className="text-h6">{info.access}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            {/*<a
                href="/pool/6130b6bb4f178b430c437b64"
                className="">

            </a>*/}
        </div>
    );
}

export default Pool;