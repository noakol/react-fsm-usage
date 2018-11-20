import React, {Component} from 'react';
import {Services, BaseApi, Actions} from '../sdk';
import { throws } from 'assert';


const loader = function() {
    return (
        <div className="ds-loader-wrapper">
            <div className="ds-loader-new"></div>
        </div>
    );
};

export default loader;