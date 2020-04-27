import axios from 'axios';
import * as constants from './constants.js';
import { trackPromise } from 'react-promise-tracker';

export default class UserService {
    static getNewUserId(){
        return new Promise((resolve, reject) => {
            axios.get(constants.USER_ROUTE + '/newUserId').then((res) => {
                resolve(res.data);
            }).catch((err) => {
                reject(err);
            })
        });
    }

    static getUserByGroup(group_id){
        return new Promise((resolve, reject) => {
            axios.get(constants.USER_ROUTE + '/getByGroup/' + group_id).then((res) => {
                resolve(res.data);
            }).catch((err) => {
                reject(err);
            })
        });
    }

    static createUser(id, name, group_id){
        return new Promise((resolve, reject) => {
            trackPromise(
                axios.post(constants.USER_ROUTE + '/add', {
                    id, name, group_id
                }).then((res) => {
                    resolve(res.data);
                }).catch((err) => {
                    reject(err);
                })
            , "whole")
        });
    }

    static updateUser(id, new_name, group_id){
        return new Promise((resolve, reject) => {
            trackPromise(
                axios.put(constants.USER_ROUTE + '/update', {
                    id, new_name, new_group_id: group_id
                }).then((res) => {
                    resolve(res.data);
                }).catch((err) => {
                    reject(err);
                })
            , "whole")
        });
    }

    static deleteUser(id, group_id){
        return new Promise((resolve, reject) => {
            trackPromise(
                axios.delete(constants.USER_ROUTE + '/remove/' + id + '/' + group_id).then((res) => {
                    resolve(res.data);
                }).catch((err) => {
                    reject(err);
                })
            , "whole")
        });
    }
}