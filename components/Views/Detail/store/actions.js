'use client';
import {CLEAR_MESSAGES, SET_DETAILS, SET_ERROR, SET_LOADING, SET_SUCCESS,} from '@/components/Views/Detail/store/types';

export const toggleLoading = (value) => ({type: SET_LOADING, payload: value});
export const setDetails = (data) => ({type: SET_DETAILS, payload: data});
export const setError = (error) => ({type: SET_ERROR, payload: error});
export const setSuccess = (success) => ({type: SET_SUCCESS, payload: success});
export const clearMessages = () => ({type: CLEAR_MESSAGES});

