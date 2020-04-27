import axios from 'axios';
import * as constants from './constants.js';
import { trackPromise } from 'react-promise-tracker';

export default class GroupService {
    static getAll(){
        return new Promise((resolve, reject) => {
            trackPromise(
                axios.get(constants.GROUP_ROUTE + '/getAll').then((res) => {
                    resolve(res.data);
                }).catch((err) => {
                    reject(err);
                })
            , "whole")
        });
    }

    static createGroup(name){
        return new Promise((resolve, reject) => {
            trackPromise(
                axios.post(constants.GROUP_ROUTE + '/add', {
                    name
                }).then((res) => {
                    resolve(res.data);
                }).catch((err) => {
                    reject(err);
                })
            , "whole")
        });
    }

    static updateGroup(id, new_name){
        return new Promise((resolve, reject) => {
            trackPromise(
                axios.put(constants.GROUP_ROUTE + '/update', {
                    id, new_name
                }).then((res) => {
                    resolve(res.data);
                }).catch((err) => {
                    reject(err);
                })
            , "whole")
        });
    }

    static deleteGroup(id){
        return new Promise((resolve, reject) => {
            trackPromise(
                axios.delete(constants.GROUP_ROUTE + '/remove/' + id).then((res) => {
                    resolve(res.data);
                }).catch((err) => {
                    reject(err);
                })
            , "whole")
        });
    }
}