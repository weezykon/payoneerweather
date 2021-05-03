/* eslint-disable jest/no-jasmine-globals */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import snapshot from 'check-snapshot';
import { render, fireEvent, screen } from './../tests/test-utils'
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import Weather from './Weather';
import { formatDate, fetchData, fetchFailedData, groupData } from './../samples/weatherSample'

describe('Weather', () => {
    it('Loading', () => {
        render(<Weather />, { initialState: { loading: true } })

        expect('loading').toBeTruthy()
    })

    test('should return formatted date', () => {
        expect(formatDate('1620010800')).toEqual('2021/4/3');
    });

    test('return empty string if input date is invalid', () => {
        expect(formatDate(null)).toEqual('');
    })

    it('fetch weather', async () => {
        const data = await fetchData();

        // group data
        const group = await groupData(data);
        expect(group.length).toBeGreaterThan(5);

        expect(data.length).toBeGreaterThan(0);
    });
});