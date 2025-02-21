import { Meta } from '@storybook/react'
import recordings from './__mocks__/recordings.json'
import React, { useEffect } from 'react'
import { mswDecorator } from '~/mocks/browser'
import { combineUrl, router } from 'kea-router'
import { urls } from 'scenes/urls'
import { App } from 'scenes/App'
import recordingSnapshotsJson from 'scenes/session-recordings/__mocks__/recording_snapshots.json'
import recordingMetaJson from 'scenes/session-recordings/__mocks__/recording_meta.json'
import recordingEventsJson from 'scenes/session-recordings/__mocks__/recording_events.json'
import { FEATURE_FLAGS } from 'lib/constants'
import { SessionRecordingPlayerV3 } from 'scenes/session-recordings/player/SessionRecordingPlayer'

export default {
    title: 'Scenes-App/Recordings',
    parameters: { layout: 'fullscreen', options: { showPanel: false }, viewMode: 'story' },
    decorators: [
        mswDecorator({
            get: {
                '/api/projects/:projectId/session_recordings': { results: recordings },
                '/api/projects/:team/session_recordings/:id/snapshots': { result: recordingSnapshotsJson },
                '/api/projects/:team/session_recordings/:id': { result: recordingMetaJson },
                '/api/projects/:team/events': { results: recordingEventsJson },
            },
            post: {
                '/decide': {
                    featureFlags: {
                        [FEATURE_FLAGS.SESSION_RECORDINGS_PLAYER_V3]: true,
                    },
                },
            },
        }),
    ],
} as Meta

export function RecordingsList(): JSX.Element {
    useEffect(() => {
        router.actions.push(urls.sessionRecordings())
    }, [])
    return <App />
}

export function Recording(): JSX.Element {
    useEffect(() => {
        router.actions.push(
            combineUrl(urls.sessionRecordings(), undefined, { sessionRecordingId: recordings[0].id }).url
        )
    }, [])
    return <App />
}

export function NewRecording(): JSX.Element {
    return (
        <div className="session-player-wrapper-v3">
            <SessionRecordingPlayerV3 sessionRecordingId={recordings[0].id} playerKey={'storybook'} />
        </div>
    )
}
