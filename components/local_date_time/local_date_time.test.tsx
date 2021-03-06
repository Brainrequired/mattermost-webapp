// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

import LocalDateTime from 'components/local_date_time/local_date_time';

import {mountWithIntl} from 'tests/helpers/intl-test-helper';

describe('components/LocalDateTime', () => {
    test('should render date without timezone', () => {
        const wrapper = mountWithIntl(
            <LocalDateTime
                eventTime={new Date('Fri Jan 12 2018 20:15:13 GMT+0800 (+08)').getTime()}
            />,
        );

        expect(wrapper.find('time').prop('title')).toBe('Fri Jan 12 2018 12:15:13 GMT+0000');
        expect(wrapper.find('span').text()).toBe('12:15 PM');
    });

    test('should render date without timezone enabled', () => {
        const wrapper = mountWithIntl(
            <LocalDateTime
                eventTime={new Date('Fri Jan 12 2018 20:15:13 GMT+0800 (+08)').getTime()}
                enableTimezone={false}
                timeZone={'Australia/Sydney'}
            />,
        );

        expect(wrapper.find('time').prop('title')).toBe('Fri Jan 12 2018 12:15:13 GMT+0000');
        expect(wrapper.find('span').text()).toBe('12:15 PM');
    });

    test('should render date without timezone enabled, in military time', () => {
        const wrapper = mountWithIntl(
            <LocalDateTime
                eventTime={new Date('Fri Jan 12 2018 23:15:13 GMT+0800 (+08)').getTime()}
                useMilitaryTime={true}
                enableTimezone={false}
                timeZone={'Australia/Sydney'}
            />,
        );

        expect(wrapper.find('time').prop('title')).toBe('Fri Jan 12 2018 15:15:13 GMT+0000');
        expect(wrapper.find('span').text()).toBe('15:15');
    });

    test('should render date with timezone enabled, but no timezone defined', () => {
        const wrapper = mountWithIntl(
            <LocalDateTime
                eventTime={new Date('Fri Jan 12 2018 20:15:13 GMT+0000 (+00)').getTime()}
                enableTimezone={true}
            />,
        );

        // Can't do an exact match here, since without a default, the timezone gets set to local
        // and will vary from machine to machine.
        expect(wrapper.find('time').prop('title')).toEqual(expect.not.stringContaining('undefined'));
    });

    test('should render date with timezone enabled', () => {
        const baseProps = {
            eventTime: new Date('Fri Jan 12 2018 20:15:13 GMT+0000 (+00)').getTime(),
            enableTimezone: true,
            timeZone: 'Australia/Sydney',
        };

        const wrapper = mountWithIntl(<LocalDateTime {...baseProps}/>);
        expect(wrapper.find('time').prop('title')).toBe('Sat Jan 13 2018 07:15:13 GMT+1100 (Australia/Sydney)');
        expect(wrapper.find('span').text()).toBe('7:15 AM');
    });

    test('should render date with unsupported timezone enabled', () => {
        const baseProps = {
            eventTime: new Date('Fri Jan 12 2018 20:15:13 GMT+0000 (+00)').getTime(),
            enableTimezone: true,
            timeZone: 'US/Hawaii',
        };

        const wrapper = mountWithIntl(
            <LocalDateTime
                {...baseProps}
            />,
        );
        expect(wrapper.find('time').prop('title')).toBe('Fri Jan 12 2018 10:15:13 GMT-1000 (US/Hawaii)');
        expect(wrapper.find('span').text()).toBe('10:15 AM');
    });

    test('should render date with timezone enabled, in military time', () => {
        const baseProps = {
            eventTime: new Date('Fri Jan 12 2018 20:15:13 GMT-0800 (+00)').getTime(),
            useMilitaryTime: true,
            enableTimezone: true,
            timeZone: 'Australia/Sydney',
        };

        const wrapper = mountWithIntl(<LocalDateTime {...baseProps}/>);

        expect(wrapper.find('time').prop('title')).toBe('Sat Jan 13 2018 15:15:13 GMT+1100 (Australia/Sydney)');
        expect(wrapper.find('span').text()).toBe('15:15');
    });

    test('should render date with unsupported timezone enabled, in military time', () => {
        const baseProps = {
            eventTime: new Date('Fri Jan 12 2018 20:15:13 GMT-0800 (+00)').getTime(),
            useMilitaryTime: true,
            enableTimezone: true,
            timeZone: 'US/Alaska',
        };

        const wrapper = mountWithIntl(
            <LocalDateTime
                {...baseProps}
            />,
        );
        expect(wrapper.find('time').prop('title')).toBe('Fri Jan 12 2018 19:15:13 GMT-0900 (US/Alaska)');
        expect(wrapper.find('span').text()).toBe('19:15');
    });
});
