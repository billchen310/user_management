import axios from 'axios';
import * as constants from './constants.js';
import { trackPromise } from 'react-promise-tracker';

export default class AuthService{
    static login(username, password){
        return new Promise((resolve, reject) => {
            trackPromise(
                axios.post(constants.AUTH_ROUTE + '/login', {
                    username, password
                }).then((res) => {
                    resolve(res.data);
                }).catch((err) => {
                    reject(err);
                })
            , "whole")
        });
    }
}